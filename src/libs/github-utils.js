// Functions referenced and modified from Sindre Sorhus's `refined-github` repository
// Source: https://github.com/sindresorhus/refined-github/blob/master/source/libs/utils.ts

import { getCleanPathname } from './utils';

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
