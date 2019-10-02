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
