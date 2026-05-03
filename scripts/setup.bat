@echo off
REM Setup script for local development (Windows)

echo 🚀 Setting up ORA project...

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install

REM Install mobile dependencies
echo 📦 Installing mobile dependencies...
cd apps\mobile
call npm install
cd ..\..

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd apps\backend
call npm install
cd ..\..

REM Install shared package dependencies
echo 📦 Installing shared package dependencies...
cd packages\shared
call npm install
cd ..\..

REM Create environment files if they don't exist
echo ⚙️  Setting up environment files...

if not exist "apps\backend\.env.local" (
  copy apps\backend\.env.example apps\backend\.env.local
  echo Created apps\backend\.env.local - please update with your values
)

if not exist "apps\mobile\.env.local" (
  echo EXPO_PUBLIC_API_URL=http://localhost:3000/api > apps\mobile\.env.local
  echo Created apps\mobile\.env.local
)

echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Update apps\backend\.env.local with your environment variables
echo 2. Run: npm run dev --workspaces
echo.
