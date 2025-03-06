import { INodeProperties } from 'n8n-workflow';

export const takedownProperties: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ['takedown'],
      },
    },
    options: [
      {
        name: 'Create Domain Takedown',
        value: 'createDomain',
        description: 'Create a domain takedown request',
        action: 'Create a domain takedown request',
      },
      {
        name: 'Create Social Media Takedown',
        value: 'createSocialMedia',
        description: 'Create a social media takedown request',
        action: 'Create a social media takedown request',
      },
      {
        name: 'Create Source Code Leak Takedown',
        value: 'createSourceCode',
        description: 'Create a source code leak takedown request',
        action: 'Create a source code leak takedown request',
      },
      {
        name: 'Get Progress',
        value: 'getProgress',
        description: 'Get takedown request progress',
        action: 'Get takedown request progress',
      },
    ],
    default: 'createDomain',
  },
  {
    displayName: 'Company ID',
    name: 'companyId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['takedown'],
      },
    },
    default: '',
    description: 'The ID of the company',
  },
  // Domain Takedown Parameters
  {
    displayName: 'Domain',
    name: 'entity',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['takedown'],
        operation: ['createDomain'],
      },
    },
    default: '',
    description: 'The domain to create a takedown request for',
  },
  // Social Media Takedown Parameters
  {
    displayName: 'Social Media Platform',
    name: 'platform',
    type: 'options',
    required: true,
    displayOptions: {
      show: {
        resource: ['takedown'],
        operation: ['createSocialMedia'],
      },
    },
    options: [
      {
        name: 'Facebook',
        value: 'facebook',
      },
      {
        name: 'Instagram',
        value: 'instagram',
      },
      {
        name: 'Twitter',
        value: 'twitter',
      },
      {
        name: 'LinkedIn',
        value: 'linkedin',
      },
      {
        name: 'YouTube',
        value: 'youtube',
      },
      {
        name: 'TikTok',
        value: 'tiktok',
      },
      {
        name: 'Other',
        value: 'other',
      },
    ],
    default: 'facebook',
    description: 'The social media platform where the content is hosted',
  },
  {
    displayName: 'URL',
    name: 'entity',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['takedown'],
        operation: ['createSocialMedia'],
      },
    },
    default: '',
    description: 'The URL of the social media content to create a takedown request for',
  },
  // Source Code Leak Takedown Parameters
  {
    displayName: 'URL',
    name: 'entity',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['takedown'],
        operation: ['createSourceCode'],
      },
    },
    default: '',
    description: 'The URL where the source code leak is located',
  },
  // Common Takedown Parameters
  {
    displayName: 'Takedown Type',
    name: 'takedownType',
    type: 'options',
    required: true,
    displayOptions: {
      show: {
        resource: ['takedown'],
        operation: ['createDomain', 'createSocialMedia', 'createSourceCode'],
      },
    },
    options: [
      {
        name: 'Phishing',
        value: 'phishing',
      },
      {
        name: 'Malware',
        value: 'malware',
      },
      {
        name: 'Brand Infringement',
        value: 'brand_infringement',
      },
      {
        name: 'Data Leak',
        value: 'data_leak',
      },
    ],
    default: 'phishing',
    description: 'The type of takedown request',
  },
  {
    displayName: 'Priority',
    name: 'priority',
    type: 'options',
    required: true,
    displayOptions: {
      show: {
        resource: ['takedown'],
        operation: ['createDomain', 'createSocialMedia', 'createSourceCode'],
      },
    },
    options: [
      {
        name: 'Low',
        value: 'low',
      },
      {
        name: 'Medium',
        value: 'medium',
      },
      {
        name: 'High',
        value: 'high',
      },
      {
        name: 'Critical',
        value: 'critical',
      },
    ],
    default: 'medium',
    description: 'The priority of the takedown request',
  },
  {
    displayName: 'Takedown ID',
    name: 'takedownId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['takedown'],
        operation: ['getProgress'],
      },
    },
    default: '',
    description: 'The ID of the takedown request to get progress for',
  },
  {
    displayName: 'Additional Fields',
    name: 'additionalFields',
    type: 'collection',
    placeholder: 'Add Field',
    default: {},
    displayOptions: {
      show: {
        resource: ['takedown'],
        operation: ['createDomain', 'createSocialMedia', 'createSourceCode'],
      },
    },
    options: [
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        description: 'Additional details about the takedown request',
      },
      {
        displayName: 'Tags',
        name: 'tags',
        type: 'string',
        default: '',
        description: 'Comma-separated list of tags to associate with the takedown request',
      },
    ],
  },
];
