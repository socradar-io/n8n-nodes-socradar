# SOCRadar n8n Integration - Installation Guide

This guide provides step-by-step instructions for installing and configuring the SOCRadar n8n integration.

## Prerequisites

Before installing the SOCRadar n8n integration, ensure you have:

1. n8n v1.0.0 or later installed
2. A SOCRadar account with API access
3. Your SOCRadar API key (found in the SOCRadar platform under Settings → API Options)
4. Your SOCRadar Company ID

## Installation Methods

### Method 1: Install via npm (Recommended)

If you're running n8n as a global npm package:

```bash
npm install -g @socradar/n8n-nodes-socradar
```

If you're running n8n using PM2:

```bash
cd ~/.n8n
npm install @socradar/n8n-nodes-socradar
pm2 restart n8n
```

### Method 2: Install via n8n Community Nodes

1. Open your n8n instance
2. Go to Settings → Community Nodes
3. Click "Install a community node"
4. Enter `@socradar/n8n-nodes-socradar`
5. Click "Install"
6. Restart n8n when prompted

### Method 3: Manual Installation

If you're running n8n in a custom environment:

1. Download the latest release from GitHub:
   ```bash
   wget https://github.com/socradar/n8n-nodes-socradar/releases/latest/download/socradar-n8n-nodes-socradar.tgz
   ```

2. Install the package:
   ```bash
   npm install -g ./socradar-n8n-nodes-socradar.tgz
   ```

3. Restart n8n:
   ```bash
   # If running as a service
   sudo systemctl restart n8n
   
   # If running with PM2
   pm2 restart n8n
   
   # If running directly
   # Stop the current process and start again
   ```

## Configuration

After installation, you need to configure the SOCRadar credentials in n8n:

1. Open your n8n instance
2. Go to Settings → Credentials
3. Click "New Credential"
4. Select "SOCRadar API" from the list
5. Enter your SOCRadar API key
6. Click "Save"

## Verification

To verify that the installation was successful:

1. Create a new workflow in n8n
2. Search for "SOCRadar" in the nodes panel
3. Add the SOCRadar node to your workflow
4. Configure the node with your previously created credentials
5. Select a resource and operation (e.g., Digital Footprint → Get Digital Assets)
6. Enter your Company ID
7. Execute the node to test the connection

If the node executes successfully and returns data, the installation is complete.

## Updating

To update to the latest version:

```bash
npm update -g @socradar/n8n-nodes-socradar
```

Then restart n8n to apply the update.

## Troubleshooting

If you encounter issues during installation:

1. Check that your n8n version is compatible (v1.0.0 or later)
2. Ensure you have the necessary permissions to install global npm packages
3. Verify that your API key is correct
4. Check the n8n logs for any error messages
5. Refer to the [Troubleshooting Guide](./troubleshooting.md) for more detailed help

## Next Steps

After successful installation:

1. Explore the [Digital Footprint API documentation](./digital-footprint.md)
2. Try the example workflows in the `examples` directory
3. Create your own workflows using the SOCRadar node

For more information, visit the [SOCRadar website](https://socradar.io) or contact support@socradar.io.
