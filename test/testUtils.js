const path = require('path');
const fs = require('fs');

// Load environment variables from .env.test file if it exists
function loadEnvFromFile() {
  const envPath = path.join(__dirname, '.env.test');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const envVars = envContent.split('\n');
    
    envVars.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, value] = trimmedLine.split('=');
        if (key && value) {
          process.env[key.trim()] = value.trim();
        }
      }
    });
  }
}

// Load environment variables
loadEnvFromFile();

// Helper function to get required environment variables
function getRequiredEnvVar(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required for tests`);
  }
  return value;
}

// Common test configuration
const config = {
  apiKey: getRequiredEnvVar('SOCRADAR_API_KEY'),
  companyId: getRequiredEnvVar('SOCRADAR_COMPANY_ID'),
  baseUrl: process.env.API_BASE_URL || 'https://platform.socradar.com/api',
};

// Common headers for all requests
const headers = {
  'Content-Type': 'application/json',
  'X-API-KEY': config.apiKey,
};

// Test data
const testData = {
  incidentId: getRequiredEnvVar('TEST_INCIDENT_ID'),
  alarmId: getRequiredEnvVar('TEST_ALARM_ID'),
  analystEmail: getRequiredEnvVar('TEST_ANALYST_EMAIL'),
};

module.exports = {
  config,
  headers,
  testData,
  getRequiredEnvVar,
};
