/**
 * Comprehensive Test Script for SOCRadar Digital Footprint API
 * 
 * This script tests all operations of the Digital Footprint API:
 * - Get Digital Assets (with various filters)
 * - Get Cloud Buckets
 * - Add Domain
 * - Add Cloud Bucket
 * - Mark False Positive
 * - Toggle Monitoring
 * 
 * Usage:
 * 1. Make sure your API key and company ID are set in the .env.test file
 * 2. Uncomment the tests you want to run
 * 3. Run with: npm test -- digitalfootprint-comprehensive.test.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { config, headers, testData } = require('./testUtils');

// Configuration
const CONFIG = {
  API_KEY: config.apiKey,
  COMPANY_ID: config.companyId,
  BASE_URL: config.baseUrl,
  LOG_DIRECTORY: './test-logs',
  LOG_RESPONSES: true, // Set to false to disable response logging
};

// Create log directory if it doesn't exist
if (CONFIG.LOG_RESPONSES) {
  if (!fs.existsSync(CONFIG.LOG_DIRECTORY)) {
    fs.mkdirSync(CONFIG.LOG_DIRECTORY, { recursive: true });
  }
}

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

// Utility functions
const logResponse = (testName, data) => {
  if (!CONFIG.LOG_RESPONSES) return;
  
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const logFile = path.join(CONFIG.LOG_DIRECTORY, `${testName}_${timestamp}.json`);
  
  fs.writeFileSync(logFile, JSON.stringify(data, null, 2));
  console.log(`Response logged to ${logFile}`);
};

const handleError = (testName, error) => {
  console.error(`❌ Error in ${testName}:`, error.response?.data || error.message);
  
  if (error.response && CONFIG.LOG_RESPONSES) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const logFile = path.join(CONFIG.LOG_DIRECTORY, `${testName}_ERROR_${timestamp}.json`);
    
    fs.writeFileSync(logFile, JSON.stringify({
      status: error.response.status,
      statusText: error.response.statusText,
      data: error.response.data
    }, null, 2));
    
    console.log(`Error logged to ${logFile}`);
  }
};

// Test functions
async function testGetDigitalAssets(options = {}) {
  const testName = 'getDigitalAssets';
  try {
    console.log(`\n🔍 Testing ${testName}...`);
    
    const params = {
      assetType: options.assetType || 'domain',
      pageNumber: options.pageNumber || 0,
      pageLimit: options.pageLimit || 10,
      sortBy: options.sortBy,
      sortDesc: options.sortDesc
    };
    
    // Filter out undefined values
    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);
    
    console.log(`Parameters:`, params);
    
    const response = await makeRequest({
      method: 'GET',
      url: `${CONFIG.BASE_URL}/company/${CONFIG.COMPANY_ID}/asm`,
      headers,
      params
    });
    
    console.log(`✅ ${testName} successful!`);
    console.log(`Found ${response.data?.assets?.length || 0} assets`);
    
    if (response.data?.assets?.length > 0) {
      console.log(`First asset: ${response.data.assets[0].assetName} (${response.data.assets[0].assetType})`);
    }
    
    logResponse(testName, response.data);
    return response.data;
  } catch (error) {
    handleError(testName, error);
    throw error;
  }
}

async function testGetCloudBuckets() {
  const testName = 'getCloudBuckets';
  try {
    console.log(`\n🔍 Testing ${testName}...`);
    
    const response = await makeRequest({
      method: 'GET',
      url: `${CONFIG.BASE_URL}/company/${CONFIG.COMPANY_ID}/asm/get/cloudBuckets`,
      headers
    });
    
    console.log(`✅ ${testName} successful!`);
    console.log(`Found ${response.data?.buckets?.length || 0} cloud buckets`);
    
    if (response.data?.buckets?.length > 0) {
      console.log(`First bucket: ${response.data.buckets[0].name} (${response.data.buckets[0].platform})`);
    }
    
    logResponse(testName, response.data);
    return response.data;
  } catch (error) {
    handleError(testName, error);
    throw error;
  }
}

async function testAddDomain(domainName = 'test-domain-' + Date.now() + '.com') {
  const testName = 'addDomain';
  try {
    console.log(`\n🔍 Testing ${testName}...`);
    
    const data = {
      domain: domainName,
      asset_name: `Test Domain ${Date.now()}`,
      domain_type: 'MAINDOMAIN',
      source: 'manual'
    };
    
    console.log(`Adding domain: ${data.domain}`);
    
    const response = await makeRequest({
      method: 'POST',
      url: `${CONFIG.BASE_URL}/company/${CONFIG.COMPANY_ID}/asm/add/domain`,
      headers
    }, data);
    
    console.log(`✅ ${testName} successful!`);
    console.log(`Domain added: ${data.domain}`);
    
    logResponse(testName, response.data);
    return response.data;
  } catch (error) {
    handleError(testName, error);
    throw error;
  }
}

async function testAddCloudBucket() {
  const testName = 'addCloudBucket';
  try {
    console.log(`\n🔍 Testing ${testName}...`);
    
    const timestamp = Date.now();
    const data = {
      asset_name: `https://test-bucket-${timestamp}.storage.googleapis.com/`,
      cloud_platform_name: 'Google Cloud Storage',
      access_state: 'private',
      service_name: 'gcp.storage'
    };
    
    console.log(`Adding cloud bucket: ${data.asset_name}`);
    
    const response = await makeRequest({
      method: 'POST',
      url: `${CONFIG.BASE_URL}/company/${CONFIG.COMPANY_ID}/asm/add/cloudBuckets`,
      headers
    }, data);
    
    console.log(`✅ ${testName} successful!`);
    console.log(`Cloud bucket added: ${data.asset_name}`);
    
    logResponse(testName, response.data);
    return response.data;
  } catch (error) {
    handleError(testName, error);
    throw error;
  }
}

async function testMarkFalsePositive(assetId, assetType = 'domain', subType = 'networkApp') {
  const testName = 'markFalsePositive';
  try {
    console.log(`\n🔍 Testing ${testName}...`);
    
    if (!assetId) {
      console.log(`⚠️ Skipping ${testName} - No assetId provided`);
      return null;
    }
    
    console.log(`Marking asset ${assetId} as false positive`);
    
    const data = {
      asset_id: assetId,
      asset_type: assetType,
      sub_type: subType,
      notes: `Test false positive mark ${Date.now()}`
    };
    
    const response = await makeRequest({
      method: 'POST',
      url: `${CONFIG.BASE_URL}/company/${CONFIG.COMPANY_ID}/asm/mark/falsePositive`,
      headers
    }, data);
    
    console.log(`✅ ${testName} successful!`);
    
    logResponse(testName, response.data);
    return response.data;
  } catch (error) {
    handleError(testName, error);
    throw error;
  }
}

async function testToggleMonitoring(assetId, isMonitorOn = true, assetType = 'domain', subType = 'networkApp') {
  const testName = 'toggleMonitoring';
  try {
    console.log(`\n🔍 Testing ${testName}...`);
    
    if (!assetId) {
      console.log(`⚠️ Skipping ${testName} - No assetId provided`);
      return null;
    }
    
    console.log(`Setting monitoring for asset ${assetId} to ${isMonitorOn ? 'ON' : 'OFF'}`);
    
    const data = {
      asset_id: assetId,
      asset_type: assetType,
      sub_type: subType,
      is_monitor_on: isMonitorOn
    };
    
    const response = await makeRequest({
      method: 'POST',
      url: `${CONFIG.BASE_URL}/company/${CONFIG.COMPANY_ID}/asm/set/monitor`,
      headers
    }, data);
    
    console.log(`✅ ${testName} successful!`);
    
    logResponse(testName, response.data);
    return response.data;
  } catch (error) {
    handleError(testName, error);
    throw error;
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting SOCRadar Digital Footprint API Tests...');
  console.log('API Key:', CONFIG.API_KEY ? '✅ Set' : '❌ Not Set');
  console.log('Company ID:', CONFIG.COMPANY_ID);
  
  try {
    // Test getting digital assets with different filters
    await testGetDigitalAssets({ assetType: 'domain' });
    // await testGetDigitalAssets({ assetType: 'ip' });
    // await testGetDigitalAssets({ assetType: 'domain', sortBy: 'created_at', sortDesc: true });
    
    // Test getting cloud buckets
    // await testGetCloudBuckets();
    
    // Test adding a domain
    // Note: This will add a test domain to your account
    // const addDomainResult = await testAddDomain();
    
    // Test adding a cloud bucket
    // Note: This will add a test cloud bucket to your account
    // const addCloudBucketResult = await testAddCloudBucket();
    
    // Test marking an asset as false positive
    // Note: You need to provide a valid assetId from your account
    // const assetIdToMarkFalsePositive = '...'; // Replace with a valid asset ID
    // await testMarkFalsePositive(assetIdToMarkFalsePositive);
    
    // Test toggling monitoring for an asset
    // Note: You need to provide a valid assetId from your account
    // const assetIdToToggleMonitoring = '...'; // Replace with a valid asset ID
    // await testToggleMonitoring(assetIdToToggleMonitoring, true); // Turn monitoring ON
    // await testToggleMonitoring(assetIdToToggleMonitoring, false); // Turn monitoring OFF
    
    console.log('\n✅ All tests completed successfully!');
  } catch (error) {
    console.error('\n❌ Tests failed:', error.message);
  }
}

// Execute the tests
runTests();
