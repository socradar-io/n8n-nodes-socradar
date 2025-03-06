// Entry point for the n8n nodes
// This file exports the compiled node files from the dist directory

module.exports = {
	// Export credentials
	credentials: {
		SocradarApi: require('./dist/credentials/SocradarApi.credentials')
	},
	
	// Export nodes
	nodes: {
		Socradar: require('./dist/nodes/Socradar/Socradar.node')
	}
};
