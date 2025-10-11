#!/usr/bin/env node
/**
 * Script de build optimisé pour Vercel
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// console.log("🚀 Starting Vercel build for Langflow 2.0...");

try {
  // Vérifier que nous sommes dans le bon répertoire
  const packageJsonPath = path.join(__dirname, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(
      "package.json not found. Make sure you are in the frontend directory.",
    );
  }

  // Installer les dépendances avec legacy-peer-deps
  // console.log("📦 Installing dependencies...");
  execSync("npm install --legacy-peer-deps", { stdio: "inherit" });

  // Build de l'application
  // console.log("🔨 Building application...");
  execSync("npm run build", { stdio: "inherit" });

  // Vérifier que le build a réussi
  const buildDir = path.join(__dirname, "build");
  if (!fs.existsSync(buildDir)) {
    throw new Error("Build directory not found. Build may have failed.");
  }

  // console.log("✅ Build completed successfully!");
  // console.log(`📁 Build output: ${buildDir}`);
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}
