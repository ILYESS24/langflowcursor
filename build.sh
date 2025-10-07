#!/bin/bash
set -e

echo "🚀 Building ALL AI Application..."

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
pip install -r requirements.txt

# Build frontend
echo "⚛️ Building frontend..."
cd src/frontend
npm install
npm run build
cd ../..

echo "✅ Build completed successfully!"
