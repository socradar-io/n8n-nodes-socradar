# Changelog

All notable changes to this project will be documented in this file.

## 1.8.4 (2025-03-07)

### Fixed
- Fixed credential icon display issue:
  - Added proper icon support for credentials in n8n UI
  - Updated gulpfile.js to copy credential icons during build
  - Modified .npmignore to include credential icons in package
  - Implemented light/dark mode icon support

## 1.8.3 (2025-03-06)

### Fixed
- Updated README.md:
  - Removed github issue link.

## 1.8.2 (2025-03-06)

### Fixed
- Updated README.md:
  - Fixed incorrect package installation instructions to use @socradar scope
  - Added latest features (Brand Protection, Fraud Protection, Dark Web Monitoring)
  - Updated authentication requirements
  - Added comprehensive feature descriptions
  - Updated version history

## 1.8.1 (2025-03-06)

### Changed
- Optimized build process:
  - Removed test step from build script
  - Improved linting configuration
  - Enhanced build verification
  - Streamlined CI/CD pipeline

## 1.8.0 (2025-03-06)

### Changed
- Enhanced Digital Footprint API integration:
  - Made Asset Type a required parameter for getDigitalAssets operation
  - Converted Asset Type from string input to dropdown selection
  - Aligned asset type options with AssetInvestigationType enum
  - Reordered asset type options for better organization
  - Improved parameter validation and error handling
  - Streamlined API request handling for asset type filtering

## 1.7.0 (2025-03-05)

### Added
- Added Brand Protection API V2 support
  - New resource: Brand Protection API V2
  - Operation: Get Brand Protection Data with multiple operation types:
    - Impersonating Accounts
    - Impersonating Domains
    - Rogue Mobile Applications
    - Bad Reputation
    - Social Media Findings
  - Comprehensive filtering options
  - Detailed documentation

## 1.6.0 (2025-03-05)

### Features

- Added DRP Fraud Protection API V2 support
  - Implemented comprehensive fraud protection data retrieval
  - Added support for detailed filtering options
  - Integrated with existing SOCRadar node architecture

## 1.5.0 (2025-03-05)

### Added
- Added Dark Web Monitoring API V2 support
  - Botnet Data
  - Blackmarket Data
  - Suspicious Content
  - PII Exposure
  - IM Content

## 1.4.0 (2025-03-04)

### Added
- Added Digital Footprint API support
- Added operations for managing digital assets:
  - Get Digital Assets with filtering and pagination
  - Get Cloud Buckets
  - Add Asset (Domain, Cloud Bucket)
  - Mark False Positive
  - Toggle Monitoring
- Added comprehensive parameter handling for all Digital Footprint operations

## 1.3.0 (2025-03-05)

### Added
- Added User Audit Logs API support
- Added date range filtering for audit logs
- Added limit parameter for controlling the number of returned logs

### Changed
- Updated package.json keywords to include 'cybersecurity' instead of 'security'
- Improved error handling for all API endpoints

## 1.2.0 (2025-03-05)

### Changed
- Consolidated all functionality into a single Socradar node
- Removed version-specific implementations (v1, v2, v3, v4)
- Focused on using the latest V4 incident API
- Maintained full functionality for both Incidents and Takedowns
- Removed unnecessary files and directories

## 1.1.2 (2025-03-05)

### Fixed
- Fixed TakedownV1 node inputs and outputs type definition
- Updated build process to support version-specific nodes

## 1.1.1 (2023-12-01)

### Changed
- Restored version-specific node implementation
- Removed API version parameter from main Socradar node
- Updated documentation to reflect version-specific approach
- Fixed endpoint URLs to match API version requirements

## 1.1.0 (2023-11-15)

### Added
- Added Takedown API support
- Added support for SOCRadar API v3 and v4
- Added more filtering options for incidents

### Changed
- Improved error handling
- Updated documentation

## 1.0.0 (2023-10-01)

### Added
- Initial release with SOCRadar Incident API support
- Support for basic incident retrieval and filtering
