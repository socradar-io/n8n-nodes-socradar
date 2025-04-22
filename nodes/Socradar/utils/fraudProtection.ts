import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';

/**
 * Handle all fraud protection related operations
 */
export async function handleFraudProtectionOperations(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  i: number,
): Promise<INodeExecutionData> {
  const operation = this.getNodeParameter('operation', i) as string;
  const companyId = this.getNodeParameter('companyId', i) as string;

  try {
    if (operation === 'getFraudProtection') {
      return await handleGetFraudProtection.call(this, baseUrl, headers, companyId, i);
    }

    throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "fraudProtection"!`);
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
    throw new NodeOperationError(this.getNode(), `Fraud Protection Error: ${error.message}`, { itemIndex: i });
  }
}

/**
 * Handle getting fraud protection data with V2 API
 */
async function handleGetFraudProtection(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
    searchString?: string;
    recordStatus?: string;
    recordStatusReason?: string;
    alarmStatus?: string;
    cvv?: string;
    countryCode?: string;
    expired?: boolean;
    alarmId?: number;
    notificationId?: number;
    includeHistory?: boolean;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
    orderDir?: string;
  };

  const endpoint = `${baseUrl}/company/${companyId}/fraud-protection/v2`;
  const queryParams: Record<string, string | number | boolean> = {};

  // Add all additional fields to query parameters
  if (additionalFields.searchString) {
    queryParams.searchString = additionalFields.searchString;
  }
  if (additionalFields.recordStatus) {
    queryParams.recordStatus = additionalFields.recordStatus;
  }
  if (additionalFields.recordStatusReason) {
    queryParams.recordStatusReason = additionalFields.recordStatusReason;
  }
  if (additionalFields.alarmStatus) {
    queryParams.alarmStatus = additionalFields.alarmStatus;
  }
  if (additionalFields.cvv) {
    queryParams.cvv = additionalFields.cvv;
  }
  if (additionalFields.countryCode) {
    queryParams.countryCode = additionalFields.countryCode;
  }
  if (additionalFields.expired !== undefined) {
    queryParams.expired = additionalFields.expired;
  }
  if (additionalFields.alarmId) {
    queryParams.alarmId = additionalFields.alarmId;
  }
  if (additionalFields.notificationId) {
    queryParams.notificationId = additionalFields.notificationId;
  }
  if (additionalFields.includeHistory !== undefined) {
    queryParams.includeHistory = additionalFields.includeHistory;
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
