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

// Check for `.js` extension
// '/dist/index.min.js' -> true
// '/dist/index'        -> false
export const hasJSExtension = filename => /(\.js)$/.test(filename);

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
