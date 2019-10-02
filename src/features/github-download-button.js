import React from 'dom-chef';
import onDomReady from 'dom-loaded';

import { isGitHub, isRepoRoot } from '../libs/page-detect';
import { getRepoDetails } from '../libs/utils';
import { clippy } from '../libs/icons';

import './github-download-button.css';

async function init () {
	await onDomReady;

	if (isGitHub()) {
		if (isRepoRoot()) {
			try {
				const { ownerName, repoName, treeName } = getRepoDetails();

				const rawPackageUrl = `https://raw.githubusercontent.com/${ownerName}/${repoName}/${treeName}/package.json`;
				const rawPackageResponse = await fetch(rawPackageUrl);
				const { name, version } = await rawPackageResponse.json();

				if (!name && !version) {
					return;
				}

				const packageFilesUrl = `https://data.jsdelivr.com/v1/package/npm/${name}@${version}`;
				const packageFilesResponse = await fetch(packageFilesUrl);
				const { default: defaultFile } = await packageFilesResponse.json();

				const cdnUrl = defaultFile ? `https://cdn.jsdelivr.net/npm/${name}@${version}${defaultFile}` : '';

				const menu = (
					<details class="dropdown details-reset details-overlay">
						<summary class="btn btn-sm ml-2 jsd-btn-orange">
							jsDelivr CDN
							&nbsp;
							<span class="dropdown-caret"></span>
						</summary>

						<div class="position-relative">
							<div class="get-repo-modal dropdown-menu dropdown-menu-sw pb-0">
								<div class="get-repo-modal-options">
									<div class="clone-options">
										<h4 class="mb-1">
											Serve with jsDelivr CDN
										</h4>
										{cdnUrl
											? (
												<div>
													<p class="mb-2 get-repo-decription-text">
														Use this URL in your web page.
													</p>
													<div class="input-group">
														<input
															type="text"
															class="form-control input-monospace input-sm"
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
												</div>
											)
											: (
												<div class="flash flash-warn my-2 jsd-flash">
													Sadly, this package doesn't have a default file set.
												</div>
											)
										}
									</div>
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
}

init();

document.addEventListener('pjax:end', init);
