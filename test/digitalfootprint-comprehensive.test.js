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
 * 1. Set your API key and company ID in the configuration section
 * 2. Uncomment the tests you want to run
 * 3. Run with: node test-digitalfootprint-comprehensive.js
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  API_KEY: 'YOUR_API_KEY', // Replace with your actual API key
  COMPANY_ID: 'YOUR_COMPANY_ID', // Replace with your actual company ID
  BASE_URL: 'https://api.socradar.io/api/v1',
  LOG_DIRECTORY: './test-logs',
  LOG_RESPONSES: true, // Set to false to disable response logging
};

// Create log directory if it doesn't exist
if (CONFIG.LOG_RESPONSES) {
  if (!fs.existsSync(CONFIG.LOG_DIRECTORY)) {
    fs.mkdirSync(CONFIG.LOG_DIRECTORY, { recursive: true });
  }
}

// Headers
const headers = {
  'Api-Key': CONFIG.API_KEY,
  'Content-Type': 'application/json'
};

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
    
    const response = await axios({
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
    
    const response = await axios({
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
    
    const response = await axios({
      method: 'POST',
      url: `${CONFIG.BASE_URL}/company/${CONFIG.COMPANY_ID}/asm/add/domain`,
      headers,
      data
    });
    
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
    
    const response = await axios({
      method: 'POST',
      url: `${CONFIG.BASE_URL}/company/${CONFIG.COMPANY_ID}/asm/add/cloudBuckets`,
      headers,
      data
    });
    
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
      throw new Error('Asset ID is required for this test');
    }
    
    const data = {
      asset_id: assetId,
      asset_type: assetType,
      sub_type: subType,
      notes: `Marked as false positive during test at ${new Date().toISOString()}`
    };
    
    console.log(`Marking asset ${assetId} as false positive`);
    
    const response = await axios({
      method: 'POST',
      url: `${CONFIG.BASE_URL}/company/${CONFIG.COMPANY_ID}/asm/fp`,
      headers,
      data
    });
    
    console.log(`✅ ${testName} successful!`);
    console.log(`Asset ${assetId} marked as false positive`);
    
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
      throw new Error('Asset ID is required for this test');
    }
    
    const data = {
      asset_id: assetId,
      asset_type: assetType,
      sub_type: subType,
      is_monitor_on: isMonitorOn
    };
    
    console.log(`${isMonitorOn ? 'Enabling' : 'Disabling'} monitoring for asset ${assetId}`);
    
    const response = await axios({
      method: 'POST',
      url: `${CONFIG.BASE_URL}/company/${CONFIG.COMPANY_ID}/asm/monitor`,
      headers,
      data
    });
    
    console.log(`✅ ${testName} successful!`);
    console.log(`Monitoring ${isMonitorOn ? 'enabled' : 'disabled'} for asset ${assetId}`);
    
    logResponse(testName, response.data);
    return response.data;
  } catch (error) {
    handleError(testName, error);
    throw error;
  }
}

// Run tests
async function runTests() {
  try {
    console.log('=== Testing SOCRadar Digital Footprint API ===');
    console.log(`Company ID: ${CONFIG.COMPANY_ID}`);
    console.log(`API Base URL: ${CONFIG.BASE_URL}`);
    console.log('===========================================\n');
    
    // Test Get Digital Assets with different filters
    await testGetDigitalAssets({ assetType: 'domain', pageLimit: 5 });
    // await testGetDigitalAssets({ assetType: 'ipAddress', pageLimit: 5 });
    // await testGetDigitalAssets({ sortBy: 'assetName', sortDesc: false, pageLimit: 5 });
    
    // Test Get Cloud Buckets
    // await testGetCloudBuckets();
    
    // Test Add Domain
    // const domainName = 'test-domain-' + Date.now() + '.com';
    // await testAddDomain(domainName);
    
    // Test Add Cloud Bucket
    // await testAddCloudBucket();
    
    // To test Mark False Positive and Toggle Monitoring, you need an asset ID
    // First, get assets and extract an ID
    // const assets = await testGetDigitalAssets({ pageLimit: 1 });
    // if (assets?.assets?.length > 0) {
    //   const assetId = assets.assets[0].assetID;
    //   console.log(`Using asset ID: ${assetId} for further tests`);
    //   
    //   // Test Mark False Positive
    //   await testMarkFalsePositive(assetId);
    //   
    //   // Test Toggle Monitoring (enable)
    //   await testToggleMonitoring(assetId, true);
    //   
    //   // Test Toggle Monitoring (disable)
    //   await testToggleMonitoring(assetId, false);
    // }
    
    console.log('\n=== All tests completed ===');
  } catch (error) {
    console.error('\n❌ Test suite failed:', error.message);
  }
}

// Execute the tests
runTests();
