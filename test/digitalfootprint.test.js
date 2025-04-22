/**
 * SOCRadar Digital Footprint API Test Script
 * 
 * This script tests the Digital Footprint API functionality of the SOCRadar platform.
 * It performs the following operations:
 * - Fetches digital assets
 * - Retrieves cloud buckets
 * - Adds a domain (commented out by default)
 * - Marks assets as false positive (commented out by default)
 * - Toggles monitoring for assets (commented out by default)
 * 
 * Usage:
 * 1. Make sure your API key and company ID are set in the .env.test file
 * 2. Run with: npm test -- digitalfootprint.test.js
 * 
 * Note: Some operations modify data in your SOCRadar account. Uncomment only the tests you want to run.
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

// Test functions
async function testGetDigitalAssets() {
  try {
    const response = await makeRequest({
      method: 'GET',
      url: `${config.baseUrl}/company/${config.companyId}/asm`,
      headers,
      params: {
        assetType: 'domain',
        pageNumber: 0,
        pageLimit: 10
      }
    });
    
    console.log('✅ Get Digital Assets Response:');
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Error getting digital assets:', error.response?.data || error.message);
    throw error;
  }
}

async function testGetCloudBuckets() {
  try {
    const response = await makeRequest({
      method: 'GET',
      url: `${config.baseUrl}/company/${config.companyId}/asm/get/cloudBuckets`,
      headers
    });
    
    console.log('✅ Get Cloud Buckets Response:');
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Error getting cloud buckets:', error.response?.data || error.message);
    throw error;
  }
}

async function testAddDomain() {
  try {
    const response = await makeRequest({
      method: 'POST',
      url: `${config.baseUrl}/company/${config.companyId}/asm/add/domain`,
      headers,
      body: {
        domain: 'test-domain.com',
        asset_name: 'Test Domain',
        domain_type: 'MAINDOMAIN',
        source: 'manual'
      }
    });
    
    console.log('✅ Add Domain Response:');
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Error adding domain:', error.response?.data || error.message);
    throw error;
  }
}

async function testMarkFalsePositive() {
  try {
    // Replace with an actual asset ID from your environment
    const assetId = 12345;
    
    const response = await makeRequest({
      method: 'POST',
      url: `${config.baseUrl}/company/${config.companyId}/asm/fp`,
      headers,
      body: {
        asset_id: assetId,
        asset_type: 'domain',
        sub_type: 'networkApp',
        notes: 'Test false positive marking'
      }
    });
    
    console.log('✅ Mark False Positive Response:');
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Error marking as false positive:', error.response?.data || error.message);
    throw error;
  }
}

async function testToggleMonitoring() {
  try {
    // Replace with an actual asset ID from your environment
    const assetId = 12345;
    
    const response = await makeRequest({
      method: 'POST',
      url: `${config.baseUrl}/company/${config.companyId}/asm/monitor`,
      headers,
      body: {
        asset_id: assetId,
        asset_type: 'domain',
        sub_type: 'networkApp',
        is_monitor_on: true
      }
    });
    
    console.log('✅ Toggle Monitoring Response:');
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('❌ Error toggling monitoring:', error.response?.data || error.message);
    throw error;
  }
}

// Run tests
async function runTests() {
  try {
    console.log('🚀 Testing SOCRadar Digital Footprint API');
    console.log('API Key:', config.apiKey ? '✅ Set' : '❌ Not Set');
    console.log('Company ID:', config.companyId);
    
    // Uncomment the tests you want to run
    await testGetDigitalAssets();
    // await testGetCloudBuckets();
    // await testAddDomain();
    // await testMarkFalsePositive();
    // await testToggleMonitoring();
    
    console.log('✅ All tests completed');
  } catch (error) {
    console.error('❌ Test suite failed:', error);
  }
}

runTests();
