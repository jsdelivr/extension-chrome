import React from 'dom-chef';
import onDomReady from 'dom-loaded';

import { isRepoRoot } from '../libs/github-page-detect';
import { memo, getPackageVersion, getDefaultFile } from '../libs/utils';
import { getRepoDetails } from '../libs/github-utils';
import { clippy, fileZip, externalLink, globe } from '../libs/icons';

import './github-download-button.css';

async function getPackageName (ownerName, repoName, treeName) {
	const rawPackageUrl = `https://raw.githubusercontent.com/${ownerName}/${repoName}/${treeName}/package.json`;
	const rawPackageResponse = await fetch(rawPackageUrl);
	const { name } = await rawPackageResponse.json();

	return name;
}

async function init () {
	await onDomReady;

	if (isRepoRoot()) {
		try {
			if (document.querySelector('.jsd-get-repo-select-menu')) {
				return;
			}

			const { ownerName, repoName, treeName } = getRepoDetails();

			const name = await getPackageNameMemo(ownerName, repoName, treeName);

			if (!name) {
				return;
			}

			const version = await getPackageVersionMemo(name, treeName);

			const defaultFile = await getDefaultFileMemo(name, version);

			const cdnUrl = defaultFile ? `https://cdn.jsdelivr.net/npm/${name}@${version}${defaultFile}` : '';

			const menu = (
				<details class="jsd-get-repo-select-menu position-relative details-overlay details-reset">
					<summary class="btn ml-2 jsd-btn-orange">
						jsDelivr CDN
						&nbsp;
						<span class="dropdown-caret"></span>
					</summary>

					<div class="position-relative">
						<div class="get-repo-modal dropdown-menu dropdown-menu-sw p-0" style={{ top: '6px', width: '352px' }}>
							<div>
								<div class="border-bottom p-3">
									<div class="text-bold">
										<span class="mr-3">{globe()}</span>
										Serve with jsDelivr CDN
									</div>
									{cdnUrl
										? (
											<div class="jsd-mt-2.5">
												<div class="input-group">
													<input
														type="text"
														class="form-control input-monospace input-sm bg-gray-light"
														value={cdnUrl}
														aria-label={`Load this repository at ${cdnUrl}`}
														readonly
													/>
													<div class="input-group-button">
														<clipboard-copy
															class="btn btn-sm"
															value={cdnUrl}
															tabindex="0"
															role="button"
															aria-label="Copy to clipboard"
														>
															{clippy()}
														</clipboard-copy>
													</div>
												</div>
												<p class="mt-2 mb-0 f6 text-gray">
													Use this URL in your web page.
												</p>
											</div>
										)
										: (
											<div class="flash flash-warn f6 jsd-mt-2.5 p-3">
												Sadly, this package doesn't have a default file set.
											</div>
										)
									}
								</div>
								<ul class="list-style-none">
									<li class="Box-row Box-row--hover-gray p-0 rounded-0 mt-0">
										<a
											class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3"
											href={`https://www.jsdelivr.com/package/npm/${name}`}
											target="_blank"
											rel="nofollow"
											aria-label={`Open ${ownerName}/${repoName} in jsDelivr website and select the files you want to use.`}
										>
											<span class="mr-3">{externalLink()}</span>
											Open in jsDelivr
										</a>
									</li>
									{cdnUrl
										? (
											<li class="Box-row Box-row--hover-gray p-0">
												<a
													class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3"
													href={`https://registry.npmjs.org/${name}/-/${name}-${version}.tgz`}
													rel="nofollow"
												>
													<span class="mr-3">{fileZip()}</span>
													Download ZIP
												</a>
											</li>
										)
										: null
									}
								</ul>
							</div>
						</div>
					</div>
				</details>
			);

			const fileNavigation = document.querySelector('.file-navigation');

			if (fileNavigation) {
				fileNavigation.append(menu);
			}
		} catch (error) {
			console.error(error);
		}
	}
}

const getPackageNameMemo = memo(getPackageName);
const getPackageVersionMemo = memo(getPackageVersion);
const getDefaultFileMemo = memo(getDefaultFile);

init();
document.addEventListener('pjax:end', init);
