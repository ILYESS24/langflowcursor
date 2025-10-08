#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting optimized build for Vercel...');

try {
  // Check if node_modules exists
  if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  }

  // Build the project
  console.log('🔨 Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  // Verify build output
  const buildDir = path.join(process.cwd(), 'build');
  if (fs.existsSync(buildDir)) {
    console.log('✅ Build completed successfully!');
    console.log(`📁 Build output: ${buildDir}`);
  } else {
    throw new Error('Build directory not found');
  }

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
