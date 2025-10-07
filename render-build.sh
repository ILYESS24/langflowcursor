#!/bin/bash
# Script de build optimisé pour Render

echo "🚀 Starting Langflow 2.0 build process..."

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install -e .
pip install gunicorn uvicorn[standard]

# Install Node.js dependencies and build frontend
echo "📦 Installing Node.js dependencies..."
cd src/frontend
npm ci

echo "🔨 Building frontend..."
npm run build

echo "✅ Build completed successfully!"
