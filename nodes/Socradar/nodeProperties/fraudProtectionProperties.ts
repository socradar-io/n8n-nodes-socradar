import { INodeProperties } from 'n8n-workflow';

export const fraudProtectionProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['fraudProtection'],
      },
    },
    options: [
      {
        name: 'Get Fraud Protection',
        value: 'getFraudProtection',
        description: 'Get fraud protection data',
        action: 'Get fraud protection data',
      },
    ],
    default: 'getFraudProtection',
  },
  {
    displayName: 'Company ID',
    name: 'companyId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['fraudProtection'],
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
        resource: ['fraudProtection'],
        operation: ['getFraudProtection'],
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
        displayName: 'CVV',
        name: 'cvv',
        type: 'string',
        default: '',
        description: 'Filter by CVV',
      },
      {
        displayName: 'Country Code',
        name: 'countryCode',
        type: 'string',
        default: '',
        description: 'Filter by country code',
      },
      {
        displayName: 'Expired',
        name: 'expired',
        type: 'boolean',
        default: false,
        description: 'Filter by expired status',
      },
      {
        displayName: 'Alarm ID',
        name: 'alarmId',
        type: 'number',
        default: 0,
        description: 'Filter by alarm ID',
      },
      {
        displayName: 'Notification ID',
        name: 'notificationId',
        type: 'number',
        default: 0,
        description: 'Filter by notification ID',
      },
      {
        displayName: 'Include History',
        name: 'includeHistory',
        type: 'boolean',
        default: false,
        description: 'Whether to include history',
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
