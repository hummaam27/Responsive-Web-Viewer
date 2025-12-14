@echo off
echo Checking for Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install it from https://nodejs.org/
    pause
    exit /b
)

echo Installing dependencies...
if not exist node_modules (
    call npm install
)

echo Starting development server...
echo The app will open in your default browser...
call npm run dev