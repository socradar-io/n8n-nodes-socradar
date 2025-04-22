/**
 * SOCRadar Fraud Protection API Test Script
 * 
 * This script tests the Fraud Protection API V2 functionality of the SOCRadar platform.
 * It performs the following operations:
 * - Fetches fraud protection data with various filters
 * 
 * Usage:
 * 1. Make sure your API key and company ID are set in the .env.test file
 * 2. Run with: npm test -- fraudprotection.test.js
 * 
 * Note: This is a read-only test that doesn't modify any data in your SOCRadar account.
 */

const https = require('https');
const { config, headers, testData } = require('./testUtils');

// Configuration
const API_KEY = config.apiKey;
const COMPANY_ID = config.companyId;
const BASE_URL = config.baseUrl;

// Check if required environment variables are set
if (!API_KEY || !COMPANY_ID) {
  console.error('❌ Error: API_KEY and COMPANY_ID environment variables are required');
  console.error('Please set them in your .env.test file or environment variables');
  process.exit(1);
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

/**
 * Test the Fraud Protection API
 */
async function testFraudProtectionAPI() {
  console.log('🚀 Starting SOCRadar Fraud Protection API V2 tests...');
  console.log('API Key:', API_KEY ? '✅ Set' : '❌ Not Set');
  console.log('Company ID:', COMPANY_ID);
  
  // Test basic data retrieval
  console.log('\n📊 Testing Fraud Protection data retrieval...');
  try {
    const response = await makeRequest({
      method: 'GET',
      url: `${BASE_URL}/company/${COMPANY_ID}/fraud-protection/v2`,
      headers,
      params: {
        limit: 5
      }
    });
    
    console.log(`✅ Success! Found ${response.data.count} fraud protection records`);
    console.log('Sample data:');
    if (response.data.results && response.data.results.length > 0) {
      const sample = response.data.results[0];
      console.log(JSON.stringify(sample, null, 2));
    } else {
      console.log('No fraud protection records found');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Details:', error.response?.data || 'No additional details');
  }
  
  // Test with filtering
  console.log('\n📊 Testing Fraud Protection data with filters...');
  try {
    const response = await makeRequest({
      method: 'GET',
      url: `${BASE_URL}/company/${COMPANY_ID}/fraud-protection/v2`,
      headers,
      params: {
        recordStatus: 'OPEN',
        limit: 5,
        orderDir: 'desc',
      },
    });
    
    console.log(`✅ Success! Found ${response.data.count} open fraud protection records`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Details:', error.response?.data || 'No additional details');
  }
  
  // Test with date range
  const today = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(today.getMonth() - 3);
  
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  console.log('\n📊 Testing date-ranged Fraud Protection data retrieval...');
  try {
    const response = await makeRequest({
      method: 'GET',
      url: `${BASE_URL}/company/${COMPANY_ID}/fraud-protection/v2`,
      headers,
      params: {
        startDate: formatDate(threeMonthsAgo),
        endDate: formatDate(today),
        limit: 5,
      },
    });
    
    console.log(`✅ Success! Found ${response.data.count} date-ranged fraud protection records`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Details:', error.response?.data || 'No additional details');
  }
  
  console.log('\n✅ Fraud Protection API tests completed');
}

// Run the tests
testFraudProtectionAPI();
