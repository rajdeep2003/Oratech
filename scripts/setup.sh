#!/bin/bash

# Setup script for local development

echo "🚀 Setting up ORA project..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install mobile dependencies
echo "📦 Installing mobile dependencies..."
cd apps/mobile
npm install
cd ../..

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd apps/backend
npm install
cd ../..

# Install shared package dependencies
echo "📦 Installing shared package dependencies..."
cd packages/shared
npm install
cd ../..

# Create environment files if they don't exist
echo "⚙️  Setting up environment files..."

if [ ! -f "apps/backend/.env.local" ]; then
  cp apps/backend/.env.example apps/backend/.env.local
  echo "Created apps/backend/.env.local - please update with your values"
fi

if [ ! -f "apps/mobile/.env.local" ]; then
  echo "EXPO_PUBLIC_API_URL=http://localhost:3000/api" > apps/mobile/.env.local
  echo "Created apps/mobile/.env.local"
fi

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update apps/backend/.env.local with your environment variables"
echo "2. Run: npm run dev --workspaces"
echo ""
