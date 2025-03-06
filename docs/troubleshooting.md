# SOCRadar n8n Integration - Troubleshooting Guide

This guide provides solutions for common issues you might encounter when using the SOCRadar n8n integration.

## Authentication Issues

### Error: "Authentication failed"

**Possible causes:**
- Invalid API key
- API key not properly configured
- API key does not have sufficient permissions

**Solutions:**
1. Verify your API key in the SOCRadar platform (Settings → API Options)
2. Ensure the API key is correctly entered in the n8n credentials
3. Check that your SOCRadar subscription includes access to the API you're trying to use
4. Try regenerating your API key in the SOCRadar platform

### Error: "Forbidden" or "Access Denied"

**Possible causes:**
- Your account doesn't have permission to access the requested resource
- Your API key doesn't have the necessary scope

**Solutions:**
1. Contact your SOCRadar account administrator to ensure you have the correct permissions
2. Check that your subscription level includes the API you're trying to access
3. Verify that your API key has the correct scope for the operation

## Request Issues

### Error: "Company ID not found"

**Possible causes:**
- Invalid company ID
- Company ID not included in the request
- Typo in the company ID

**Solutions:**
1. Verify your company ID in the SOCRadar platform
2. Ensure the company ID is correctly entered in the node configuration
3. Check for any spaces or special characters that might be causing issues

### Error: "Invalid parameter"

**Possible causes:**
- Missing required parameter
- Parameter value in incorrect format
- Parameter value out of allowed range

**Solutions:**
1. Check the documentation for the required parameters for the operation
2. Ensure all required parameters are provided
3. Verify that parameter values match the expected format (e.g., dates in ISO format)
4. Check that numeric values are within allowed ranges

### Error: "Rate limit exceeded"

**Possible causes:**
- Too many API requests in a short period
- Multiple workflows accessing the API simultaneously

**Solutions:**
1. Implement rate limiting in your workflows (e.g., using the "Limit" node)
2. Add delays between requests
3. Optimize workflows to reduce the number of API calls
4. Contact SOCRadar support to discuss rate limit increases

## Response Issues

### Error: "No data returned"

**Possible causes:**
- No data matches your query parameters
- Incorrect filter parameters
- Data exists but pagination settings exclude it

**Solutions:**
1. Verify your filter parameters
2. Try broadening your search criteria
3. Check pagination settings (page number, page limit)
4. Ensure the time range for your query is appropriate

### Error: "Unexpected response format"

**Possible causes:**
- API response format has changed
- Node version is outdated
- Custom fields in the response

**Solutions:**
1. Update to the latest version of the n8n-nodes-socradar package
2. Check the SOCRadar API documentation for any changes
3. Use JSON nodes to transform the response if needed

## Digital Footprint API Specific Issues

### Error: "Asset type not supported"

**Possible causes:**
- Invalid asset type specified
- Asset type not available in your subscription

**Solutions:**
1. Check the documentation for supported asset types
2. Verify that your subscription includes the asset type you're trying to access
3. Try using a different asset type

### Error: "Asset not found" when marking as false positive

**Possible causes:**
- Invalid asset ID
- Asset has been deleted or is no longer available
- Asset belongs to a different company

**Solutions:**
1. Verify the asset ID using the "Get Digital Assets" operation
2. Ensure you're using the correct company ID
3. Check that the asset still exists in the SOCRadar platform

### Error: "Failed to add asset"

**Possible causes:**
- Asset already exists
- Invalid asset data
- Insufficient permissions

**Solutions:**
1. Check if the asset already exists using the "Get Digital Assets" operation
2. Verify that all required fields for the asset are provided
3. Ensure the asset data is in the correct format
4. Check your permissions for adding assets

## Installation and Upgrade Issues

### Error: "Module not found"

**Possible causes:**
- Package not properly installed
- n8n version incompatibility
- File path issues

**Solutions:**
1. Reinstall the package using `npm install -g @socradar/n8n-nodes-socradar`
2. Verify that your n8n version is compatible (v1.0.0 or later)
3. Restart n8n after installation
4. Check n8n logs for any additional error information

### Error: "Version conflict"

**Possible causes:**
- Multiple versions of the package installed
- Dependency conflicts

**Solutions:**
1. Uninstall all versions of the package and reinstall
2. Check for any conflicting packages
3. Update to the latest version of n8n and the SOCRadar nodes

## Getting Help

If you continue to experience issues after trying these troubleshooting steps:

1. Check the [SOCRadar API documentation](https://api.socradar.io/docs)
2. Review the [n8n community forum](https://community.n8n.io/)
3. Contact SOCRadar support at support@socradar.io
4. Open an issue on the [GitHub repository](https://github.com/socradar/n8n-nodes-socradar)

When reporting issues, please include:
- The version of n8n you're using
- The version of the SOCRadar nodes package
- A description of the issue
- Any error messages (with sensitive information redacted)
- Steps to reproduce the issue
