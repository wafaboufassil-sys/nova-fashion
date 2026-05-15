@echo off
title NOVA Fashion - Upload to GitHub
color 0A

echo ============================================
echo    N^OVA Fashion - GitHub Upload Script
echo ============================================
echo.

:: Check if git is installed
where git >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Git is not installed!
    echo.
    echo Please install Git first:
    echo 1. Download from: https://git-scm.com/download/win
    echo 2. Install it with default settings
    echo 3. Run this script again
    echo.
    pause
    exit /b
)

echo [OK] Git is installed
echo.

:: Step 1: Extract ZIP
echo [STEP 1] Please extract nova-fashion-project.zip to a folder first!
echo         Example: extract to D:\nova-fashion
echo.
set /p FOLDER_PATH="Enter the folder path where you extracted the files: "

if not exist "%FOLDER_PATH%\package.json" (
    color 0C
    echo [ERROR] Cannot find package.json in that folder!
    echo Make sure you extracted the ZIP correctly.
    pause
    exit /b
)

echo.
echo [OK] Found project files!
echo.

:: Step 2: Navigate to folder
cd /d "%FOLDER_PATH%"

:: Step 3: Initialize Git
echo [STEP 2] Initializing Git...
git init
git add -A
git commit -m "NOVA - Futuristic Fashion E-Commerce Website"
echo.

:: Step 4: Add remote
echo [STEP 3] Connecting to GitHub...
git remote remove origin 2>nul
git remote add origin https://github.com/wafaboufassil/nova-fashion.git
git branch -M main
echo.

:: Step 5: Push
echo [STEP 4] Uploading to GitHub...
echo.
echo ============================================
echo    IMPORTANT! READ THIS:
echo ============================================
echo.
echo A login window will open asking for:
echo   Username: wafaboufassil
echo   Password: Use a Personal Access Token (NOT your password)
echo.
echo To create a token:
echo   1. Go to: https://github.com/settings/tokens
echo   2. Click "Generate new token (classic)"
echo   3. Check "repo" (all scopes)
echo   4. Click "Generate token"
echo   5. Copy the token and paste it as password
echo.
echo ============================================
echo.
pause

git push -u origin main

if %errorlevel% equ 0 (
    color 0A
    echo.
    echo ============================================
    echo    SUCCESS! Uploaded to GitHub!
    echo ============================================
    echo.
    echo View your project at:
    echo https://github.com/wafaboufassil/nova-fashion
    echo.
) else (
    color 0C
    echo.
    echo [ERROR] Upload failed!
    echo Make sure you used the correct Personal Access Token.
    echo Try running this script again.
)

echo.
pause
