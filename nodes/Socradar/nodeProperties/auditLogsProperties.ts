import { INodeProperties } from 'n8n-workflow';

export const auditLogsProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['auditLogs'],
      },
    },
    options: [
      {
        name: 'Get All',
        value: 'getAll',
        description: 'Get all user audit logs',
        action: 'Get all user audit logs',
      },
    ],
    default: 'getAll',
  },
  {
    displayName: 'Company ID',
    name: 'companyId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['auditLogs'],
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
        resource: ['auditLogs'],
        operation: ['getAll'],
      },
    },
    options: [
      {
        displayName: 'From Date',
        name: 'fromDate',
        type: 'dateTime',
        default: '',
        description: 'Start date for filtering audit logs',
      },
      {
        displayName: 'To Date',
        name: 'toDate',
        type: 'dateTime',
        default: '',
        description: 'End date for filtering audit logs',
      },
      {
        displayName: 'User',
        name: 'user',
        type: 'string',
        default: '',
        description: 'Filter by user',
      },
      {
        displayName: 'Action Type',
        name: 'actionType',
        type: 'string',
        default: '',
        description: 'Filter by action type',
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
    ],
  },
];
