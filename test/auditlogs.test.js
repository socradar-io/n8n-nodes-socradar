/**
 * SOCRadar Audit Logs API Test Script
 * 
 * This script tests the Audit Logs API functionality of the SOCRadar platform.
 * It performs the following operations:
 * - Fetches user audit logs with various filters
 * 
 * Usage:
 * 1. Make sure your API key and company ID are set in the .env.test file
 * 2. Run with: npm test -- auditlogs.test.js
 * 
 * Note: This is a read-only test that doesn't modify any data in your SOCRadar account.
 */

const https = require('https');
const { config, headers, testData } = require('./testUtils');

// Helper function to make HTTP requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    // Parse the URL to extract hostname, path, etc.
    const url = new URL(options.url);
    
    // Prepare request options
    const requestOptions = {
      hostname: url.hostname,
      path: url.pathname + (url.search || ''),
      method: options.method,
      headers: options.headers,
    };
    
    // Add query parameters if provided
    if (options.params) {
      const queryParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        queryParams.append(key, value);
      });
      requestOptions.path += (url.search ? '&' : '?') + queryParams.toString();
    }
    
    const req = https.request(requestOptions, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({ data: parsedData, status: res.statusCode });
          } else {
            reject({
              response: {
                status: res.statusCode,
                statusText: res.statusMessage,
                data: parsedData
              },
              message: `Request failed with status code ${res.statusCode}`
            });
          }
        } catch (error) {
          reject({
            message: 'Error parsing response data',
            error,
            responseData
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject({
        message: 'Request error',
        error
      });
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Test User Audit Logs API
async function testUserAuditLogs() {
  try {
    console.log('🔍 Testing User Audit Logs API...');
    console.log('API Key:', config.apiKey ? '✅ Set' : '❌ Not Set');
    console.log('Company ID:', config.companyId);
    
    // Set up request parameters
    const params = {
      limit: 10,
      // Optionally add date filters
      // startDate: '2024-01-01',
      // endDate: '2024-12-31',
    };
    
    // Make the request
    const response = await makeRequest({
      method: 'GET',
      url: `${config.baseUrl}/company/${config.companyId}/auditLogs`,
      headers,
      params
    });
    
    // Log the response
    console.log('✅ User Audit Logs API Response:');
    console.log('Status:', response.status);
    console.log('Number of logs:', response.data?.records?.length || 0);
    
    // Log a sample of the logs if available
    if (response.data?.records?.length > 0) {
      console.log('Sample log entry:');
      console.log(JSON.stringify(response.data.records[0], null, 2));
    }
    
    console.log('✅ User Audit Logs API test completed successfully!');
  } catch (error) {
    console.error('❌ Error testing User Audit Logs API:');
    console.error('Status:', error.response?.status);
    console.error('Message:', error.message);
    console.error('Response data:', error.response?.data);
  }
}

// Run the test
testUserAuditLogs();
