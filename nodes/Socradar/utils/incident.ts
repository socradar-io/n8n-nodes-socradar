import { IExecuteFunctions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';
import axios, { AxiosRequestConfig } from 'axios';

/**
 * Handle all incident-related operations
 */
export async function handleIncidentOperations(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  i: number,
): Promise<INodeExecutionData> {
  const operation = this.getNodeParameter('operation', i) as string;
  const companyId = this.getNodeParameter('companyId', i) as string;

  if (operation === 'getAll') {
    return await handleGetAllIncidents.call(this, baseUrl, headers, companyId, i);
  } else if (operation === 'get') {
    return await handleGetIncident.call(this, baseUrl, headers, companyId, i);
  } else if (operation === 'addComment') {
    return await handleAddComment.call(this, baseUrl, headers, companyId, i);
  } else if (operation === 'addTag') {
    return await handleAddTag.call(this, baseUrl, headers, companyId, i);
  } else if (operation === 'removeTag') {
    return await handleRemoveTag.call(this, baseUrl, headers, companyId, i);
  }

  throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "incident"!`);
}

/**
 * Handle getting all incidents
 */
async function handleGetAllIncidents(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
    page?: number;
    limit?: number;
    status?: string;
    severity?: string[];
    is_resolved?: boolean;
    is_false_positive?: boolean;
    start_date?: string;
    end_date?: string;
    incident_types?: string[];
    tags?: string[];
    sort_by?: string;
    sort_order?: string;
  };

  const endpoint = `${baseUrl}/company/${companyId}/incidents/v4`;
  const queryParams: Record<string, string | number | boolean | string[]> = {};

  if (additionalFields.page) {
    queryParams.page = additionalFields.page;
  }
  if (additionalFields.limit) {
    queryParams.limit = additionalFields.limit;
  }
  if (additionalFields.status) {
    queryParams.status = additionalFields.status;
  }
  if (additionalFields.severity && additionalFields.severity.length > 0) {
    queryParams.severity = additionalFields.severity;
  }
  if (additionalFields.is_resolved !== undefined) {
    queryParams.is_resolved = additionalFields.is_resolved;
  }
  if (additionalFields.is_false_positive !== undefined) {
    queryParams.is_false_positive = additionalFields.is_false_positive;
  }
  if (additionalFields.start_date) {
    queryParams.start_date = additionalFields.start_date.split('T')[0];
  }
  if (additionalFields.end_date) {
    queryParams.end_date = additionalFields.end_date.split('T')[0];
  }
  if (additionalFields.incident_types && additionalFields.incident_types.length > 0) {
    queryParams.incident_types = additionalFields.incident_types;
  }
  if (additionalFields.tags && additionalFields.tags.length > 0) {
    queryParams.tags = additionalFields.tags;
  }
  if (additionalFields.sort_by) {
    queryParams.sort_by = additionalFields.sort_by;
  }
  if (additionalFields.sort_order) {
    queryParams.sort_order = additionalFields.sort_order;
  }

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

/**
 * Handle getting a single incident
 */
async function handleGetIncident(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const incidentId = this.getNodeParameter('incidentId', i) as string;
  const endpoint = `${baseUrl}/company/${companyId}/incidents/v4`;
  
  // Add the incident ID as a query parameter
  const queryParams: Record<string, string | number | boolean | string[]> = {
    notification_ids: [incidentId],
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

/**
 * Handle adding a comment to an incident
 */
async function handleAddComment(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const incidentId = this.getNodeParameter('incidentId', i) as string;
  const comment = this.getNodeParameter('comment', i) as string;
  const userEmail = this.getNodeParameter('userEmail', i) as string;
  const endpoint = `${baseUrl}/company/${companyId}/alarm/add/comment/v2`;

  const options: AxiosRequestConfig = {
    method: 'POST',
    url: endpoint,
    headers,
    data: { 
      alarm_id: incidentId,
      comment: comment,
      user_email: userEmail,
    },
  };

  const response = await axios(options);
  return {
    json: response.data,
    pairedItem: { item: i },
  };
}

/**
 * Handle adding a tag to an incident
 */
async function handleAddTag(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const incidentId = this.getNodeParameter('incidentId', i) as string;
  const tag = this.getNodeParameter('tag', i) as string;
  const endpoint = `${baseUrl}/company/${companyId}/alarm/tag`;

  const options: AxiosRequestConfig = {
    method: 'POST',
    url: endpoint,
    headers,
    data: { 
      alarm_id: incidentId,
      tag: tag,
    },
  };

  const response = await axios(options);
  return {
    json: response.data,
    pairedItem: { item: i },
  };
}

/**
 * Handle removing a tag from an incident
 */
async function handleRemoveTag(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const incidentId = this.getNodeParameter('incidentId', i) as string;
  const tag = this.getNodeParameter('tag', i) as string;
  const endpoint = `${baseUrl}/company/${companyId}/alarm/tag`;

  const options: AxiosRequestConfig = {
    method: 'DELETE',
    url: endpoint,
    headers,
    data: { 
      alarm_id: incidentId,
      tag: tag,
    },
  };

  const response = await axios(options);
  return {
    json: response.data,
    pairedItem: { item: i },
  };
}
