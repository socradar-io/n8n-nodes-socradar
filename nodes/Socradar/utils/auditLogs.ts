import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';

/**
 * Handle all audit logs related operations
 */
export async function handleAuditLogsOperations(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  i: number,
): Promise<INodeExecutionData> {
  const operation = this.getNodeParameter('operation', i) as string;
  const companyId = this.getNodeParameter('companyId', i) as string;

  try {
    if (operation === 'getAuditLogs') {
      return await handleGetAuditLogs.call(this, baseUrl, headers, companyId, i);
    }

    throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "auditLogs"!`);
  } catch (error) {
    if (this.continueOnFail()) {
      return {
        json: {
          error: error.message,
          details: error.response?.data || 'No additional error details',
        },
        pairedItem: { item: i },
      };
    }
    throw new NodeOperationError(this.getNode(), `Audit Logs Error: ${error.message}`, { itemIndex: i });
  }
}

/**
 * Handle getting audit logs data
 */
async function handleGetAuditLogs(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
    searchString?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
    orderDir?: string;
  };

  const endpoint = `${baseUrl}/company/${companyId}/audit-logs`;
  const queryParams: Record<string, string | number | boolean> = {};

  // Add all additional fields to query parameters
  if (additionalFields.searchString) {
    queryParams.searchString = additionalFields.searchString;
  }
  if (additionalFields.startDate) {
    queryParams.startDate = additionalFields.startDate;
  }
  if (additionalFields.endDate) {
    queryParams.endDate = additionalFields.endDate;
  }
  if (additionalFields.page) {
    queryParams.page = additionalFields.page;
  }
  if (additionalFields.limit) {
    queryParams.limit = additionalFields.limit;
  }
  if (additionalFields.orderDir) {
    queryParams.orderDir = additionalFields.orderDir;
  }

  const options: IHttpRequestOptions = {
    method: 'GET',
    url: endpoint,
    headers,
    qs: queryParams,
  };

  const response = await this.helpers.httpRequest(options);
  return {
    json: response,
    pairedItem: { item: i },
  };
}
