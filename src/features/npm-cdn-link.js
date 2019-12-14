import React from 'dom-chef';
import copy from 'copy-text-to-clipboard';

import { isPackageRoot } from '../libs/npm-page-detect';
import { getPackageDetails } from '../libs/npm-utils';
import { memo, getPackageVersion, getDefaultFile } from '../libs/utils';
import { caretRight, copy as copyIcon } from '../libs/icons';

import './npm-cdn-link.css';

const getPackageVersionMemo = memo(getPackageVersion);
const getDefaultFileMemo = memo(getDefaultFile);

// Set `currentPageUrl` as empty string instead of `location.href`.
// This helps in determining whether to add a cdn link or not,
// for scenarios where a user directly lands on a package page or refreshes it
let currentPageUrl = '';

function hasRouteChanged () {
	const nextPageUrl = window.location.href;

	if (currentPageUrl === '' || currentPageUrl !== nextPageUrl) {
		currentPageUrl = nextPageUrl;
		return true;
	}

	return false;
}

function removeCDNLink () {
	const existingLink = document.querySelector('#jsd-npm-container');

	if (existingLink) {
		existingLink.remove();
	}
}

function setCDNLink ({ name, cdnUrl }) {
	const headingElements = [ ...document.querySelectorAll('h3') ];
	const installHeadingElement = headingElements.find(element => element.innerText.toLowerCase() === 'install');

	if (!installHeadingElement) {
		return;
	}

	function handleLinkClick () {
		copy(cdnUrl);
		setToast({
			message: '✔ Copied to clipboard!',
		});
	}

	const link = (
		<div id="jsd-npm-container">
			<h3 class="jsd-npm-title">jsDelivr CDN</h3>
			{cdnUrl
				? (
					<div class="jsd-npm-link-container" title="Copy Command to Clipboard">
						{caretRight()}
						<input
							class="jsd-npm-link-input"
							value={cdnUrl}
							onClick={handleLinkClick}
							readonly
						/>
						{copyIcon()}
					</div>
				)
				: (
					<div class="jsd-npm-no-file-container">
						<p class="jsd-npm-no-file-message">
							Sadly, this package doesn't have a default file set.
						</p>
						<a
							class="jsd-npm-button"
							href={`https://www.jsdelivr.com/package/npm/${name}`}
							target="_blank"
							rel="nofollow"
						>
							Open in jsDelivr
						</a>
					</div>
				)
			}
		</div>
	);

	const installCommandElement = installHeadingElement.nextElementSibling;

	if (installCommandElement) {
		installCommandElement.insertAdjacentElement('afterend', link);
		currentPageUrl = window.location.href;
	}
}

function removeToast () {
	const toastElement = document.querySelector('#jsd-npm-toast');

	if (toastElement) {
		toastElement.remove();
	}
}

function setToast ({ message = '' }) {
	const toast = (
		<div
			id="jsd-npm-toast"
			class="jsd-npm-toast-container"
			onClick={removeToast}
		>
			<p class="jsd-npm-toast-message">{message}</p>
			<p class="jsd-npm-toast-close-btn">×</p>
		</div>
	);

	document.querySelector('body').append(toast);
	setTimeout(() => {
		removeToast();
	}, 2000);
}

browser.runtime.onMessage.addListener(async (request) => {
	const { type } = request;

	if (type === 'TAB_UPDATE' && hasRouteChanged() && isPackageRoot()) {
		removeCDNLink();

		const { name, version: versionName } = getPackageDetails();

		if (!name) {
			return;
		}

		const version = versionName ? versionName : await getPackageVersionMemo(name, 'master');

		if (!version) {
			return;
		}

		const defaultFile = await getDefaultFileMemo(name, version);

		const cdnUrl = defaultFile ? `https://cdn.jsdelivr.net/npm/${name}@${version}${defaultFile}` : '';

		setCDNLink({
			name,
			cdnUrl,
		});
	}
});
