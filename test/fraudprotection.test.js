/**
 * Test script for SOCRadar DRP Fraud Protection API V2
 * 
 * This script tests the DRP Fraud Protection API V2 functionality
 * in the SOCRadar n8n integration.
 * 
 * Usage:
 * 1. Set environment variables:
 *    - SOCRADAR_API_KEY: Your SOCRadar API key
 *    - SOCRADAR_COMPANY_ID: Your company ID
 * 2. Run: node test-fraudprotection.js
 * 
 * Example:
 * SOCRADAR_API_KEY=your_api_key SOCRADAR_COMPANY_ID=your_company_id node test-fraudprotection.js
 */

const axios = require('axios');

// Try to load environment variables from .env file if it exists
try {
  require('dotenv').config();
} catch (error) {
  console.log('No .env file found, using environment variables directly');
}

// Configuration
const API_KEY = process.env.SOCRADAR_API_KEY;
const COMPANY_ID = process.env.SOCRADAR_COMPANY_ID;
const BASE_URL = 'https://platform.socradar.com/api';

// Check if required environment variables are set
if (!API_KEY || !COMPANY_ID) {
  console.error('❌ Error: Required environment variables are not set.');
  console.error('Please set SOCRADAR_API_KEY and SOCRADAR_COMPANY_ID environment variables.');
  console.error('Example: SOCRADAR_API_KEY=your_api_key SOCRADAR_COMPANY_ID=your_company_id node test-fraudprotection.js');
  process.exit(1);
}

// Headers
const headers = {
  'Api-Key': API_KEY,
  'Content-Type': 'application/json',
};

/**
 * Test the Fraud Protection API
 */
async function testFraudProtection() {
  console.log('🔍 Testing DRP Fraud Protection API V2...');
  
  try {
    // Test with basic parameters
    console.log('\n📊 Testing basic fraud protection data retrieval...');
    const basicResponse = await axios({
      method: 'GET',
      url: `${BASE_URL}/company/${COMPANY_ID}/fraud-protection/v2`,
      headers,
      params: {
        limit: 5,
      },
    });
    
    console.log(`✅ Success! Retrieved ${basicResponse.data.count} fraud protection records`);
    console.log('Sample data:');
    if (basicResponse.data.results && basicResponse.data.results.length > 0) {
      const sample = basicResponse.data.results[0];
      console.log(JSON.stringify(sample, null, 2));
    } else {
      console.log('No fraud protection records found');
    }
    
    // Test with filtering
    console.log('\n📊 Testing filtered fraud protection data retrieval...');
    const filteredResponse = await axios({
      method: 'GET',
      url: `${BASE_URL}/company/${COMPANY_ID}/fraud-protection/v2`,
      headers,
      params: {
        recordStatus: 'OPEN',
        limit: 5,
        orderDir: 'desc',
      },
    });
    
    console.log(`✅ Success! Retrieved ${filteredResponse.data.count} filtered fraud protection records`);
    
    // Test with date range
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };
    
    console.log('\n📊 Testing date-ranged fraud protection data retrieval...');
    const dateRangedResponse = await axios({
      method: 'GET',
      url: `${BASE_URL}/company/${COMPANY_ID}/fraud-protection/v2`,
      headers,
      params: {
        startDate: formatDate(threeMonthsAgo),
        endDate: formatDate(today),
        limit: 5,
      },
    });
    
    console.log(`✅ Success! Retrieved ${dateRangedResponse.data.count} date-ranged fraud protection records`);
    
    console.log('\n🎉 All DRP Fraud Protection API V2 tests completed successfully!');
  } catch (error) {
    console.error('❌ Error testing DRP Fraud Protection API V2:');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error('Response data:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

// Run the tests
(async () => {
  console.log('🚀 Starting SOCRadar DRP Fraud Protection API V2 tests...');
  await testFraudProtection();
})();
