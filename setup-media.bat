@echo off
title Setting Up Cinematic Portfolio Media Assets
cd /d "%~dp0"
echo ==========================================================
echo   CINEMATIC PORTFOLIO - ONE-CLICK MEDIA DEPLOYMENT
echo ==========================================================
echo.
echo Running media copy script...

where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using Node.js...
    node setup-media.js
) else (
    echo Using PowerShell...
    powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup-media.ps1"
)

echo.
echo ==========================================================
echo All media files are staged and ready!
echo Now run:
echo   pnpm dev
echo ==========================================================
echo.
pause
