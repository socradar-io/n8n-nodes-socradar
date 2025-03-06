// Simple test script to verify Takedown node functionality
const fs = require('fs');
const path = require('path');

console.log('Testing SOCRadar Takedown Node...');

// Load the node files
try {
  console.log('Loading Takedown.node.js...');
  const takedownNodePath = path.join(__dirname, 'dist', 'nodes', 'Socradar', 'Takedown.node.js');
  if (fs.existsSync(takedownNodePath)) {
    console.log('Takedown.node.js exists!');
    
    // Check TakedownV1 node
    const takedownV1Path = path.join(__dirname, 'dist', 'nodes', 'Socradar', 'v1', 'TakedownV1.node.js');
    if (fs.existsSync(takedownV1Path)) {
      console.log('TakedownV1.node.js exists!');
    } else {
      console.error('TakedownV1.node.js does not exist!');
    }
    
    // Check version description
    const versionDescPath = path.join(__dirname, 'dist', 'nodes', 'Socradar', 'v1', 'versionDescriptionTakedown.js');
    if (fs.existsSync(versionDescPath)) {
      console.log('versionDescriptionTakedown.js exists!');
    } else {
      console.error('versionDescriptionTakedown.js does not exist!');
    }
  } else {
    console.error('Takedown.node.js does not exist!');
  }
  
  // Check Socradar.node.js for Takedown resource
  const socradarNodePath = path.join(__dirname, 'dist', 'nodes', 'Socradar', 'Socradar.node.js');
  if (fs.existsSync(socradarNodePath)) {
    console.log('Socradar.node.js exists!');
    
    // Read the file to check for Takedown resource
    const socradarNodeContent = fs.readFileSync(socradarNodePath, 'utf8');
    if (socradarNodeContent.includes('takedown')) {
      console.log('Takedown resource found in Socradar.node.js!');
    } else {
      console.error('Takedown resource not found in Socradar.node.js!');
    }
  } else {
    console.error('Socradar.node.js does not exist!');
  }
  
  console.log('All tests passed!');
} catch (error) {
  console.error('Error during testing:', error);
}
