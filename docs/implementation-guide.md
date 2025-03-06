# SOCRadar n8n Integration - Implementation Guide

This guide provides detailed information about the implementation of the SOCRadar n8n integration, focusing on the architecture, code structure, and extension patterns.

## Architecture Overview

The SOCRadar n8n integration follows a consolidated single-node architecture, where all functionality is implemented in the main `Socradar.node.ts` file. This approach provides several benefits:

1. **Simplified User Experience**: Users interact with a single node for all SOCRadar functionality
2. **Consistent Interface**: All operations follow the same pattern and structure
3. **Easier Maintenance**: Code is centralized and follows consistent patterns
4. **Streamlined Updates**: New features can be added without creating additional nodes

## Architecture

The SOCRadar n8n integration follows a consolidated single-node architecture. All functionality is implemented within the main `Socradar.node.ts` file, which provides a consistent interface for all SOCRadar API resources:

- Incident Management
- Takedown Management
- Digital Footprint API
- Dark Web Monitoring API V2
- DRP Fraud Protection API V2
- Brand Protection API V2
- User Audit Logs

## Code Structure

### Main Components

- **Node Definition**: Defines the node properties, icon, and version
- **Resource Definitions**: Defines the available resources (Incident, Takedown, Digital Footprint, etc.)
- **Operation Definitions**: Defines the operations available for each resource
- **Parameter Definitions**: Defines the parameters required for each operation
- **Execution Logic**: Implements the actual API calls and data processing

### Key Files

- `nodes/Socradar/Socradar.node.ts`: Main node implementation
- `credentials/SocradarApi.credentials.ts`: Credential definition for API authentication
- `test-*.js`: Test scripts for different API functionalities

## Implementation Patterns

### Resource Pattern

Resources are defined in the `description.resources` array, with each resource having:

```typescript
{
  name: 'resourceName',
  displayName: 'Resource Display Name',
  description: 'Description of the resource',
}
```

### Operation Pattern

Operations are defined in the `description.properties.operation.options` array, grouped by resource:

```typescript
{
  name: 'operationName',
  displayName: 'Operation Display Name',
  description: 'Description of the operation',
  value: 'operationValue',
}
```

### Parameter Pattern

Parameters are defined using n8n's parameter system, with consistent patterns for required and optional parameters:

```typescript
{
  displayName: 'Parameter Display Name',
  name: 'parameterName',
  type: 'string', // or other types
  required: true, // or false
  default: '',
  description: 'Description of the parameter',
}
```

### API Call Pattern

API calls follow a consistent pattern:

1. Extract parameters from `items[i].json`
2. Construct the API endpoint URL
3. Set up request options with headers and parameters
4. Make the API call using the credentials
5. Process and return the response

## Digital Footprint API Implementation

The Digital Footprint API implementation follows the established patterns with the following components:

### Resource Definition

```typescript
{
  name: 'digitalFootprint',
  displayName: 'Digital Footprint',
  description: 'Manage digital assets and cloud resources',
}
```

### Operations

1. **Get Digital Assets**
   - Retrieves digital assets with filtering options
   - Endpoint: `/company/{company_id}/asm`
   - Method: GET

2. **Get Cloud Buckets**
   - Retrieves cloud storage buckets
   - Endpoint: `/company/{company_id}/asm/get/cloudBuckets`
   - Method: GET

3. **Add Asset**
   - Adds a new asset (domain or cloud bucket)
   - Endpoints: 
     - `/company/{company_id}/asm/add/domain`
     - `/company/{company_id}/asm/add/cloudBuckets`
   - Method: POST

4. **Mark False Positive**
   - Marks an asset as a false positive
   - Endpoint: `/company/{company_id}/asm/fp`
   - Method: POST

5. **Toggle Monitoring**
   - Enables or disables monitoring for an asset
   - Endpoint: `/company/{company_id}/asm/monitor`
   - Method: POST

### Parameter Handling

Each operation has specific parameter requirements:

1. **Common Parameters**
   - Company ID: Required for all operations
   - Additional Fields: Optional parameters specific to each operation

2. **Operation-Specific Parameters**
   - Get Digital Assets: Asset type, pagination, sorting
   - Add Asset: Asset details based on type
   - Mark False Positive: Asset ID, type, subtype, notes
   - Toggle Monitoring: Asset ID, type, subtype, monitoring status

### Response Processing

Responses are processed to ensure consistency and usability in n8n workflows:

1. Success responses include the full API response
2. Error responses include detailed error information
3. Binary data is handled appropriately when present

## Dark Web Monitoring API V2

The Dark Web Monitoring API V2 implementation provides access to various types of dark web data:

1. **Botnet Data**: Information about compromised credentials and systems
2. **Blackmarket Data**: Information about data being sold on dark web marketplaces
3. **Suspicious Content**: Potentially harmful content related to your organization
4. **PII Exposure**: Personally Identifiable Information exposed on the dark web
5. **IM Content**: Instant Messaging content related to your organization

Each operation follows a consistent pattern:
- Required parameters: Company ID
- Optional parameters: Various filtering options (date range, status, page, limit)
- Error handling: Consistent error reporting with detailed messages

For detailed documentation on the Dark Web Monitoring API V2, see [Dark Web Monitoring API](./dark-web-monitoring.md).

## DRP Fraud Protection API V2

The DRP Fraud Protection API V2 implementation provides access to fraud detection data to help organizations monitor and mitigate fraud risks:

1. **Fraud Protection Data**: Comprehensive information about detected fraud instances

The implementation follows a consistent pattern:
- Required parameters: Company ID
- Optional parameters: Extensive filtering options including:
  - Search string
  - Record status and reason
  - Alarm status
  - CVV and country code
  - Date ranges
  - Pagination controls
- Error handling: Consistent error reporting with detailed messages

The API is designed to help different systems, such as e-commerce websites or financial systems, to communicate and share information about detected fraud instances, improving security measures and reducing the chances of fraudulent activities.

For detailed documentation on the DRP Fraud Protection API V2, see [Fraud Protection API](./fraud-protection.md).

## Brand Protection API V2

The Brand Protection API V2 implementation provides access to brand protection data to help organizations monitor and mitigate brand-related risks:

1. **Impersonating Accounts**: Information about social media accounts impersonating your brand
2. **Impersonating Domains**: Information about domains that may be impersonating your brand
3. **Rogue Mobile Applications**: Information about unauthorized mobile applications using your brand
4. **Bad Reputation**: Information about brand mentions with negative reputation
5. **Social Media Findings**: Information about brand-related findings on social media platforms

The implementation follows a consistent pattern:
- Required parameters: Company ID and Operation Type
- Optional parameters: Extensive filtering options including:
  - Search string
  - Record status and reason
  - Alarm status
  - Country code
  - Date ranges
  - Pagination controls
- Error handling: Consistent error reporting with detailed messages

The API is designed to help organizations protect their brand identity across various digital channels, detect potential brand infringements, and take appropriate actions to mitigate risks.

For detailed documentation on the Brand Protection API V2, see [Brand Protection API](./brand-protection.md).

## Extending the Integration

### Adding a New Resource

To add a new resource:

1. Add the resource definition to `description.resources`
2. Add operations for the resource
3. Implement parameter definitions for each operation
4. Implement execution logic in the `execute` method
5. Add documentation and tests

### Adding a New Operation

To add a new operation to an existing resource:

1. Add the operation definition to the resource's operations
2. Implement parameter definitions for the operation
3. Add the execution logic in the `execute` method
4. Update documentation and tests

### Best Practices

1. **Consistent Naming**: Follow established naming conventions
2. **Parameter Validation**: Validate parameters before making API calls
3. **Error Handling**: Implement comprehensive error handling
4. **Documentation**: Document all new functionality
5. **Testing**: Create test scripts for new functionality

## API Authentication

All API calls use the SOCRadar API credentials defined in `SocradarApi.credentials.ts`. The API key is included in the `Api-Key` header for all requests.

## Versioning

The integration follows semantic versioning:

- **Major Version**: Breaking changes
- **Minor Version**: New features without breaking changes
- **Patch Version**: Bug fixes and minor improvements

## Conclusion

This implementation guide provides a comprehensive overview of the SOCRadar n8n integration architecture and implementation patterns. By following these patterns, developers can easily extend and maintain the integration with new features and improvements.
