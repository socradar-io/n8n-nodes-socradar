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
    if (operation === 'getAll') {
      return await handleGetAllAuditLogs.call(this, baseUrl, headers, companyId, i);
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
 * Handle getting all audit logs
 */
async function handleGetAllAuditLogs(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
		userId?: string;
		actionType?: string;
  };

  const endpoint = `${baseUrl}/company/${companyId}/auditLogs`;
  const queryParams: Record<string, string | number | boolean> = {};

  // Add all additional fields to query parameters
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
	if (additionalFields.userId) {
		queryParams.userId = additionalFields.userId;
	}
	if (additionalFields.actionType) {
		queryParams.actionType = additionalFields.actionType;
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
