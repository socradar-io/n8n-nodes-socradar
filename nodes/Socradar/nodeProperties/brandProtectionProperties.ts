import { INodeProperties } from 'n8n-workflow';

export const brandProtectionProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['brandProtection'],
      },
    },
    options: [
      {
        name: 'Get Brand Protection',
        value: 'getBrandProtection',
        description: 'Get brand protection data by type',
        action: 'Get brand protection data by type',
      },
    ],
    default: 'getBrandProtection',
  },
  {
    displayName: 'Company ID',
    name: 'companyId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['brandProtection'],
      },
    },
    default: '',
    description: 'The ID of the company',
  },
  {
    displayName: 'Operation Type',
    name: 'operationType',
    type: 'options',
    required: true,
    displayOptions: {
      show: {
        resource: ['brandProtection'],
        operation: ['getBrandProtection'],
      },
    },
    options: [
      {
        name: 'Impersonating Accounts',
        value: 'impersonatingAccounts',
        description: 'Get impersonating accounts data',
      },
      {
        name: 'Impersonating Domains',
        value: 'impersonatingDomains',
        description: 'Get impersonating domains data',
      },
      {
        name: 'Rogue Mobile Applications',
        value: 'rogueMobileApplications',
        description: 'Get rogue mobile applications data',
      },
      {
        name: 'Bad Reputation',
        value: 'badReputation',
        description: 'Get bad reputation data',
      },
      {
        name: 'Social Media Findings',
        value: 'socialMediaFindings',
        description: 'Get social media findings data',
      },
    ],
    default: 'impersonatingAccounts',
    description: 'Type of brand protection data to retrieve',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['brandProtection'],
        operation: ['getAll', 'getBrandProtection'],
      },
    },
    options: [
      {
        displayName: 'Search String',
        name: 'searchString',
        type: 'string',
        default: '',
        description: 'Search string to filter results',
      },
      {
        displayName: 'Record Status',
        name: 'recordStatus',
        type: 'string',
        default: '',
        description: 'Filter by record status',
      },
      {
        displayName: 'Record Status Reason',
        name: 'recordStatusReason',
        type: 'string',
        default: '',
        description: 'Filter by record status reason',
      },
      {
        displayName: 'Alarm Status',
        name: 'alarmStatus',
        type: 'string',
        default: '',
        description: 'Filter by alarm status',
      },
      {
        displayName: 'Country Code',
        name: 'countryCode',
        type: 'string',
        default: '',
        description: 'Filter by country code',
      },
      {
        displayName: 'Include Historical',
        name: 'includeHistorical',
        type: 'boolean',
        default: false,
        description: 'Whether to include historical data',
      },
      {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'string',
        default: '',
        description: 'Start date for filtering',
      },
      {
        displayName: 'End Date',
        name: 'endDate',
        type: 'string',
        default: '',
        description: 'End date for filtering',
      },
      {
        displayName: 'Page',
        name: 'page',
        type: 'number',
        default: 1,
        description: 'Page number for pagination',
      },
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        default: 100,
        description: 'Number of results per page',
      },
      {
        displayName: 'Order Direction',
        name: 'orderDir',
        type: 'string',
        default: '',
        description: 'Direction to order results',
      },
    ],
  },
];
