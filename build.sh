#!/bin/bash

# Build and package the n8n-nodes-socradar module
# This script automates the build process for the SOCRadar n8n integration

echo "🚀 Building SOCRadar n8n Integration v1.8.5"

# Check for dependencies
if ! command -v pnpm &> /dev/null; then
    echo "❌ PNPM is required but not installed. Please install it first."
    echo "   npm install -g pnpm"
    exit 1
fi

# Clean previous build and test artifacts
echo "🧹 Cleaning previous build..."
pnpm run clean

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build the package first
echo "🔨 Building package..."
pnpm run build

# Run linting
echo "🔍 Running linting checks..."
pnpm run lint || {
    echo "❌ Linting failed. Please fix the linting errors before building."
    exit 1
}

# Run final verification
echo "✨ Running final verification..."
if [ -d "dist" ]; then
    echo "✅ Build artifacts verified successfully"
else
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📦 Package is ready for distribution"
echo "📝 Next steps:"
echo "   1. Review build artifacts in dist/"
echo "   2. Run 'pnpm publish' to publish to npm"