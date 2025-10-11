#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🚀 Starting optimized build for Vercel...");

try {
  // Check if node_modules exists
  if (!fs.existsSync("node_modules")) {
    console.log("📦 Installing dependencies...");
    execSync("npm install --legacy-peer-deps", { stdio: "inherit" });
  }

  // Build the project
  console.log("🔨 Building project...");
  execSync("npm run build", { stdio: "inherit" });

  // Verify build output
  const buildDir = path.join(__dirname, "build");
  if (fs.existsSync(buildDir)) {
    console.log("✅ Build completed successfully!");
    console.log(`📁 Build output: ${buildDir}`);
  } else {
    throw new Error("Build directory not found");
  }
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}
