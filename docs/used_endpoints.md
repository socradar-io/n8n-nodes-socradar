# SOCRadar API Endpoints Documentation

This document provides a comprehensive list of all SOCRadar API endpoints used in the n8n integration, organized by resource and operation.

## 🚨 Incident Resource Endpoints

| Handler Function | Endpoint | HTTP Method |
|------------------|----------|------------|
| `handleGetAllIncidents` | `${baseUrl}/company/${companyId}/incidents/v4` | GET |
| `handleGetIncident` | `${baseUrl}/company/${companyId}/incidents/v4` | GET |
| `handleAddComment` | `${baseUrl}/company/${companyId}/alarm/add/comment/v2` | POST |
| `handleAddTag` | `${baseUrl}/company/${companyId}/alarm/tag` | POST |
| `handleRemoveTag` | `${baseUrl}/company/${companyId}/alarm/tag` | DELETE |

## 🛡️ Takedown Resource Endpoints

| Handler Function | Endpoint | HTTP Method |
|------------------|----------|------------|
| `handleCreateDomainTakedown` | `${baseUrl}/add/company/${companyId}/takedown/request` | POST |
| `handleCreateSocialMediaTakedown` | `${baseUrl}/add/company/${companyId}/takedown/request/social_media_risks` | POST |
| `handleCreateSourceCodeTakedown` | `${baseUrl}/add/company/${companyId}/takedown/request/source_code_leaks` | POST |
| `handleGetTakedownProgress` | `${baseUrl}/get/company/${companyId}/takedown/progress` | GET |

## 📊 Audit Logs Resource Endpoints

| Handler Function | Endpoint | HTTP Method |
|------------------|----------|------------|
| `handleGetAllAuditLogs` | `${baseUrl}/company/${companyId}/auditlogs` | GET |

## 🔍 Brand Protection Resource Endpoints

| Handler Function | Endpoint | HTTP Method |
|------------------|----------|------------|
| `handleGetAllBrandProtection` | `${baseUrl}/company/${companyId}/brand-protection` | GET |
| `handleGetBrandProtectionDetails` | `${baseUrl}/company/${companyId}/brand-protection/${recordId}` | GET |
| `handleGetBrandProtection` | `${baseUrl}/company/${companyId}/brand-protection/impersonating-accounts/v2` | GET |
| `handleGetBrandProtection` | `${baseUrl}/company/${companyId}/brand-protection/impersonating-domains/v2` | GET |
| `handleGetBrandProtection` | `${baseUrl}/company/${companyId}/brand-protection/rogue-mobile-applications/v2` | GET |
| `handleGetBrandProtection` | `${baseUrl}/company/${companyId}/brand-protection/bad-reputation/v2` | GET |
| `handleGetBrandProtection` | `${baseUrl}/company/${companyId}/brand-protection/social-media-findings/v2` | GET |

## 🕸️ Dark Web Monitoring Resource Endpoints

| Handler Function | Endpoint | HTTP Method |
|------------------|----------|------------|
| `handleGetBotnetData` | `${baseUrl}/company/${companyId}/dark-web-monitoring/botnet-data/v2` | GET |
| `handleGetBlackmarket` | `${baseUrl}/company/${companyId}/dark-web-monitoring/blackmarket/v2` | GET |
| `handleGetSuspiciousContent` | `${baseUrl}/company/${companyId}/dark-web-monitoring/suspicious-content/v2` | GET |
| `handleGetPiiExposure` | `${baseUrl}/company/${companyId}/dark-web-monitoring/pii-exposure/v2` | GET |
| `handleGetImContent` | `${baseUrl}/company/${companyId}/dark-web-monitoring/im-content/v2` | GET |

## 👣 Digital Footprint Resource Endpoints

| Handler Function | Endpoint | HTTP Method |
|------------------|----------|------------|
| `handleGetDigitalAssets` | `${baseUrl}/company/${companyId}/asm` | GET |
| `handleAddAsset` | `${baseUrl}/company/${companyId}/asm/add/{asset_type}` | POST |
| `handleMarkFalsePositive` | `${baseUrl}/company/${companyId}/asm/fp` | POST |
| `handleToggleMonitoring` | `${baseUrl}/company/${companyId}/asm/monitor` | POST |

## 💳 Fraud Protection Resource Endpoints

| Handler Function | Endpoint | HTTP Method |
|------------------|----------|------------|
| `handleGetFraudProtection` | `${baseUrl}/company/${companyId}/fraud-protection/v2` | GET |

---

## API Path Variables

| Variable | Description |
|----------|-------------|
| `baseUrl` | The base URL of the SOCRadar API, retrieved from credentials |
| `companyId` | The ID of the company in SOCRadar platform |
| `recordId` | The ID of a specific record (varies by resource) |
| `asset_type` | The type of asset (e.g., domain, cloudBuckets, ipAddress, website, etc.) |

## Authentication

All endpoints require the following headers:
- `Api-Key`: Retrieved from n8n credentials
- `Content-Type`: `application/json`