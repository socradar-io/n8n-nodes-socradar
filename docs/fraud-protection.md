# SOCRadar DRP Fraud Protection API V2

The SOCRadar DRP (Digital Risk Protection) Fraud Protection API helps different systems, such as e-commerce websites or financial systems, to communicate and share information about detected fraud instances. The API's main goal is to improve security measures and reduce the chances of fraudulent activities by providing a means for systems to exchange information about fraud detections.

## Overview

The Fraud Protection API V2 in the SOCRadar n8n node allows you to:

- Retrieve fraud protection data with comprehensive filtering options
- Monitor and analyze fraud instances across your organization
- Integrate fraud detection capabilities into your n8n workflows

## Operations

### Get Fraud Protection Data

Retrieves fraud protection data based on specified filters.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| Company ID | String | **Required**. The unique identifier for your company. |

**Additional Fields:**

| Field | Type | Description |
|-------|------|-------------|
| Search String | String | Search string for filtering results |
| Record Status | String | Status of the fraud record (e.g., OPEN) |
| Record Status Reason | String | Reason for the fraud status (e.g., INVESTIGATING) |
| Alarm Status | String | Status of the fraud alarm (e.g., OPEN) |
| CVV | String | Card validation value (CVV) |
| Country Code | String | Country code filter |
| Expired | Boolean | Indicates if the fraud report is expired |
| Alarm ID | Number | Unique ID of the alarm |
| Notification ID | Number | Unique ID of the notification |
| Include History | Boolean | Whether to include historical records |
| Start Date | String | Start date for filtering fraud records (YYYY-MM-DD) |
| End Date | String | End date for filtering fraud records (YYYY-MM-DD) |
| Page | Number | Page number for pagination |
| Limit | Number | Number of results per page |
| Order Direction | String | Sorting order for results (asc/desc) |

## Example Usage

### Basic Fraud Protection Data Retrieval

This example demonstrates how to retrieve fraud protection data for a specific company:

1. Add a SOCRadar node to your workflow
2. Select "DRP Fraud Protection" as the Resource
3. Select "Get Fraud Protection Data" as the Operation
4. Enter your Company ID
5. Configure any additional filters as needed
6. Execute the workflow

### Filtering Fraud Protection Data

To filter fraud protection data by specific criteria:

1. Add a SOCRadar node to your workflow
2. Select "DRP Fraud Protection" as the Resource
3. Select "Get Fraud Protection Data" as the Operation
4. Enter your Company ID
5. In the Additional Fields section, add filters such as:
   - Record Status: "OPEN"
   - Start Date: "2025-01-01"
   - End Date: "2025-03-05"
   - Limit: 50
6. Execute the workflow

## Integration with Other Workflows

The Fraud Protection API can be integrated with other n8n nodes to create powerful workflows:

- Use with HTTP Request nodes to forward fraud data to other systems
- Combine with Slack or Email nodes to send notifications about new fraud instances
- Integrate with database nodes to store and analyze fraud data over time
- Use with conditional nodes to trigger different actions based on fraud severity

## Error Handling

The Fraud Protection API includes comprehensive error handling:

- 400 Bad Request: Check your parameters for correctness
- 401 Unauthorized: Verify your API key is valid
- Other errors: Check the error message for details

## Best Practices

- Use pagination for large result sets
- Implement appropriate filtering to reduce data volume
- Consider rate limits when making frequent API calls
- Store and analyze historical fraud data for pattern recognition
