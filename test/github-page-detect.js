import chai from 'chai';
import { isGitHub, isRepoRootMaster, isRepoRootTree } from '../src/libs/github-page-detect';

const assert = chai.assert;

describe('github-page-detect', () => {
	describe('isGitHub', () => {
		it('should detect if current page is GitHub', () => {
			location.href = 'https://github.com/jquery/jquery';
			assert.isTrue(isGitHub());

			location.href = 'https://www.npmjs.com/package/jquery';
			assert.isFalse(isGitHub());
		});
	});

	describe('isRepoRootMaster', () => {
		it('should detect if current page is a root of a GitHub repository on master branch', () => {
			const masterRootRepos = [
				'https://github.com/jquery/jquery',
				'https://github.com/kenwheeler/slick',
			];

			const insideMasterRepos = [
				'https://github.com/jquery/jquery/tree/master/src',
				'https://github.com/kenwheeler/slick/tree/master/slick',
			];

			for (const url of masterRootRepos) {
				location.href = url;
				assert.isTrue(isRepoRootMaster());
			}

			for (const url of insideMasterRepos) {
				location.href = url;
				assert.isFalse(isRepoRootMaster());
			}
		});
	});

	describe('isRepoRootTree', () => {
		it('should detect if current page is a root of a GitHub repository on tagged release or branch other than master', () => {
			const treeRootRepos = [
				'https://github.com/jquery/jquery/tree/master',
				'https://github.com/jquery/jquery/tree/3.0.0',
				'https://github.com/kenwheeler/slick/tree/1.5.6',
			];

			const insideTreeRepos = [
				'https://github.com/jquery/jquery/tree/master/src',
				'https://github.com/jquery/jquery/tree/3.0.0/src',
				'https://github.com/kenwheeler/slick/tree/1.5.6/slick',
			];

			for (const url of treeRootRepos) {
				location.href = url;
				assert.isTrue(isRepoRootTree());
			}

			for (const url of insideTreeRepos) {
				location.href = url;
				assert.isFalse(isRepoRootTree());
			}
		});
	});
});
