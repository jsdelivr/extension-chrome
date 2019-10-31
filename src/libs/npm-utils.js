import { getCleanPathname } from './utils';

export const NPM_REGEX = {
	// 'package/name'
	package: /^(?:package[/])(?<name>[^/]+)$/,
	// 'package/name/v/1.0.0'
	packageWithVersion: /^(?:package[/])(?<name>[^/]+)(?:[/]v[/])(?<version>[^/]+)$/,
	// 'package/@scope/name'
	scopedPackage: /^(?:package[/])(?<name>@[^/]+[/][^/]+)$/,
	// 'package/@scope/name/v/1.0.0'
	scopedPackageWithVersion: /^(?:package[/])(?<name>@[^/]+[/][^/]+)(?:[/]v[/])(?<version>[^/]+)$/,
};

export const getPackageDetails = () => {
	const pathname = getCleanPathname();

	const scopedPackageWithVersionMatches = pathname.match(NPM_REGEX.scopedPackageWithVersion) || [];

	if (scopedPackageWithVersionMatches.groups) {
		return {
			...scopedPackageWithVersionMatches.groups,
		};
	}

	const scopedPackageMatches = pathname.match(NPM_REGEX.scopedPackage) || [];

	if (scopedPackageMatches.groups) {
		return {
			...scopedPackageMatches.groups,
		};
	}

	const packageWithVersionMatches = pathname.match(NPM_REGEX.packageWithVersion) || [];

	if (packageWithVersionMatches.groups) {
		return {
			...packageWithVersionMatches.groups,
		};
	}

	const packageMatches = pathname.match(NPM_REGEX.package) || [];

	if (packageMatches.groups) {
		return {
			...packageMatches.groups,
		};
	}

	return {};
};
