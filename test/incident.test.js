/**
 * Integration tests for SOCRadar Incident API v4
 * 
 * This test suite verifies the interaction with SOCRadar Incident API v4
 * endpoints based on the API documentation.
 * 
 * Usage: 
 * 1. Set your API key and company ID in .env.test
 * 2. Run with Jest: npm test incident.test.js
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
        if (Array.isArray(value)) {
          value.forEach(v => queryParams.append(key, v));
        } else if (value !== undefined && value !== null) {
          queryParams.append(key, value);
        }
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
 * Get all incidents with optional filters
 */
async function getAllIncidents(params = {}) {
  const endpoint = `${config.baseUrl}/company/${config.companyId}/incidents/v4`;
  
  try {
    const response = await makeRequest({
      method: 'GET',
      url: endpoint,
      headers,
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
        start_date: params.startDate,
        end_date: params.endDate,
        status: params.status,
        tags: params.tags,
        severities: params.severities,
        // Add other filters as needed
      }
    });
    
    console.log('Get All Incidents Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error getting all incidents:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get a specific incident by ID
 */
async function getIncident(incidentId) {
  const endpoint = `${config.baseUrl}/company/${config.companyId}/incidents/v4`;
  
  try {
    const response = await makeRequest({
      method: 'GET',
      url: endpoint,
      headers,
      params: {
        notification_ids: [incidentId]
      }
    });
    
    console.log('Get Incident Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error getting incident:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Add a comment to an incident
 */
async function addComment(alarmId, comment) {
  const endpoint = `${config.baseUrl}/company/${config.companyId}/alarm/add/comment/v2`;
  
  try {
    const response = await makeRequest({
      method: 'POST',
      url: endpoint,
      headers,
      body: {
        alarm_id: alarmId,
        comment: comment
      }
    });
    
    console.log('Add Comment Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Add a tag to an incident
 */
async function addTag(alarmId, tag) {
  const endpoint = `${config.baseUrl}/company/${config.companyId}/alarm/tag`;
  
  try {
    const response = await makeRequest({
      method: 'POST',
      url: endpoint,
      headers,
      body: {
        alarm_id: alarmId,
        tag: tag,
        action: 'add'
      }
    });
    
    console.log('Add Tag Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error adding tag:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Remove a tag from an incident
 */
async function removeTag(alarmId, tag) {
  const endpoint = `${config.baseUrl}/company/${config.companyId}/alarm/tag`;
  
  try {
    const response = await makeRequest({
      method: 'POST',
      url: endpoint,
      headers,
      body: {
        alarm_id: alarmId,
        tag: tag,
        action: 'remove'
      }
    });
    
    console.log('Remove Tag Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error removing tag:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Change incident severity
 */
async function changeSeverity(alarmId, severity) {
  const endpoint = `${config.baseUrl}/company/${config.companyId}/alarm/severity`;
  
  if (!['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].includes(severity)) {
    throw new Error('Invalid severity. Must be one of: LOW, MEDIUM, HIGH, CRITICAL');
  }
  
  try {
    const response = await makeRequest({
      method: 'POST',
      url: endpoint,
      headers,
      body: {
        alarm_id: alarmId,
        severity: severity
      }
    });
    
    console.log('Change Severity Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error changing severity:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Change incident assignee
 */
async function changeAssignee(alarmId, userEmail) {
  const endpoint = `${config.baseUrl}/company/${config.companyId}/alarm/${alarmId}/assignee`;
  
  try {
    const response = await makeRequest({
      method: 'POST',
      url: endpoint,
      headers,
      body: {
        user_emails: userEmail
      }
    });
    
    console.log('Change Assignee Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error changing assignee:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get assignee options
 */
async function getAssigneeOptions() {
  const endpoint = `${config.baseUrl}/company/${config.companyId}/alarm/assignee_options`;
  
  try {
    const response = await makeRequest({
      method: 'GET',
      url: endpoint,
      headers
    });
    
    console.log('Get Assignee Options Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error getting assignee options:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Ask for analyst assistance
 */
async function askAnalyst(alarmId, message) {
  const endpoint = `${config.baseUrl}/company/${config.companyId}/incidents/ask/analyst/v2`;
  
  try {
    const response = await makeRequest({
      method: 'POST',
      url: endpoint,
      headers,
      body: {
        alarm_id: alarmId,
        comment: message
      }
    });
    
    console.log('Ask Analyst Response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error asking analyst:', error.response?.data || error.message);
    throw error;
  }
}

// Example usage
async function runTests() {
  try {
    // Replace these with actual values for testing
    const testAlarmId = 12345;
    const testIncidentId = 67890;
    
    console.log('=== Testing SOCRadar Incident API v4 ===');
    
    // Get all incidents
    console.log('\n1. Getting all incidents...');
    await getAllIncidents({
      limit: 5,
      status: 'OPEN'
    });
    
    // Get a specific incident
    console.log('\n2. Getting a specific incident...');
    await getIncident(testIncidentId);
    
    // Add a comment
    console.log('\n3. Adding a comment...');
    await addComment(testAlarmId, 'Test comment from API');
    
    // Add a tag
    console.log('\n4. Adding a tag...');
    await addTag(testAlarmId, 'test-tag');
    
    // Remove a tag
    console.log('\n5. Removing a tag...');
    await removeTag(testAlarmId, 'test-tag');
    
    // Change severity
    console.log('\n6. Changing severity...');
    await changeSeverity(testAlarmId, 'MEDIUM');
    
    // Get assignee options
    console.log('\n7. Getting assignee options...');
    await getAssigneeOptions();
    
    // Change assignee
    console.log('\n8. Changing assignee...');
    await changeAssignee(testAlarmId, 'test@example.com');
    
    // Ask analyst
    console.log('\n9. Asking for analyst assistance...');
    await askAnalyst(testAlarmId, 'Please help with this incident');
    
    console.log('\n=== All tests completed ===');
  } catch (error) {
    console.error('Test execution failed:', error);
  }
}

// Uncomment to run the tests
// runTests();

// Export functions for individual testing
module.exports = {
  getAllIncidents,
  getIncident,
  addComment,
  addTag,
  removeTag,
  changeSeverity,
  changeAssignee,
  getAssigneeOptions,
  askAnalyst,
  runTests
};
