import { getCleanPathname } from './utils';
import { NPM_REGEX } from './npm-utils';

export const isNpm = (locationObj = location) => locationObj.hostname === 'www.npmjs.com';

// 'package/name'        -> true
// 'package/@scope/name' -> true
export const isPackageRootMaster = () => {
	const pathname = getCleanPathname();

	return NPM_REGEX.scopedPackage.test(pathname) || NPM_REGEX.package.test(pathname);
};

// 'package/name/v/1.0.0'        -> true
// 'package/@scope/name/v/1.0.0' -> true
export const isPackageRootVersion = () => {
	const pathname = getCleanPathname();

	return NPM_REGEX.scopedPackageWithVersion.test(pathname) || NPM_REGEX.packageWithVersion.test(pathname);
};

export const isPackageRoot = () => {
	return isPackageRootMaster() || isPackageRootVersion();
};
