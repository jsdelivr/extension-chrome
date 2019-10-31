// Functions referenced and modified from Sindre Sorhus's `refined-github` repository
// Source: https://github.com/sindresorhus/refined-github/blob/master/source/libs/utils.ts

// Remove leading and trailing slashes
// '/user/repo'  -> 'user/repo'
// '/user/repo/' -> 'user/repo'
export const getCleanPathname = () => location.pathname.replace(/^[/]/g, '').replace(/[/]$/g, '');

// Parses a repo's subpage
// '/user/repo/tree/1.0.0' -> 'tree/1.0.0'
// '/user/repo'            -> ''
export const getRepoPath = () => getCleanPathname().split('/').slice(2).join('/');

export const getRepoDetails = () => {
	const [ ownerName, repoName, , treeName = 'master' ] = getCleanPathname().split('/');

	return {
		ownerName,
		repoName,
		treeName,
	};
};

// eslint-disable-next-line no-unused-vars
export async function getPackageVersion (name, treeName) {
	const packageVersionsUrl = `https://data.jsdelivr.com/v1/package/npm/${name}`;
	const packageVersionsResponse = await fetch(packageVersionsUrl);
	const { tags, versions } = await packageVersionsResponse.json();

	const version = tags.latest ? tags.latest : versions[0];

	return version;
}

export async function getDefaultFile (name, version) {
	const packageFilesUrl = `https://data.jsdelivr.com/v1/package/npm/${name}@${version}/flat`;
	const packageFilesResponse = await fetch(packageFilesUrl);
	const { default: defaultFile, files } = await packageFilesResponse.json();

	if (!defaultFile) {
		return '';
	}

	const nonMinifiedFile = defaultFile.replace(/\.min\.(js|css)$/i, '.$1');
	const hasDefaultFile = files.some((file) => {
		return file.name === defaultFile || file.name === nonMinifiedFile;
	});

	if (hasDefaultFile) {
		return defaultFile;
	}

	return '';
}

// Memoize function to store results of API calls
// and return cached result for same inputs
export const memo = (fn) => {
	const cacheStore = new Map();

	return async (...args) => {
		const key = args.join('|');

		if (cacheStore.has(key)) {
			return cacheStore.get(key);
		}

		const result = await fn.call(null, ...args);
		cacheStore.set(key, result);
		return result;
	};
};
