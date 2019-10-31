import chai from 'chai';

import { getRepoPath, getRepoDetails } from '../src/libs/github-utils';

const expect = chai.expect;

describe('github-utils', () => {
	describe('getRepoPath', () => {
		it('should get a repository path from current URL', () => {
			const shouldMatch = [
				{
					url: 'https://github.com/jquery/jquery',
					result: '',
				},
				{
					url: 'https://github.com/jquery/jquery/tree/3.3.0',
					result: 'tree/3.3.0',
				},
			];

			for (const { url, result } of shouldMatch) {
				location.href = url;
				const path = getRepoPath();
				expect(path).to.equal(result);
			}
		});
	});

	describe('getRepoDetails', () => {
		it('should get repository details from current URL', () => {
			const shouldMatch = [
				{
					url: 'https://github.com/jquery/jquery',
					result: {
						ownerName: 'jquery',
						repoName: 'jquery',
						treeName: 'master',
					},
				},
				{
					url: 'https://github.com/kenwheeler/slick',
					result: {
						ownerName: 'kenwheeler',
						repoName: 'slick',
						treeName: 'master',
					},
				},
				{
					url: 'https://github.com/jquery/jquery/tree/3.0.0',
					result: {
						ownerName: 'jquery',
						repoName: 'jquery',
						treeName: '3.0.0',
					},
				},
			];

			for (const { url, result } of shouldMatch) {
				location.href = url;
				const details = getRepoDetails();
				expect(details).to.deep.equal(result);
			}
		});
	});
});
