# n8n-nodes-socradar

This is an n8n community node for integrating with the SOCRadar API. It provides a comprehensive node to interact with SOCRadar's services.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[SOCRadar](https://socradar.io/) is a Digital Risk Protection Platform that provides threat intelligence, brand protection, attack surface management, and other cybersecurity services.

## SOCRadar n8n Integration

This is a community node for n8n that integrates with SOCRadar's API. It provides access to SOCRadar's services

## Features

### Incident Management
- **Comprehensive API Support**: Single consolidated node supporting all incident operations
- **Advanced Filtering Options**:
  - Filter by status, severity, resolution state
  - Date range filtering
  - Sorting capabilities
  - Tag-based filtering
- **Operations**:
  - Get All Incidents
  - Get Single Incident
  - Add Comment
  - Add Tag
  - Remove Tag

### Takedown Services
- Create and manage takedown requests
- Filter and retrieve takedown status
- **Operations**:
  - Create Takedown Request
  - Get Single Takedown
  - Get All Takedowns
  - Update Takedown Status
  - Add Tags

### Digital Footprint
- Discover and manage digital assets across your organization
- Monitor cloud resources, domains, and other digital assets
- **Advanced Filtering Options**:
  - Filter by asset type (Domain, IP, URL, Cloud Bucket)
  - Pagination support
  - Sorting capabilities
  - Status filtering
- **Operations**:
  - Get Digital Assets
  - Get Cloud Buckets
  - Add Asset (Domain, Cloud Bucket)
  - Mark False Positive
  - Toggle Monitoring

### Brand Protection
- Monitor and protect your brand across digital channels
- **Advanced Detection**:
  - Impersonating Accounts
  - Impersonating Domains
  - Rogue Mobile Applications
  - Bad Reputation
  - Social Media Findings
- **Operations**:
  - Get Brand Protection Data
  - Filter by Finding Type
  - Sort by Risk Score

### Fraud Protection
- Detect and prevent digital fraud attempts
- **Comprehensive Coverage**:
  - Phishing Detection
  - Scam Detection
  - Brand Abuse
  - Payment Fraud
- **Operations**:
  - Get Fraud Protection Data
  - Filter by Risk Level
  - Sort by Detection Time

### Dark Web Monitoring
- Monitor dark web for sensitive information
- **Data Sources**:
  - Botnet Data
  - Blackmarket Data
  - Suspicious Content
  - PII Exposure
  - IM Content
- **Operations**:
  - Get Dark Web Findings
  - Filter by Source Type
  - Sort by Relevance

### User Audit Logs
- Retrieve user activity logs for compliance and security monitoring
- **Advanced Filtering Options**:
  - Date range filtering
  - Limit number of records
  - Activity type filtering
- **Operations**:
  - Get All User Audit Logs
  - Filter by Date Range
  - Filter by Activity Type

## Prerequisites

- n8n v1.0.0 or later
- SOCRadar API credentials

## Installation

Follow these steps to install this custom node:

```bash
# Install with npm
npm install @socradar/n8n-nodes-socradar

# Install with pnpm
pnpm add @socradar/n8n-nodes-socradar

# Alternatively, for n8n installed globally
npm install -g @socradar/n8n-nodes-socradar
```

For Docker-based n8n installations, you can use the [n8n-docker-custom](https://github.com/n8n-io/n8n-docker-custom) approach.

## Usage

### Authentication
The SOCRadar node requires SOCRadar API credentials:
1. API Key: Your SOCRadar API key
2. Company ID: Your SOCRadar company identifier

### SOCRadar Node
The consolidated SOCRadar node provides access to all SOCRadar Extended Threat Intelligence platform features:

- **Resource**: Choose from:
  - Incident Management
  - Takedown Management
  - Digital Footprint
  - Brand Protection
  - Fraud Protection
  - Dark Web Monitoring
  - User Audit Logs
- **Operation**: Select the specific operation to perform
- **Parameters**: Configure operation-specific parameters

## Version History

- **1.8.7**: Fix public github url
- **1.8.6**: Added repository link and improved package structure for n8n compatibility
- **1.8.5**: Removed external dependencies (axios, dotenv) in favor of n8n's built-in functionality
- **1.8.4**: Fixed credential icon display issue
- **1.8.2**: Fixed README.md with correct package name and latest features
- **1.8.1**: Optimized build process and improved CI/CD pipeline
- **1.8.0**: Enhanced Digital Footprint API integration with improved asset type handling
- **1.7.0**: Added Brand Protection API V2 support with comprehensive filtering
- **1.6.0**: Added Fraud Protection API V2 support
- **1.5.0**: Added Dark Web Monitoring API V2 support
- **1.4.0**: Added Digital Footprint API support
- **1.3.0**: Added User Audit Logs API support
- **1.2.0**: Consolidated all functionality into a single SOCRadar node
- **1.1.0**: Added Takedown API support
- **1.0.0**: Initial release with Incident API support

## Credentials

You need to create a credentials entry with your SOCRadar API key:

1. Go to **Credentials** in n8n
2. Select **Create New**
3. Search for "SOCRadar API"
4. Enter your API key from the SOCRadar platform
5. Save the credentials

## Support

For issues, feature requests, or questions about this node package:
- Contact SOCRadar support at support@socradar.io

## License

This node package is released under the [MIT License](LICENSE.md).
