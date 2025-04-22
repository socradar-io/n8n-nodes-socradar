/**
 * Test script for SOCRadar Brand Protection API V2
 * 
 * This script tests the Brand Protection API V2 functionality
 * in the SOCRadar n8n integration.
 * 
 * Usage:
 * 1. Set environment variables:
 *    - SOCRADAR_API_KEY: Your SOCRadar API key
 *    - SOCRADAR_COMPANY_ID: Your company ID
 * 2. Run: node test-brandprotection.js
 * 
 * Example:
 * SOCRADAR_API_KEY=your_api_key SOCRADAR_COMPANY_ID=your_company_id node test-brandprotection.js
 */

const https = require('https');
const { config, headers, testData } = require('./testUtils');

// Configuration
const API_KEY = config.apiKey;
const COMPANY_ID = config.companyId;
const BASE_URL = config.baseUrl;

// Check if required environment variables are set
if (!API_KEY || !COMPANY_ID) {
  console.error('❌ Error: Required environment variables are not set.');
  console.error('Please set SOCRADAR_API_KEY and SOCRADAR_COMPANY_ID environment variables.');
  console.error('Example: SOCRADAR_API_KEY=your_api_key SOCRADAR_COMPANY_ID=your_company_id node test-brandprotection.js');
  process.exit(1);
}

/**
 * Test the Brand Protection API endpoints
 */
async function testBrandProtection() {
  console.log('🔍 Testing Brand Protection API V2...');
  
  const endpoints = [
    {
      name: 'Impersonating Accounts',
      url: `${BASE_URL}/company/${COMPANY_ID}/brand-protection/impersonating-accounts/v2`
    },
    {
      name: 'Impersonating Domains',
      url: `${BASE_URL}/company/${COMPANY_ID}/brand-protection/impersonating-domains/v2`
    },
    {
      name: 'Rogue Mobile Applications',
      url: `${BASE_URL}/company/${COMPANY_ID}/brand-protection/rogue-mobile-applications/v2`
    },
    {
      name: 'Bad Reputation',
      url: `${BASE_URL}/company/${COMPANY_ID}/brand-protection/bad-reputation/v2`
    },
    {
      name: 'Social Media Findings',
      url: `${BASE_URL}/company/${COMPANY_ID}/brand-protection/social-media-findings/v2`
    }
  ];
  
  try {
    for (const endpoint of endpoints) {
      // Test with basic parameters
      console.log(`\n📊 Testing ${endpoint.name} data retrieval...`);
      try {
        const response = await makeRequest({
          method: 'GET',
          url: endpoint.url,
          headers,
          params: {
            limit: 5,
          },
        });
        
        console.log(`✅ Success! Retrieved ${response.data.count || 0} ${endpoint.name} records`);
        console.log('Sample data:');
        if (response.data.results && response.data.results.length > 0) {
          const sample = response.data.results[0];
          console.log(JSON.stringify(sample, null, 2));
        } else {
          console.log('No records found');
        }
      } catch (error) {
        console.error(`❌ Error testing ${endpoint.name}:`);
        if (error.response) {
          console.error(`Status: ${error.response.status}`);
          console.error('Response data:', error.response.data);
        } else {
          console.error(error.message);
        }
      }
    }
    
    // Test with filtering on one endpoint
    console.log('\n📊 Testing filtered Impersonating Domains data retrieval...');
    try {
      const filteredResponse = await makeRequest({
        method: 'GET',
        url: `${BASE_URL}/company/${COMPANY_ID}/brand-protection/impersonating-domains/v2`,
        headers,
        params: {
          recordStatus: 'OPEN',
          limit: 5,
          orderDir: 'desc',
        },
      });
      
      console.log(`✅ Success! Retrieved ${filteredResponse.data.count || 0} filtered Impersonating Domains records`);
    } catch (error) {
      console.error('❌ Error testing filtered Impersonating Domains:');
      if (error.response) {
        console.error(`Status: ${error.response.status}`);
        console.error('Response data:', error.response.data);
      } else {
        console.error(error.message);
      }
    }
    
    // Test with date range on one endpoint
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };
    
    console.log('\n📊 Testing date-ranged Social Media Findings data retrieval...');
    try {
      const dateRangedResponse = await makeRequest({
        method: 'GET',
        url: `${BASE_URL}/company/${COMPANY_ID}/brand-protection/social-media-findings/v2`,
        headers,
        params: {
          startDate: formatDate(threeMonthsAgo),
          endDate: formatDate(today),
          limit: 5,
        },
      });
      
      console.log(`✅ Success! Retrieved ${dateRangedResponse.data.count || 0} date-ranged Social Media Findings records`);
    } catch (error) {
      console.error('❌ Error testing date-ranged Social Media Findings:');
      if (error.response) {
        console.error(`Status: ${error.response.status}`);
        console.error('Response data:', error.response.data);
      } else {
        console.error(error.message);
      }
    }
    
    console.log('\n🎉 All Brand Protection API V2 tests completed!');
  } catch (error) {
    console.error('❌ Error testing Brand Protection API V2:');
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error('Response data:', error.response.data);
    } else {
      console.error(error.message);
    }
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

// Run the tests
(async () => {
  console.log('🚀 Starting SOCRadar Brand Protection API V2 tests...');
  await testBrandProtection();
})();
