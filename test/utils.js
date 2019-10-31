import chai from 'chai';

import { getCleanPathname } from '../src/libs/utils';

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
});
