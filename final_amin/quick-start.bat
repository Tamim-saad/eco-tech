@echo off
echo ========================================
echo NodiWatch Final Prototype - Quick Start
echo ========================================
echo.

:menu
echo Choose an option:
echo.
echo [1] Install dependencies (npm install)
echo [2] Run development server (npm run dev)
echo [3] Build for production (npm run build)
echo [4] Preview production build (npx serve@latest out)
echo [5] Open deployment guide
echo [6] Exit
echo.

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto install
if "%choice%"=="2" goto dev
if "%choice%"=="3" goto build
if "%choice%"=="4" goto preview
if "%choice%"=="5" goto docs
if "%choice%"=="6" goto end

echo Invalid choice. Please try again.
echo.
goto menu

:install
echo.
echo Installing dependencies...
echo This may take a few minutes...
echo.
call npm install
echo.
echo Dependencies installed successfully!
echo.
pause
goto menu

:dev
echo.
echo Starting development server...
echo Visit http://localhost:3000 to see the app
echo Press Ctrl+C to stop the server
echo.
call npm run dev
pause
goto menu

:build
echo.
echo Building for production...
echo This creates an optimized static export in the 'out' folder
echo.
call npm run build
echo.
echo Build complete! Check the 'out' folder.
echo You can now:
echo - Drag the 'out' folder to netlify.com/drop
echo - Upload to any static hosting
echo - Run option 4 to preview locally
echo.
pause
goto menu

:preview
echo.
echo Starting production preview server...
echo This serves the built 'out' folder
echo Visit http://localhost:3000 to see the production version
echo Press Ctrl+C to stop the server
echo.
call npx serve@latest out
pause
goto menu

:docs
echo.
echo Opening DEPLOYMENT.md...
echo.
start DEPLOYMENT.md
echo.
echo If the file didn't open, check the nodiwatch-final folder
echo.
pause
goto menu

:end
echo.
echo Thank you for using NodiWatch!
echo For deployment help, see DEPLOYMENT.md
echo.
pause
