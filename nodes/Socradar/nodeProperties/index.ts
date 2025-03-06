import { INodeProperties } from 'n8n-workflow';
import { resourceOptions } from './resourceOptions';
import { auditLogsProperties } from './auditLogsProperties';
import { brandProtectionProperties } from './brandProtectionProperties';
import { darkWebMonitoringProperties } from './darkWebMonitoringProperties';
import { digitalFootprintProperties } from './digitalFootprintProperties';
import { fraudProtectionProperties } from './fraudProtectionProperties';
import { incidentProperties } from './incidentProperties';
import { takedownProperties } from './takedownProperties';

export const nodeProperties: INodeProperties[] = [
  resourceOptions,
  ...auditLogsProperties,
  ...brandProtectionProperties,
  ...darkWebMonitoringProperties,
  ...digitalFootprintProperties,
  ...fraudProtectionProperties,
  ...incidentProperties,
  ...takedownProperties,
];
