# SOCRadar Digital Footprint API Integration

This document provides detailed information about the Digital Footprint API integration in the SOCRadar n8n node.

## Overview

The Digital Footprint API allows you to discover, monitor, and manage your organization's digital assets across various platforms and environments. This integration enables you to:

- Retrieve and filter digital assets
- Manage cloud storage buckets
- Add new assets to your monitoring portfolio
- Mark assets as false positives
- Toggle monitoring status for specific assets

## Operations

### Get Digital Assets

Retrieves a list of digital assets associated with your organization, with comprehensive filtering options.

**Parameters:**
- **Company ID**: Your SOCRadar company identifier
- **Asset Type**: Filter by asset type (domain, ipAddress, website, etc.)
- **Page Number**: For pagination (default: 0)
- **Page Limit**: Number of results per page (default: 100)
- **Sort By**: Field to sort results by (assetName, assetType, etc.)
- **Sort Direction**: Ascending or descending order

**Response:**
Returns a list of digital assets with details including:
- Asset ID
- Asset Name
- Asset Type
- Discovery Date
- Monitoring Status
- False Positive Status
- Associated Tags

### Get Cloud Buckets

Retrieves cloud storage buckets (AWS S3, Azure Blob Storage, Google Cloud Storage, etc.) associated with your organization.

**Parameters:**
- **Company ID**: Your SOCRadar company identifier

**Response:**
Returns a list of cloud storage buckets with details including:
- Bucket Name
- Cloud Platform
- Access State (public/private)
- Discovery Date
- Associated Services

### Add Asset

Adds a new digital asset (domain, cloud bucket) to your monitoring portfolio.

**Parameters for Domain:**
- **Company ID**: Your SOCRadar company identifier
- **Domain**: Domain name to add
- **Asset Name**: Display name for the asset
- **Domain Type**: Classification (MAINDOMAIN, ALTERNATE)
- **Source**: How the asset was discovered (manual, same_whois, etc.)

**Parameters for Cloud Bucket:**
- **Company ID**: Your SOCRadar company identifier
- **Asset Name**: Cloud bucket URL
- **Cloud Platform Name**: Provider name (Amazon S3, Google Cloud Storage, etc.)
- **Access State**: Permission level (public, private)
- **Service Name**: Associated service

**Response:**
Confirmation of asset addition with asset details.

### Mark False Positive

Marks an asset as a false positive to prevent it from being flagged in future security scans.

**Parameters:**
- **Company ID**: Your SOCRadar company identifier
- **Asset ID**: Identifier of the asset to mark
- **Asset Type**: Type of the asset (domain, ipAddress, etc.)
- **Sub Type**: Sub-category of the asset
- **Notes**: Reason for marking as false positive

**Response:**
Confirmation of false positive marking.

### Toggle Monitoring

Enables or disables monitoring for a specific asset.

**Parameters:**
- **Company ID**: Your SOCRadar company identifier
- **Asset ID**: Identifier of the asset to update
- **Asset Type**: Type of the asset (domain, ipAddress, etc.)
- **Sub Type**: Sub-category of the asset
- **Monitoring Status**: Enable (true) or disable (false) monitoring

**Response:**
Confirmation of monitoring status change.

## Usage Examples

### Workflow: Automated Asset Discovery and Monitoring

1. Use the "Get Digital Assets" operation to retrieve all unmonitored assets
2. Filter for relevant assets based on your criteria
3. For each relevant asset, use "Toggle Monitoring" to enable monitoring
4. Send notification with newly monitored assets

### Workflow: False Positive Management

1. Use the "Get Digital Assets" operation to retrieve all assets
2. Filter for assets that match your false positive criteria
3. For each matching asset, use "Mark False Positive" operation
4. Generate report of newly marked false positives

## Error Handling

The integration includes comprehensive error handling for:
- Authentication failures
- Invalid parameters
- Rate limiting
- Server errors

Each error response includes detailed information to help troubleshoot the issue.

## Best Practices

1. **Pagination**: When retrieving large asset lists, use pagination to improve performance
2. **Filtering**: Apply specific filters to narrow down results
3. **Rate Limiting**: Be mindful of API rate limits when making multiple requests
4. **Asset Organization**: Use consistent naming conventions for added assets
5. **Regular Maintenance**: Periodically review and clean up false positives

## Additional Resources

- [SOCRadar API Documentation](https://api.socradar.io/docs)
- [Digital Footprint Overview](https://socradar.io/platform/digital-footprint/)
- [Cloud Security Best Practices](https://socradar.io/resources/cloud-security/)
