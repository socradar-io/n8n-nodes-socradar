import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

import {
	handleIncidentOperations,
	handleTakedownOperations,
	handleDigitalFootprintOperations,
	handleDarkWebMonitoringOperations,
	handleAuditLogsOperations,
	handleFraudProtectionOperations,
	handleBrandProtectionOperations,
} from './utils';
import { nodeProperties } from './nodeProperties/index';

export class Socradar implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SOCRadar',
		name: 'socradar',
		icon: 'file:socradar.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Comprehensive SOCRadar API integration',
		defaults: {
			name: 'SOCRadar',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'socradarApi',
				required: true,
			},
		],
		properties: nodeProperties,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const length = items.length;
		const credentials = await this.getCredentials('socradarApi');
		const baseUrl = credentials.baseUrl as string;
		const apiKey = credentials.apiKey as string;
		
		const headers = {
			'Api-Key': apiKey,
			'Content-Type': 'application/json',
		};

		for (let i = 0; i < length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;

				if (resource === 'incident') {
					const result = await handleIncidentOperations.call(this, baseUrl, headers, i);
					returnData.push(result);
				}
				// Handle Takedown resource
				else if (resource === 'takedown') {
					try {
						const result = await handleTakedownOperations.call(this, baseUrl, headers, i);
						returnData.push(result);
					} catch (error) {
						if (this.continueOnFail()) {
							returnData.push({
								json: {
									error: error.message,
									details: error.response?.data || 'No additional error details',
								},
								pairedItem: { item: i },
							});
							continue;
						}
						throw error;
					}
				}
				// Handle User Audit Logs resource
				else if (resource === 'auditLogs') {
					try {
						const result = await handleAuditLogsOperations.call(this, baseUrl, headers, i);
						returnData.push(result);
					} catch (error) {
						if (this.continueOnFail()) {
							returnData.push({
								json: {
									error: error.message,
									details: error.response?.data || 'No additional error details',
								},
								pairedItem: { item: i },
							});
							continue;
						}
						throw error;
					}
				}
				// Handle Digital Footprint resource
				else if (resource === 'digitalFootprint') {
					try {
						const result = await handleDigitalFootprintOperations.call(this, baseUrl, headers, i);
						returnData.push(result);
					} catch (error) {
						if (this.continueOnFail()) {
							returnData.push({
								json: {
									error: error.message,
									details: error.response?.data || 'No additional error details',
								},
								pairedItem: { item: i },
							});
							continue;
						}
						throw error;
					}
				}
				// Handle Dark Web Monitoring API V2 resource
				else if (resource === 'darkWebMonitoring') {
					try {
						const result = await handleDarkWebMonitoringOperations.call(
							this,
							baseUrl,
							headers,
							i,
						);
						returnData.push(result);
					} catch (error) {
						if (this.continueOnFail()) {
							returnData.push({
								json: {
									error: error.message,
									details: error.response?.data || 'No additional error details',
								},
								pairedItem: { item: i },
							});
							continue;
						}
						throw error;
					}
				}
				// Handle DRP Fraud Protection API V2 resource
				else if (resource === 'fraudProtection') {
					try {
						const result = await handleFraudProtectionOperations.call(
							this,
							baseUrl,
							headers,
							i,
						);
						returnData.push(result);
					} catch (error) {
						if (this.continueOnFail()) {
							returnData.push({
								json: {
									error: error.message,
									details: error.response?.data || 'No additional error details',
								},
								pairedItem: { item: i },
							});
							continue;
						}
						throw error;
					}
				}
				// Handle Brand Protection API V2 resource
				else if (resource === 'brandProtection') {
					try {
						const result = await handleBrandProtectionOperations.call(
							this,
							baseUrl,
							headers,
							i,
						);
						returnData.push(result);
					} catch (error) {
						if (this.continueOnFail()) {
							returnData.push({
								json: {
									error: error.message,
									details: error.response?.data || 'No additional error details',
								},
								pairedItem: { item: i },
							});
							continue;
						}
						throw error;
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
