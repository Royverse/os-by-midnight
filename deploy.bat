@echo off
echo ==========================================
echo   OS BY MIDNIGHT - DEPLOYMENT SEQUENCE
echo ==========================================
echo.
echo 1. Cleaning ^& Building for Production (Static Export)...
if exist .next rmdir /s /q .next
if exist out rmdir /s /q out
call npm run build
if %errorlevel% neq 0 (
    echo Build failed! Exiting.
    pause
    exit /b %errorlevel%
)

echo.
echo 2. Deploying to Netlify (midnight-os)...
call npx netlify-cli deploy --prod --site midnight-os --auth nfp_7S1JPxHuWEGXGtynymi1XTwD4Nmxmnem19a1 --dir out

echo.
echo ==========================================
echo   DEPLOYMENT COMPLETE!
echo ==========================================
pause
