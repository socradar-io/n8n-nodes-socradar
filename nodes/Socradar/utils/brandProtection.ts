import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';

/**
 * Handle all brand protection related operations
 */
export async function handleBrandProtectionOperations(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  i: number,
): Promise<INodeExecutionData> {
  const operation = this.getNodeParameter('operation', i) as string;
  const companyId = this.getNodeParameter('companyId', i) as string;

  try {
    if (operation === 'getBrandProtection') {
      return await handleGetBrandProtection.call(this, baseUrl, headers, companyId, i);
    }

    throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "brandProtection"!`);
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
    throw new NodeOperationError(this.getNode(), `Brand Protection Error: ${error.message}`, { itemIndex: i });
  }
}

/**
 * Handle getting brand protection data by operation type
 */
async function handleGetBrandProtection(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const operationType = this.getNodeParameter('operationType', i) as string;
  const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
    searchString?: string;
    recordStatus?: string;
    recordStatusReason?: string;
    alarmStatus?: string;
    countryCode?: string;
    page?: number;
    limit?: number;
    includeHistorical?: boolean;
    startDate?: string;
    endDate?: string;
    orderDir?: string;
  };

  let endpoint = `${baseUrl}/company/${companyId}/brand-protection`;
  
  // Adjust endpoint based on operation type
  switch (operationType) {
    case 'impersonatingAccounts':
      endpoint += '/impersonating-accounts/v2';
      break;
    case 'impersonatingDomains':
      endpoint += '/impersonating-domains/v2';
      break;
    case 'rogueMobileApplications':
      endpoint += '/rogue-mobile-applications/v2';
      break;
    case 'badReputation':
      endpoint += '/bad-reputation/v2';
      break;
    case 'socialMediaFindings':
      endpoint += '/social-media-findings/v2';
      break;
    default:
      throw new NodeOperationError(this.getNode(), `The operation type "${operationType}" is not supported!`);
  }

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
  if (additionalFields.countryCode) {
    queryParams.countryCode = additionalFields.countryCode;
  }
  if (additionalFields.page) {
    queryParams.page = additionalFields.page;
  }
  if (additionalFields.limit) {
    queryParams.limit = additionalFields.limit;
  }
  if (additionalFields.includeHistorical !== undefined) {
    queryParams.includeHistorical = additionalFields.includeHistorical;
  }
  if (additionalFields.startDate) {
    queryParams.startDate = additionalFields.startDate;
  }
  if (additionalFields.endDate) {
    queryParams.endDate = additionalFields.endDate;
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
