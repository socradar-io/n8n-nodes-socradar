import { IExecuteFunctions, INodeExecutionData, NodeOperationError } from 'n8n-workflow';
import axios, { AxiosRequestConfig } from 'axios';

/**
 * Handle all digital footprint related operations
 */
export async function handleDigitalFootprintOperations(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  i: number,
): Promise<INodeExecutionData> {
  const operation = this.getNodeParameter('operation', i) as string;
  const companyId = this.getNodeParameter('companyId', i) as string;

  try {
    if (operation === 'getDigitalAssets') {
      return await handleGetDigitalAssets.call(this, baseUrl, headers, companyId, i);
    } else if (operation === 'addAsset') {
      return await handleAddAsset.call(this, baseUrl, headers, companyId, i);
    } else if (operation === 'markFalsePositive') {
      return await handleMarkFalsePositive.call(this, baseUrl, headers, companyId, i);
    } else if (operation === 'toggleMonitoring') {
      return await handleToggleMonitoring.call(this, baseUrl, headers, companyId, i);
    }

    throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported for resource "digitalFootprint"!`);
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
    throw new NodeOperationError(this.getNode(), `Digital Footprint Error: ${error.message}`, { itemIndex: i });
  }
}

/**
 * Handle getting digital assets
 * Based on the OpenAPI specification for /company/{company_id}/asm endpoint
 */
async function handleGetDigitalAssets(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const endpoint = `${baseUrl}/company/${companyId}/asm`;
  
  // Get required parameters
  const assetType = this.getNodeParameter('assetType', i) as string;
  
  // Get optional parameters
  const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
    pageNumber?: number;
    pageLimit?: number;
    sortBy?: string;
    sortDesc?: boolean;
  };
  
  const queryParams: Record<string, string | number | boolean> = {
    assetType, // Always include assetType as it's required
  };
  
  // Add pagination parameters
  if (additionalFields.pageNumber !== undefined) {
    queryParams.pageNumber = additionalFields.pageNumber;
  }
  if (additionalFields.pageLimit !== undefined) {
    queryParams.pageLimit = additionalFields.pageLimit;
  }
  
  // Add sorting parameters
  if (additionalFields.sortBy) {
    queryParams.sortBy = additionalFields.sortBy;
  }
  if (additionalFields.sortDesc !== undefined) {
    queryParams.sortDesc = additionalFields.sortDesc;
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
 * Handle adding an asset
 * Based on the OpenAPI specification for /company/{company_id}/asm/add/{asset_type} endpoint
 */
async function handleAddAsset(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const assetType = this.getNodeParameter('assetType', i) as string;
  const assetName = this.getNodeParameter('assetName', i) as string;
  
  // Generic endpoint based on asset type
  const endpoint = `${baseUrl}/company/${companyId}/asm/add/${assetType}`;
  
  // Common properties for all asset types
  const body: Record<string, any> = {
    asset_name: assetName,
    source: 'manual',
  };
  
  // Add asset type specific properties
  switch (assetType) {
    case 'domain':
      body.domain = this.getNodeParameter('domain', i) as string;
      body.domain_type = this.getNodeParameter('domainType', i) as string;
      break;
      
    case 'cloudBuckets':
      body.cloud_platform_name = this.getNodeParameter('cloudPlatformName', i) as string;
      body.access_state = this.getNodeParameter('accessState', i) as string;
      body.service_name = 'manual_entry';
      break;
      
    case 'ipAddress':
      body.ip_address = this.getNodeParameter('ipAddress', i) as string;
      break;
      
    case 'website':
      // For website, we use the asset_name as the URL
      body.url = assetName;
      break;
      
    case 'loginPage':
      // For login page, we use the asset_name as the URL
      body.url = assetName;
      break;
      
    case 'dnsRecord':
      // DNS record might require additional fields based on API
      body.record_type = 'A'; // Default to A record
      break;
      
    case 'sslCertificate':
      // SSL certificate might require domain or hostname
      body.hostname = assetName;
      break;
      
    case 'ipBlock':
      // IP Block might require CIDR notation
      body.cidr = assetName;
      break;
      
    case 'mobileApplication':
      // Mobile app might require platform info
      body.platform = 'android'; // Default to Android
      break;
      
    case 'technology':
      // Technology might require category
      body.category = 'web';
      break;
      
    case 'socialAccounts':
      // Social account might require platform
      body.platform = 'twitter';
      break;
      
    case 'sourceCodeRepo':
      // Source code repo might require platform
      body.platform = 'github';
      break;
      
    default:
      throw new NodeOperationError(
        this.getNode(),
        `Asset type '${assetType}' is not supported for the addAsset operation!`,
      );
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
 * Handle marking an asset as false positive
 * Based on the OpenAPI specification for /company/{company_id}/asm/fp endpoint
 * Supports all asset types from AssetInvestigationType enum
 */
async function handleMarkFalsePositive(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const endpoint = `${baseUrl}/company/${companyId}/asm/fp`;
  const assetId = this.getNodeParameter('assetId', i) as string;
  const assetType = this.getNodeParameter('assetType', i) as string;
  const subType = this.getNodeParameter('subType', i) as string;
  const notes = this.getNodeParameter('notes', i, '') as string;

  // Validate asset type
  const validAssetTypes = [
    'domain', 'ipAddress', 'website', 'loginPage', 'dnsRecord', 
    'sslCertificate', 'ipBlock', 'mobileApplication', 'technology', 
    'cloudBuckets', 'socialAccounts', 'sourceCodeRepo'
  ];
  
  if (!validAssetTypes.includes(assetType)) {
    throw new NodeOperationError(
      this.getNode(),
      `Asset type '${assetType}' is not supported for the markFalsePositive operation!`,
    );
  }

  // Validate asset ID
  const assetIdNum = parseInt(assetId, 10);
  if (isNaN(assetIdNum)) {
    throw new NodeOperationError(
      this.getNode(),
      `Invalid asset ID: '${assetId}'. Asset ID must be a number.`,
    );
  }

  const body = {
    asset_id: assetIdNum,
    asset_type: assetType,
    sub_type: subType,
    notes,
  };

  const options: AxiosRequestConfig = {
    method: 'POST',
    url: endpoint,
    headers,
    data: body,
  };

  try {
    const response = await axios(options);
    return {
      json: response.data,
      pairedItem: { item: i },
    };
  } catch (error) {
    throw new NodeOperationError(
      this.getNode(),
      `Error marking asset as false positive: ${error.message}`,
      { itemIndex: i },
    );
  }
}

/**
 * Handle toggling monitoring for an asset
 * Based on the OpenAPI specification for /company/{company_id}/asm/monitor endpoint
 * Supports all asset types from AssetInvestigationType enum
 */
async function handleToggleMonitoring(
  this: IExecuteFunctions,
  baseUrl: string,
  headers: Record<string, string>,
  companyId: string,
  i: number,
): Promise<INodeExecutionData> {
  const endpoint = `${baseUrl}/company/${companyId}/asm/monitor`;
  const assetId = this.getNodeParameter('assetId', i) as string;
  const assetType = this.getNodeParameter('assetType', i) as string;
  const monitor = this.getNodeParameter('monitor', i) as boolean;

  // Validate asset type
  const validAssetTypes = [
    'domain', 'ipAddress', 'website', 'loginPage', 'dnsRecord', 
    'sslCertificate', 'ipBlock', 'mobileApplication', 'technology', 
    'cloudBuckets', 'socialAccounts', 'sourceCodeRepo'
  ];
  
  if (!validAssetTypes.includes(assetType)) {
    throw new NodeOperationError(
      this.getNode(),
      `Asset type '${assetType}' is not supported for the toggleMonitoring operation!`,
    );
  }

  // Validate asset ID
  const assetIdNum = parseInt(assetId, 10);
  if (isNaN(assetIdNum)) {
    throw new NodeOperationError(
      this.getNode(),
      `Invalid asset ID: '${assetId}'. Asset ID must be a number.`,
    );
  }

  const body = {
    asset_id: assetIdNum,
    asset_type: assetType,
    is_monitor_on: monitor,
  };

  const options: AxiosRequestConfig = {
    method: 'POST',
    url: endpoint,
    headers,
    data: body,
  };

  try {
    const response = await axios(options);
    return {
      json: response.data,
      pairedItem: { item: i },
    };
  } catch (error) {
    throw new NodeOperationError(
      this.getNode(),
      `Error toggling monitoring for asset: ${error.message}`,
      { itemIndex: i },
    );
  }
}