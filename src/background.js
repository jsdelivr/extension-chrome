import { isNpm } from './libs/npm-page-detect';

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	const { status, url } = tab;

	if (!url) {
		return;
	}

	const location = new URL(url);

	if (!isNpm(location)) {
		return;
	}

	if (status === 'complete') {
		const message = {
			type: 'TAB_UPDATE',
		};

		browser.tabs.sendMessage(tabId, message);
	}
});
