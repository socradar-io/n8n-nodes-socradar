import { INodeProperties } from 'n8n-workflow';

export const digitalFootprintProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['digitalFootprint'],
      },
    },
    options: [
      {
        name: 'Get Digital Assets',
        value: 'getDigitalAssets',
        description: 'Get all digital assets',
        action: 'Get all digital assets',
      },
      {
        name: 'Add Asset',
        value: 'addAsset',
        description: 'Add a new digital asset',
        action: 'Add a new digital asset',
      },
      {
        name: 'Mark False Positive',
        value: 'markFalsePositive',
        description: 'Mark an asset as false positive',
        action: 'Mark an asset as false positive',
      },
      {
        name: 'Toggle Monitoring',
        value: 'toggleMonitoring',
        description: 'Toggle monitoring for an asset',
        action: 'Toggle monitoring for an asset',
      },
    ],
    default: 'getDigitalAssets',
  },
  {
    displayName: 'Company ID',
    name: 'companyId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['digitalFootprint'],
      },
    },
    default: '',
    description: 'The ID of the company',
  },
  {
    displayName: 'Asset Type',
    name: 'assetType',
    type: 'options',
    required: true,
    displayOptions: {
      show: {
        resource: ['digitalFootprint'],
        operation: ['addAsset', 'getDigitalAssets'],
      },
    },
    options: [
      { name: 'Domain', value: 'domain' },
      { name: 'IP Address', value: 'ipAddress' },
      { name: 'Website', value: 'website' },
      { name: 'Login Page', value: 'loginPage' },
      { name: 'DNS Record', value: 'dnsRecord' },
      { name: 'SSL Certificate', value: 'sslCertificate' },
      { name: 'IP Block', value: 'ipBlock' },
      { name: 'Mobile Application', value: 'mobileApplication' },
      { name: 'Technology', value: 'technology' },
      { name: 'Cloud Buckets', value: 'cloudBuckets' },
      { name: 'Social Accounts', value: 'socialAccounts' },
      { name: 'Source Code Repo', value: 'sourceCodeRepo' },
    ],
    default: 'domain',
    description: 'Type of the asset',
  },
  {
    displayName: 'Asset Name',
    name: 'assetName',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['digitalFootprint'],
        operation: ['addAsset'],
      },
    },
    default: '',
    description: 'Name of the asset to add',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['digitalFootprint'],
        operation: ['getDigitalAssets'],
      },
    },
    options: [

      {
        displayName: 'Page Number',
        name: 'pageNumber',
        type: 'number',
        default: 1,
        description: 'Page number for pagination',
      },
      {
        displayName: 'Page Limit',
        name: 'pageLimit',
        type: 'number',
        default: 20,
        description: 'Number of results per page',
      },
      {
        displayName: 'Sort By',
        name: 'sortBy',
        type: 'string',
        default: '',
        description: 'Field to sort by',
      },
      {
        displayName: 'Sort Descending',
        name: 'sortDesc',
        type: 'boolean',
        default: false,
        description: 'Whether to sort in descending order',
      },
    ],
  },
  {
    displayName: 'Asset ID',
    name: 'assetId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['digitalFootprint'],
        operation: ['markFalsePositive', 'toggleMonitoring'],
      },
    },
    default: '',
    description: 'ID of the asset to update',
  },
];
