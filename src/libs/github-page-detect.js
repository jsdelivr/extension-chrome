// Functions referenced and modified from Sindre Sorhus's `refined-github` repository
// Source: https://github.com/sindresorhus/refined-github/blob/master/source/libs/page-detect.ts

import { getCleanPathname } from './utils';
import { getRepoPath } from './github-utils';

export const isGitHub = () => location.hostname === 'github.com';

// 'user/repo'            -> true
// 'user/repo/tree/1.0.0' -> false
export const isRepoRootMaster = () => /^[^/]+\/[^/]+$/.test(getCleanPathname());

// '/user/repo/tree/1.0.0'     -> true
// '/user/repo/tree/1.0.0/lib' -> false
export const isRepoRootTree = () => /^(tree[/][^/]+)?$/.test(getRepoPath());

const hasCloneButton = () => Boolean(document.querySelector('.get-repo-select-menu'));

export const isRepoRoot = () => {
	return (isRepoRootMaster() || isRepoRootTree()) && hasCloneButton();
};
