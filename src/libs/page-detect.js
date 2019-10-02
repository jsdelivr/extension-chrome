import { getCleanPathname, getRepoPath } from './utils';

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
