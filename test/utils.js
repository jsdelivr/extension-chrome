import chai from 'chai';

import { getCleanPathname, getRepoPath, getRepoDetails } from '../src/libs/utils';

const expect = chai.expect;

describe('utils', () => {
	describe('getCleanPathname', () => {
		it('should remove leading and trailing slashed from pathname', () => {
			const shouldMatch = [
				{
					url: 'https://github.com/jquery/jquery',
					result: 'jquery/jquery',
				},
				{
					url: 'https://github.com/jquery/jquery/',
					result: 'jquery/jquery',
				},
			];

			const shouldNotMatch = [
				{
					url: 'https://github.com/jquery/jquery',
					result: '/jquery/jquery',
				},
				{
					url: 'https://github.com/jquery/jquery/',
					result: '/jquery/jquery/',
				},
			];

			for (const { url, result } of shouldMatch) {
				location.href = url;
				const pathname = getCleanPathname();
				expect(pathname).to.equal(result);
			}

			for (const { url, result } of shouldNotMatch) {
				location.href = url;
				const pathname = getCleanPathname();
				expect(pathname).to.not.equal(result);
			}
		});
	});

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
