import { INodeProperties } from 'n8n-workflow';

export const darkWebMonitoringProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['darkWebMonitoring'],
      },
    },
    options: [
      {
        name: 'Get Botnet Data',
        value: 'getBotnetData',
        description: 'Get botnet data',
        action: 'Get botnet data',
      },
      {
        name: 'Get Blackmarket Data',
        value: 'getBlackmarket',
        description: 'Get blackmarket data',
        action: 'Get blackmarket data',
      },
      {
        name: 'Get Suspicious Content',
        value: 'getSuspiciousContent',
        description: 'Get suspicious content',
        action: 'Get suspicious content',
      },
      {
        name: 'Get PII Exposure',
        value: 'getPiiExposure',
        description: 'Get PII exposure data',
        action: 'Get PII exposure data',
      },
      {
        name: 'Get IM Content',
        value: 'getImContent',
        description: 'Get IM content',
        action: 'Get IM content',
      },
    ],
    default: 'getBotnetData',
  },
  {
    displayName: 'Company ID',
    name: 'companyId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['darkWebMonitoring'],
      },
    },
    default: '',
    description: 'The ID of the company',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['darkWebMonitoring'],
      },
    },
    options: [
      {
        displayName: 'From Date',
        name: 'fromDate',
        type: 'dateTime',
        default: '',
        description: 'Start date for filtering data',
      },
      {
        displayName: 'To Date',
        name: 'toDate',
        type: 'dateTime',
        default: '',
        description: 'End date for filtering data',
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
        displayName: 'Search Term',
        name: 'searchTerm',
        type: 'string',
        default: '',
        description: 'Search term to filter results',
      },
    ],
  },
];
