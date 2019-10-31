import chai from 'chai';

import { getPackageDetails } from '../src/libs/npm-utils';

const expect = chai.expect;

describe('npm-utils', () => {
	describe('getPackageDetails', () => {
		it('should get package details from current URL', () => {
			const shouldMatch = [
				{
					url: 'https://www.npmjs.com/package/jquery',
					result: {
						name: 'jquery',
					},
				},
				{
					url: 'https://www.npmjs.com/package/@sindresorhus/is',
					result: {
						name: '@sindresorhus/is',
					},
				},
				{
					url: 'https://www.npmjs.com/package/jquery/v/3.4.1',
					result: {
						name: 'jquery',
						version: '3.4.1',
					},
				},
				{
					url: 'https://www.npmjs.com/package/@sindresorhus/is/v/1.2.0',
					result: {
						name: '@sindresorhus/is',
						version: '1.2.0',
					},
				},
			];

			for (const { url, result } of shouldMatch) {
				location.href = url;
				const details = getPackageDetails();
				expect(details).to.deep.equal(result);
			}
		});
	});
});
