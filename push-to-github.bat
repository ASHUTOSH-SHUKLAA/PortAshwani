@echo off
title Push ASHWANI® Portfolio to GitHub
cd /d "%~dp0"

echo ==========================================================
echo   ASHWANI(R) PORTFOLIO - GITHUB DEPLOYMENT / PUSH
echo   Target: https://github.com/ASHUTOSH-SHUKLAA/PortAshwani.git
echo ==========================================================
echo.

:: 1. Check Git installation
echo [1/4] Checking Git installation...
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed or not in PATH!
    echo Please install Git from https://git-scm.com/downloads and try again.
    pause
    exit /b 1
)

:: 2. Remove the 107MB oversized file that blocked GitHub earlier
echo.
echo [2/4] Purging oversized files exceeding GitHub 100MB limit...
if exist "public\media\videos\vidssave.com 16 June 2026 720P.mp4" (
    del /f /q "public\media\videos\vidssave.com 16 June 2026 720P.mp4"
    echo Removed: vidssave.com 16 June 2026 720P.mp4
)
if exist "public\videos\showreel.mp4" (
    del /f /q "public\videos\showreel.mp4"
    echo Removed legacy showreel.mp4
)

:: 3. Reset Git HEAD to purge the rejected commit containing the 107MB file
echo.
echo [3/4] Resetting Git history to ensure clean push...
if not exist ".git" (
    git init
)
git branch -M main
git remote remove origin >nul 2>nul
git remote add origin https://github.com/ASHUTOSH-SHUKLAA/PortAshwani.git
git update-ref -d HEAD >nul 2>nul

:: 4. Stage and commit all clean files
echo.
echo [4/4] Staging files and creating fresh commit...
git add .
git commit -m "feat: compress video 11 under 100MB, full mobile responsiveness and opaque modals"

:: 5. Push to GitHub
echo.
echo Pushing to https://github.com/ASHUTOSH-SHUKLAA/PortAshwani.git...
git push -u origin main --force

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==========================================================
    echo   SUCCESS! PORTFOLIO SUCCESSFULLY PUSHED TO GITHUB!
    echo   View online: https://github.com/ASHUTOSH-SHUKLAA/PortAshwani
    echo   Vercel is now automatically deploying your live site!
    echo ==========================================================
) else (
    echo.
    echo ==========================================================
    echo   [ERROR] Push failed. Check the error message above.
    echo ==========================================================
)

echo.
pause
