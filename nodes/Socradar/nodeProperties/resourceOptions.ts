import { INodeProperties } from 'n8n-workflow';

export const resourceOptions: INodeProperties = {
  displayName: 'Resource',
  name: 'resource',
  type: 'options',
  noDataExpression: true,
  options: [
    {
      name: 'Incident',
      value: 'incident',
    },
    {
      name: 'Takedown',
      value: 'takedown',
    },
    {
      name: 'User Audit Logs',
      value: 'auditLogs',
    },
    {
      name: 'Digital Footprint',
      value: 'digitalFootprint',
    },
    {
      name: 'Dark Web Monitoring',
      value: 'darkWebMonitoring',
    },
    {
      name: 'DRP Fraud Protection',
      value: 'fraudProtection',
    },
    {
      name: 'Brand Protection',
      value: 'brandProtection',
    },
  ],
  default: 'incident',
};
