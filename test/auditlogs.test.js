const axios = require('axios');

// Configuration
const API_KEY = 'your-api-key'; // Replace with your actual API key
const COMPANY_ID = 'your-company-id'; // Replace with your actual company ID
const BASE_URL = 'https://platform.socradar.com/api';

// Test User Audit Logs API
async function testUserAuditLogs() {
  try {
    console.log('Testing User Audit Logs API...');
    
    // Set up request parameters
    const endpoint = `${BASE_URL}/company/${COMPANY_ID}/auditlogs`;
    const params = {
      limit: 10,
      // Optionally add date filters
      // start_date: '2024-01-01',
      // end_date: '2024-12-31',
    };
    
    const config = {
      headers: {
        'Api-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      params,
    };
    
    // Make the request
    const response = await axios.get(endpoint, config);
    
    // Log the response
    console.log('User Audit Logs API Response:');
    console.log('Status:', response.status);
    console.log('Success:', response.data.success);
    console.log('Number of logs:', response.data.data ? response.data.data.length : 0);
    
    // Log a sample of the logs if available
    if (response.data.data && response.data.data.length > 0) {
      console.log('Sample log entry:');
      console.log(JSON.stringify(response.data.data[0], null, 2));
    }
    
    console.log('User Audit Logs API test completed successfully!');
  } catch (error) {
    console.error('Error testing User Audit Logs API:');
    console.error('Status:', error.response?.status);
    console.error('Message:', error.message);
    console.error('Response data:', error.response?.data);
  }
}

// Run the test
testUserAuditLogs();
