const { src, dest } = require('gulp');

/**
 * Copy Icon files to the dist folder
 */
function buildIcons() {
	return src('./nodes/**/*.svg').pipe(dest('./dist/nodes'));
}

exports['build:icons'] = buildIcons;
