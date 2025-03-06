# SOCRadar Brand Protection API V2

The SOCRadar Brand Protection API helps organizations monitor and protect their brand presence online. It provides comprehensive data about potential brand infringements, impersonations, and other brand-related threats across the internet.

## Overview

The Brand Protection API V2 in the SOCRadar n8n node allows you to:

- Retrieve various types of brand protection data with comprehensive filtering options
- Monitor and analyze brand infringement instances across your organization
- Integrate brand protection capabilities into your n8n workflows

## Operations

### Get Brand Protection Data

Retrieves brand protection data based on specified filters and operation type.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| Company ID | String | **Required**. The unique identifier for your company. |
| Operation Type | Options | **Required**. The type of brand protection data to retrieve. |

**Operation Types:**

| Operation Type | Description |
|---------------|-------------|
| Impersonating Accounts | Retrieves data about social media accounts impersonating your brand |
| Impersonating Domains | Retrieves data about domains that may be impersonating your brand |
| Rogue Mobile Applications | Retrieves data about unauthorized mobile applications using your brand |
| Bad Reputation | Retrieves data about brand mentions with negative reputation |
| Social Media Findings | Retrieves data about brand-related findings on social media platforms |

**Additional Fields:**

| Field | Type | Description |
|-------|------|-------------|
| Search String | String | Search string for filtering results |
| Record Status | String | Status of the brand protection record (e.g., OPEN,CLOSED,ON_HOLD) |
| Record Status Reason | String | Reason for the brand protection status (e.g., INVESTIGATING) |
| Alarm Status | String | Status of the brand protection alarm (e.g., OPEN) |
| Country Code | String | Country code filter |
| Include History | Boolean | Whether to include historical records |
| Start Date | String | Start date for filtering brand protection records (YYYY-MM-DD) |
| End Date | String | End date for filtering brand protection records (YYYY-MM-DD) |
| Page | Number | Page number for pagination |
| Limit | Number | Number of results per page |
| Order Direction | String | Sorting order for results (asc/desc) |

## Example Usage

### Basic Brand Protection Data Retrieval

This example demonstrates how to retrieve impersonating domains data for a specific company:

1. Add a SOCRadar node to your workflow
2. Select "Brand Protection" as the Resource
3. Select "Get Brand Protection Data" as the Operation
4. Enter your Company ID
5. Select "Impersonating Domains" as the Operation Type
6. Execute the workflow

### Filtering Brand Protection Data

To filter brand protection data by specific criteria:

1. Add a SOCRadar node to your workflow
2. Select "Brand Protection" as the Resource
3. Select "Get Brand Protection Data" as the Operation
4. Enter your Company ID
5. Select the appropriate Operation Type (e.g., "Social Media Findings")
6. In the Additional Fields section, add filters such as:
   - Record Status: "OPEN"
   - Start Date: "2025-01-01"
   - End Date: "2025-03-05"
   - Limit: 50
7. Execute the workflow

## Integration with Other Workflows

The Brand Protection API can be integrated with other n8n nodes to create powerful workflows:

- Use with HTTP Request nodes to forward brand protection data to other systems
- Combine with Slack or Email nodes to send notifications about new brand infringements
- Integrate with database nodes to store and analyze brand protection data over time
- Use with conditional nodes to trigger different actions based on infringement severity

## Error Handling

The Brand Protection API includes comprehensive error handling:

- 400 Bad Request: Check your parameters for correctness
- 401 Unauthorized: Verify your API key is valid
- Other errors: Check the error message for details

## Best Practices

- Use pagination for large result sets
- Implement appropriate filtering to reduce data volume
- Consider rate limits when making frequent API calls
- Store and analyze historical brand protection data for pattern recognition
