import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class SocradarApi implements ICredentialType {
	name = 'socradarApi';
	displayName = 'SOCRadar API';
	documentationUrl = 'https://help.socradar.io/';
	// Icon is defined in the node itself
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'The API key for SOCRadar',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://platform.socradar.com/api',
			description: 'The base URL for the SOCRadar API',
		},
	];
}
