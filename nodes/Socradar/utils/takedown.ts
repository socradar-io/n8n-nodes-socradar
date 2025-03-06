import { IExecuteFunctions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';
import axios, { AxiosRequestConfig } from 'axios';

/**
 * Handle all takedown-related operations
 */
export async function handleTakedownOperations(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  i: number,
): Promise<INodeExecutionData> {
  const operation = this.getNodeParameter('operation', i) as string;
  const companyId = this.getNodeParameter('companyId', i) as string;

  try {
    if (operation === 'createDomain') {
      return await handleCreateDomainTakedown.call(this, baseUrl, headers, companyId, i);
    } else if (operation === 'createSocialMedia') {
      return await handleCreateSocialMediaTakedown.call(this, baseUrl, headers, companyId, i);
    } else if (operation === 'createSourceCode') {
      return await handleCreateSourceCodeTakedown.call(this, baseUrl, headers, companyId, i);
    } else if (operation === 'getProgress') {
      return await handleGetTakedownProgress.call(this, baseUrl, headers, companyId, i);
    }

    throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "takedown"!`);
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
    throw new NodeOperationError(this.getNode(), `Takedown Error: ${error.message}`, { itemIndex: i });
  }
}

/**
 * Handle creating a domain takedown
 */
async function handleCreateDomainTakedown(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const entity = this.getNodeParameter('entity', i) as string;
  const abuseType = this.getNodeParameter('abuse_type', i) as string;
  const type = this.getNodeParameter('type', i) as string;
  const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
    notes?: string;
    send_alarm?: boolean;
    email?: string;
  };

  const endpoint = `${baseUrl}/add/company/${companyId}/takedown/request`;
  const body: Record<string, any> = { 
    entity, 
    abuse_type: abuseType, 
    type 
  };

  if (additionalFields.notes) {
    body.notes = additionalFields.notes;
  }
  if (additionalFields.send_alarm !== undefined) {
    body.send_alarm = additionalFields.send_alarm;
  }
  if (additionalFields.email) {
    body.email = additionalFields.email;
  }

  const options: AxiosRequestConfig = {
    method: 'POST',
    url: endpoint,
    headers,
    data: body,
  };

  const response = await axios(options);
  return {
    json: response.data,
    pairedItem: { item: i },
  };
}

/**
 * Handle creating a social media takedown
 */
async function handleCreateSocialMediaTakedown(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const impersonatingAccount = this.getNodeParameter('impersonating_account', i) as string;
  const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
    notes?: string;
    send_alarm?: boolean;
    email?: string;
  };

  const endpoint = `${baseUrl}/add/company/${companyId}/takedown/request/social_media_risks`;
  const body: Record<string, any> = { 
    impersonating_account: impersonatingAccount 
  };

  if (additionalFields.notes) {
    body.notes = additionalFields.notes;
  }
  if (additionalFields.send_alarm !== undefined) {
    body.send_alarm = additionalFields.send_alarm;
  }
  if (additionalFields.email) {
    body.email = additionalFields.email;
  }

  const options: AxiosRequestConfig = {
    method: 'POST',
    url: endpoint,
    headers,
    data: body,
  };

  const response = await axios(options);
  return {
    json: response.data,
    pairedItem: { item: i },
  };
}

/**
 * Handle creating a source code leak takedown
 */
async function handleCreateSourceCodeTakedown(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const id = this.getNodeParameter('id', i) as number;
  const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
    notes?: string;
    email?: string;
  };

  const endpoint = `${baseUrl}/add/company/${companyId}/takedown/request/source_code_leaks`;
  const body: Record<string, any> = { id };

  if (additionalFields.notes) {
    body.notes = additionalFields.notes;
  }
  if (additionalFields.email) {
    body.email = additionalFields.email;
  }

  const options: AxiosRequestConfig = {
    method: 'POST',
    url: endpoint,
    headers,
    data: body,
  };

  const response = await axios(options);
  return {
    json: response.data,
    pairedItem: { item: i },
  };
}

/**
 * Handle getting takedown progress
 */
async function handleGetTakedownProgress(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const assetId = this.getNodeParameter('asset_id', i) as string;
  const type = this.getNodeParameter('type', i) as string;

  const endpoint = `${baseUrl}/get/company/${companyId}/takedown/progress`;
  const queryParams: Record<string, string> = {
    asset_id: assetId,
    type,
  };

  const options: AxiosRequestConfig = {
    method: 'GET',
    url: endpoint,
    headers,
    params: queryParams,
  };

  const response = await axios(options);
  return {
    json: response.data,
    pairedItem: { item: i },
  };
}
