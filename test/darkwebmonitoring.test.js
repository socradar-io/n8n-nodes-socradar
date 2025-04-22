/**
 * SOCRadar Dark Web Monitoring API Test Script
 * 
 * This script tests the Dark Web Monitoring API V2 functionality of the SOCRadar platform.
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
async function testBotnetData() {
  console.log('\n=== Testing Botnet Data API ===');
  try {
    const response = await makeRequest({
      method: 'GET',
      url: `${config.baseUrl}/company/${config.companyId}/dark-web-monitoring/botnet-data/v2`,
      headers,
      params: {
        recordStatus: 'OPEN',
        page: 1,
        limit: 5,
      },
    });
    console.log('✅ Botnet Data API test successful');
    console.log(`Retrieved ${response.data.length || 0} records`);
    return true;
  } catch (error) {
    console.error('❌ Botnet Data API test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    return false;
  }
}

async function testBlackmarketData() {
  console.log('\n=== Testing Blackmarket Data API ===');
  try {
    const response = await makeRequest({
      method: 'GET',
      url: `${config.baseUrl}/company/${config.companyId}/dark-web-monitoring/blackmarket/v2`,
      headers,
      params: {
        page: 1,
        limit: 5,
      },
    });
    console.log('✅ Blackmarket Data API test successful');
    console.log(`Retrieved ${response.data.length || 0} records`);
    return true;
  } catch (error) {
    console.error('❌ Blackmarket Data API test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    return false;
  }
}

async function testSuspiciousContent() {
  console.log('\n=== Testing Suspicious Content API ===');
  try {
    const response = await makeRequest({
      method: 'GET',
      url: `${config.baseUrl}/company/${config.companyId}/dark-web-monitoring/suspicious-content/v2`,
      headers,
      params: {
        limit: 5,
      },
    });
    console.log('✅ Suspicious Content API test successful');
    console.log(`Retrieved ${response.data.length || 0} records`);
    return true;
  } catch (error) {
    console.error('❌ Suspicious Content API test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    return false;
  }
}

async function testPiiExposure() {
  console.log('\n=== Testing PII Exposure API ===');
  try {
    const response = await makeRequest({
      method: 'GET',
      url: `${config.baseUrl}/company/${config.companyId}/dark-web-monitoring/pii-exposure/v2`,
      headers,
      params: {
        limit: 5,
      },
    });
    console.log('✅ PII Exposure API test successful');
    console.log(`Retrieved ${response.data.length || 0} records`);
    return true;
  } catch (error) {
    console.error('❌ PII Exposure API test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    return false;
  }
}

async function testImContent() {
  console.log('\n=== Testing IM Content API ===');
  try {
    const response = await makeRequest({
      method: 'GET',
      url: `${config.baseUrl}/company/${config.companyId}/dark-web-monitoring/im-content/v2`,
      headers,
      params: {
        limit: 5,
      },
    });
    console.log('✅ IM Content API test successful');
    console.log(`Retrieved ${response.data.length || 0} records`);
    return true;
  } catch (error) {
    console.error('❌ IM Content API test failed:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('🔍 Starting SOCRadar Dark Web Monitoring API V2 Tests...');
  console.log('API Key:', config.apiKey ? '✅ Set' : '❌ Not Set');
  console.log('Company ID:', config.companyId);
  
  let results = {
    botnetData: false,
    blackmarketData: false,
    suspiciousContent: false,
    piiExposure: false,
    imContent: false,
  };
  
  try {
    results.botnetData = await testBotnetData();
    results.blackmarketData = await testBlackmarketData();
    results.suspiciousContent = await testSuspiciousContent();
    results.piiExposure = await testPiiExposure();
    results.imContent = await testImContent();
    
    // Summary
    console.log('\n=== Test Summary ===');
    console.log('Botnet Data:', results.botnetData ? '✅ Passed' : '❌ Failed');
    console.log('Blackmarket Data:', results.blackmarketData ? '✅ Passed' : '❌ Failed');
    console.log('Suspicious Content:', results.suspiciousContent ? '✅ Passed' : '❌ Failed');
    console.log('PII Exposure:', results.piiExposure ? '✅ Passed' : '❌ Failed');
    console.log('IM Content:', results.imContent ? '✅ Passed' : '❌ Failed');
    
    const passedTests = Object.values(results).filter(Boolean).length;
    console.log(`\nOverall: ${passedTests} of 5 tests passed`);
    
    if (passedTests === 5) {
      console.log('🎉 All tests passed successfully!');
    } else {
      console.log('⚠️ Some tests failed. Please check the logs above for details.');
    }
  } catch (error) {
    console.error('Error running tests:', error);
  }
}

// Execute tests
runAllTests();
