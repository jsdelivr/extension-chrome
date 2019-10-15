import chai from 'chai';
import { isNpm, isPackageRootMaster, isPackageRootVersion } from '../src/libs/npm-page-detect';

const assert = chai.assert;

describe('npm-page-detect', () => {
	describe('isNpm', () => {
		it('should detect if current page is of npm website', () => {
			location.href = 'https://www.npmjs.com/package/jquery';
			assert.isTrue(isNpm());
			assert.isTrue(isNpm(new URL(location)));

			location.href = 'https://github.com/jquery/jquery';
			assert.isFalse(isNpm());
			assert.isFalse(isNpm(new URL(location)));
		});
	});

	describe('isPackageRootMaster', () => {
		it('should detect if current page is a root of a npm package', () => {
			const packagesWithoutVersion = [
				'https://www.npmjs.com/package/jquery',
				'https://www.npmjs.com/package/@sindresorhus/is',
			];

			const packagesWithVersion = [
				'https://www.npmjs.com/package/jquery/v/3.4.1',
				'https://www.npmjs.com/package/@sindresorhus/is/v/1.2.0',
			];

			for (const url of packagesWithoutVersion) {
				location.href = url;
				assert.isTrue(isPackageRootMaster());
			}

			for (const url of packagesWithVersion) {
				location.href = url;
				assert.isFalse(isPackageRootMaster());
			}
		});
	});

	describe('isPackageRootVersion', () => {
		it('should detect if current page is a root of a npm package with a specific version', () => {
			const packagesWithVersion = [
				'https://www.npmjs.com/package/jquery/v/3.4.1',
				'https://www.npmjs.com/package/@sindresorhus/is/v/1.2.0',
			];

			const packagesWithoutVersion = [
				'https://www.npmjs.com/package/jquery',
				'https://www.npmjs.com/package/@sindresorhus/is',
			];

			for (const url of packagesWithVersion) {
				location.href = url;
				assert.isTrue(isPackageRootVersion());
			}

			for (const url of packagesWithoutVersion) {
				location.href = url;
				assert.isFalse(isPackageRootVersion());
			}
		});
	});
});
