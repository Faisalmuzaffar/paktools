#!/bin/bash

# Pak Tools Deployment Setup Script
# Author: Faisal Muzaffar
echo "🚀 Setting up Pak Tools for Vercel deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Run type checking
echo "🔍 Running type checks..."
npm run typecheck

if [ $? -ne 0 ]; then
    echo "❌ TypeScript type checking failed"
    exit 1
fi

echo "✅ Type checking passed"

# Run linting
echo "🧹 Running linter..."
npm run lint

if [ $? -ne 0 ]; then
    echo "❌ Linting failed"
    exit 1
fi

echo "✅ Linting passed"

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Check if dist directory exists and has content
if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
    echo "❌ Build output directory (dist) is missing or empty"
    exit 1
fi

echo "✅ Build output verified"

# Display deployment instructions
echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps for Vercel deployment:"
echo "1. Push your code to a GitHub repository"
echo "2. Go to https://vercel.com/dashboard"
echo "3. Click 'New Project'"
echo "4. Import your GitHub repository"
echo "5. Vercel will automatically detect the settings from vercel.json"
echo "6. Click 'Deploy'"
echo ""
echo "🔧 Manual deployment with Vercel CLI:"
echo "1. Install Vercel CLI: npm install -g vercel"
echo "2. Run: vercel"
echo "3. Follow the prompts"
echo ""
echo "📊 Build size summary:"
du -sh dist/
echo ""
echo "🚨 Important reminders:"
echo "- All environment variables should be set in Vercel dashboard"
echo "- Check the DEPLOYMENT.md file for detailed instructions"
echo "- Monitor the deployment in Vercel dashboard"
echo ""
echo "✨ Your PakTools webapp is ready for deployment!"
