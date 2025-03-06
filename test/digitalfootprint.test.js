// Test script for SOCRadar Digital Footprint API
const axios = require('axios');

// Configuration
const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key
const COMPANY_ID = 'YOUR_COMPANY_ID'; // Replace with your actual company ID
const BASE_URL = 'https://api.socradar.io/api/v1';

// Headers
const headers = {
  'Api-Key': API_KEY,
  'Content-Type': 'application/json'
};

// Test functions
async function testGetDigitalAssets() {
  try {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/company/${COMPANY_ID}/asm`,
      headers,
      params: {
        assetType: 'domain',
        pageNumber: 0,
        pageLimit: 10
      }
    });
    
    console.log('Get Digital Assets Response:');
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error getting digital assets:', error.response?.data || error.message);
    throw error;
  }
}

async function testGetCloudBuckets() {
  try {
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/company/${COMPANY_ID}/asm/get/cloudBuckets`,
      headers
    });
    
    console.log('Get Cloud Buckets Response:');
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error getting cloud buckets:', error.response?.data || error.message);
    throw error;
  }
}

async function testAddDomain() {
  try {
    const response = await axios({
      method: 'POST',
      url: `${BASE_URL}/company/${COMPANY_ID}/asm/add/domain`,
      headers,
      data: {
        domain: 'test-domain.com',
        asset_name: 'Test Domain',
        domain_type: 'MAINDOMAIN',
        source: 'manual'
      }
    });
    
    console.log('Add Domain Response:');
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error adding domain:', error.response?.data || error.message);
    throw error;
  }
}

async function testMarkFalsePositive() {
  try {
    // Replace with an actual asset ID from your environment
    const assetId = 12345;
    
    const response = await axios({
      method: 'POST',
      url: `${BASE_URL}/company/${COMPANY_ID}/asm/fp`,
      headers,
      data: {
        asset_id: assetId,
        asset_type: 'domain',
        sub_type: 'networkApp',
        notes: 'Test false positive marking'
      }
    });
    
    console.log('Mark False Positive Response:');
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error marking as false positive:', error.response?.data || error.message);
    throw error;
  }
}

async function testToggleMonitoring() {
  try {
    // Replace with an actual asset ID from your environment
    const assetId = 12345;
    
    const response = await axios({
      method: 'POST',
      url: `${BASE_URL}/company/${COMPANY_ID}/asm/monitor`,
      headers,
      data: {
        asset_id: assetId,
        asset_type: 'domain',
        sub_type: 'networkApp',
        is_monitor_on: true
      }
    });
    
    console.log('Toggle Monitoring Response:');
    console.log(JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error toggling monitoring:', error.response?.data || error.message);
    throw error;
  }
}

// Run tests
async function runTests() {
  try {
    console.log('=== Testing SOCRadar Digital Footprint API ===');
    
    // Uncomment the tests you want to run
    await testGetDigitalAssets();
    // await testGetCloudBuckets();
    // await testAddDomain();
    // await testMarkFalsePositive();
    // await testToggleMonitoring();
    
    console.log('=== All tests completed ===');
  } catch (error) {
    console.error('Test suite failed:', error);
  }
}

runTests();
