const { src, dest, parallel } = require('gulp');

/**
 * Copy Node Icon files to the dist folder
 */
function buildNodeIcons() {
	return src('./nodes/**/*.svg').pipe(dest('./dist/nodes'));
}

/**
 * Copy Credential Icon files to the dist folder
 */
function buildCredentialIcons() {
	return src('./credentials/icons/*.svg').pipe(dest('./dist/credentials/icons'));
}

// Create a combined build icons task
exports['build:icons'] = parallel(buildNodeIcons, buildCredentialIcons);
