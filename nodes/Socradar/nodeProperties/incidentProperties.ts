import { INodeProperties } from 'n8n-workflow';

export const incidentProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['incident'],
      },
    },
    options: [
      {
        name: 'Get All',
        value: 'getAll',
        description: 'Get all incidents',
        action: 'Get all incidents',
      },
      {
        name: 'Get',
        value: 'get',
        description: 'Get a single incident',
        action: 'Get a single incident',
      },
      {
        name: 'Add Comment',
        value: 'addComment',
        description: 'Add a comment to an incident',
        action: 'Add a comment to an incident',
      },
      {
        name: 'Add Tag',
        value: 'addTag',
        description: 'Add a tag to an incident',
        action: 'Add a tag to an incident',
      },
      {
        name: 'Remove Tag',
        value: 'removeTag',
        description: 'Remove a tag from an incident',
        action: 'Remove a tag from an incident',
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
        resource: ['incident'],
      },
    },
    default: '',
    description: 'The ID of the company',
  },
  {
    displayName: 'Incident ID',
    name: 'incidentId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['incident'],
        operation: ['get', 'addComment', 'addTag', 'removeTag'],
      },
    },
    default: '',
    description: 'The ID of the incident to interact with (used as alarm_id in API calls)',
  },
  {
    displayName: 'Comment',
    name: 'comment',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['incident'],
        operation: ['addComment'],
      },
    },
    default: '',
    description: 'The comment text to add to the incident',
  },
  {
    displayName: 'User Email',
    name: 'userEmail',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['incident'],
        operation: ['addComment'],
      },
    },
    default: '',
    description: 'The email of the user adding the comment',
  },
  {
    displayName: 'Tag',
    name: 'tag',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['incident'],
        operation: ['addTag', 'removeTag'],
      },
    },
    default: '',
    description: 'The tag name to add or remove from the incident',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['incident'],
        operation: ['getAll'],
      },
    },
    options: [
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
        default: 20,
        description: 'Max number of results to return (max 100)',
      },
      {
        displayName: 'Status',
        name: 'status',
        type: 'options',
        options: [
          {
            name: 'Open',
            value: 'OPEN',
          },
          {
            name: 'Closed',
            value: 'CLOSED',
          },
          {
            name: 'On Hold',
            value: 'ON_HOLD',
          },
          {
            name: 'In Progress',
            value: 'IN_PROGRESS',
          },
        ],
        default: '',
        description: 'Filter incidents by status',
      },
      {
        displayName: 'Severities',
        name: 'severity',
        type: 'multiOptions',
        options: [
          {
            name: 'Low',
            value: 'LOW',
          },
          {
            name: 'Medium',
            value: 'MEDIUM',
          },
          {
            name: 'High',
            value: 'HIGH',
          },
          {
            name: 'Critical',
            value: 'CRITICAL',
          },
        ],
        default: [],
        description: 'Filter incidents by severity level(s)',
      },
      {
        displayName: 'Is Resolved',
        name: 'is_resolved',
        type: 'boolean',
        default: false,
        description: 'Whether to return only resolved incidents',
      },
      {
        displayName: 'Is False Positive',
        name: 'is_false_positive',
        type: 'boolean',
        default: false,
        description: 'Whether to return only false positive incidents',
      },
      {
        displayName: 'Start Date',
        name: 'start_date',
        type: 'dateTime',
        default: '',
        description: 'Start date for filtering incidents',
      },
      {
        displayName: 'End Date',
        name: 'end_date',
        type: 'dateTime',
        default: '',
        description: 'End date for filtering incidents',
      },
      {
        displayName: 'Incident Types',
        name: 'incident_types',
        type: 'multiOptions',
        options: [
          {
            name: 'Data Leak',
            value: 'DATA_LEAK',
          },
          {
            name: 'Phishing',
            value: 'PHISHING',
          },
          {
            name: 'Malware',
            value: 'MALWARE',
          },
          {
            name: 'Vulnerability',
            value: 'VULNERABILITY',
          },
        ],
        default: [],
        description: 'Filter incidents by type',
      },
      {
        displayName: 'Tags',
        name: 'tags',
        type: 'multiOptions',
        typeOptions: {
          loadOptionsMethod: 'getTags',
        },
        default: [],
        description: 'Filter incidents by tags',
      },
      {
        displayName: 'Sort By',
        name: 'sort_by',
        type: 'options',
        options: [
          {
            name: 'Created At',
            value: 'created_at',
          },
          {
            name: 'Updated At',
            value: 'updated_at',
          },
          {
            name: 'Severity',
            value: 'severity',
          },
        ],
        default: 'created_at',
        description: 'Field to sort results by',
      },
      {
        displayName: 'Sort Order',
        name: 'sort_order',
        type: 'options',
        options: [
          {
            name: 'Ascending',
            value: 'asc',
          },
          {
            name: 'Descending',
            value: 'desc',
          },
        ],
        default: 'desc',
        description: 'Sort order (ascending or descending)',
      },
    ],
  },
];
