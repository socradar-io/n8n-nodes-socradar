const dotenv = require('dotenv');
const path = require('path');

// Load test environment variables
dotenv.config({ path: path.join(__dirname, '.env.test') });

// Common test configuration
const config = {
  apiKey: process.env.SOCRADAR_API_KEY,
  companyId: process.env.SOCRADAR_COMPANY_ID,
  baseUrl: process.env.API_BASE_URL || 'https://platform.socradar.com/api',
};

// Common headers for all requests
const headers = {
  'Content-Type': 'application/json',
  'X-API-KEY': config.apiKey,
};

// Test data
const testData = {
  incidentId: process.env.TEST_INCIDENT_ID,
  alarmId: process.env.TEST_ALARM_ID,
  analystEmail: process.env.TEST_ANALYST_EMAIL,
};

module.exports = {
  config,
  headers,
  testData,
};
