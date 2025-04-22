import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';

/**
 * Handle all dark web monitoring related operations
 */
export async function handleDarkWebMonitoringOperations(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  i: number,
): Promise<INodeExecutionData> {
  const operation = this.getNodeParameter('operation', i) as string;
  const companyId = this.getNodeParameter('companyId', i) as string;

  try {
    if (operation === 'getBotnetData') {
      return await handleGetBotnetData.call(this, baseUrl, headers, companyId, i);
    } else if (operation === 'getBlackmarket') {
      return await handleGetBlackmarket.call(this, baseUrl, headers, companyId, i);
    } else if (operation === 'getSuspiciousContent') {
      return await handleGetSuspiciousContent.call(this, baseUrl, headers, companyId, i);
    } else if (operation === 'getPiiExposure') {
      return await handleGetPiiExposure.call(this, baseUrl, headers, companyId, i);
    } else if (operation === 'getImContent') {
      return await handleGetImContent.call(this, baseUrl, headers, companyId, i);
    }

    throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "darkWebMonitoring"!`);
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
    throw new NodeOperationError(this.getNode(), `Dark Web Monitoring Error: ${error.message}`, { itemIndex: i });
  }
}

/**
 * Handle getting botnet data
 */
async function handleGetBotnetData(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
    searchString?: string;
    recordStatus?: string;
    page?: number;
    alarmid?: string;
    notificationid?: string;
    limit?: number;
  };

  const endpoint = `${baseUrl}/company/${companyId}/dark-web-monitoring/botnet-data/v2`;
  const queryParams: Record<string, string | number> = {};

  if (additionalFields.searchString) {
    queryParams.searchString = additionalFields.searchString;
  }
  if (additionalFields.recordStatus) {
    queryParams.recordStatus = additionalFields.recordStatus;
  }
  if (additionalFields.page) {
    queryParams.page = additionalFields.page;
  }
  if (additionalFields.alarmid) {
    queryParams.alarmid = additionalFields.alarmid;
  }
  if (additionalFields.notificationid) {
    queryParams.notificationid = additionalFields.notificationid;
  }
  if (additionalFields.limit) {
    queryParams.limit = additionalFields.limit;
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

/**
 * Handle getting blackmarket data
 */
async function handleGetBlackmarket(
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
    alarmId?: string;
  };

  const endpoint = `${baseUrl}/company/${companyId}/dark-web-monitoring/blackmarket/v2`;
  const queryParams: Record<string, string | number> = {};

  if (additionalFields.startDate) {
    queryParams.startDate = additionalFields.startDate.split('T')[0];
  }
  if (additionalFields.endDate) {
    queryParams.endDate = additionalFields.endDate.split('T')[0];
  }
  if (additionalFields.page) {
    queryParams.page = additionalFields.page;
  }
  if (additionalFields.limit) {
    queryParams.limit = additionalFields.limit;
  }
  if (additionalFields.alarmId) {
    queryParams.alarmId = additionalFields.alarmId;
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

/**
 * Handle getting suspicious content
 */
async function handleGetSuspiciousContent(
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
    alarmId?: string;
  };

  const endpoint = `${baseUrl}/company/${companyId}/dark-web-monitoring/suspicious-content/v2`;
  const queryParams: Record<string, string | number> = {};

  if (additionalFields.startDate) {
    queryParams.startDate = additionalFields.startDate.split('T')[0];
  }
  if (additionalFields.endDate) {
    queryParams.endDate = additionalFields.endDate.split('T')[0];
  }
  if (additionalFields.page) {
    queryParams.page = additionalFields.page;
  }
  if (additionalFields.limit) {
    queryParams.limit = additionalFields.limit;
  }
  if (additionalFields.alarmId) {
    queryParams.alarmId = additionalFields.alarmId;
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

/**
 * Handle getting PII exposure data
 */
async function handleGetPiiExposure(
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
    alarmId?: string;
  };

  const endpoint = `${baseUrl}/company/${companyId}/dark-web-monitoring/pii-exposure/v2`;
  const queryParams: Record<string, string | number> = {};

  if (additionalFields.startDate) {
    queryParams.startDate = additionalFields.startDate.split('T')[0];
  }
  if (additionalFields.endDate) {
    queryParams.endDate = additionalFields.endDate.split('T')[0];
  }
  if (additionalFields.page) {
    queryParams.page = additionalFields.page;
  }
  if (additionalFields.limit) {
    queryParams.limit = additionalFields.limit;
  }
  if (additionalFields.alarmId) {
    queryParams.alarmId = additionalFields.alarmId;
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

/**
 * Handle getting IM content
 */
async function handleGetImContent(
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
    searchString?: string;
  };

  const endpoint = `${baseUrl}/company/${companyId}/dark-web-monitoring/im-content/v2`;
  const queryParams: Record<string, string | number> = {};

  if (additionalFields.startDate) {
    queryParams.startDate = additionalFields.startDate.split('T')[0];
  }
  if (additionalFields.endDate) {
    queryParams.endDate = additionalFields.endDate.split('T')[0];
  }
  if (additionalFields.page) {
    queryParams.page = additionalFields.page;
  }
  if (additionalFields.limit) {
    queryParams.limit = additionalFields.limit;
  }
  if (additionalFields.searchString) {
    queryParams.searchString = additionalFields.searchString;
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
