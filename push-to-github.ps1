# ============================================================
# ASHWANI® PORTFOLIO — PUSH TO GITHUB SCRIPT (PowerShell)
# Repository: https://github.com/ASHUTOSH-SHUKLAA/PortAshwani.git
# ============================================================

$ErrorActionPreference = "Continue"
Set-Location -Path $PSScriptRoot

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  ASHWANI® PORTFOLIO — PUSH TO GITHUB" -ForegroundColor Cyan
Write-Host "  Target: https://github.com/ASHUTOSH-SHUKLAA/PortAshwani.git" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check Git installation
Write-Host "[1/4] Checking Git installation..." -ForegroundColor Yellow
$gitCmd = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCmd) {
    Write-Host "ERROR: Git is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Please install Git from https://git-scm.com/downloads" -ForegroundColor Yellow
    exit 1
}

# 2. Remove the 107MB oversized file
Write-Host "[2/4] Purging oversized files exceeding GitHub 100MB limit..." -ForegroundColor Yellow
$oversized = "public\media\videos\vidssave.com 16 June 2026 720P.mp4"
if (Test-Path $oversized) {
    Remove-Item -Force $oversized
    Write-Host "      Removed: vidssave.com 16 June 2026 720P.mp4" -ForegroundColor Green
}

# 3. Clean Git Init to remove the previously rejected commit
Write-Host "[3/4] Resetting Git history to ensure clean push..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    git init
}
git branch -M main
git remote remove origin 2>$null
git remote add origin https://github.com/ASHUTOSH-SHUKLAA/PortAshwani.git
git update-ref -d HEAD 2>$null

# 4. Stage and commit
Write-Host "[4/4] Staging changes and committing..." -ForegroundColor Yellow
git add .
git commit -m "feat: complete ASHWANI® portfolio - mobile responsive and Vercel ready"

# 5. Push to GitHub
Write-Host "Pushing to GitHub (main branch)..." -ForegroundColor Yellow
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor Green
    Write-Host "  SUCCESS! PORTFOLIO SUCCESSFULLY PUSHED TO GITHUB!" -ForegroundColor Green
    Write-Host "  View online: https://github.com/ASHUTOSH-SHUKLAA/PortAshwani" -ForegroundColor Cyan
    Write-Host "  Vercel is now automatically deploying your live site!" -ForegroundColor Green
    Write-Host "==========================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "==========================================================" -ForegroundColor Red
    Write-Host "  [ERROR] Push failed. Check the error message above." -ForegroundColor Red
    Write-Host "==========================================================" -ForegroundColor Red
}
