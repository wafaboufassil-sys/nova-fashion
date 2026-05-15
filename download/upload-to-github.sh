#!/bin/bash

echo "============================================"
echo "   NØVA Fashion - GitHub Upload Script"
echo "============================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "[ERROR] Git is not installed!"
    echo ""
    echo "Install it with:"
    echo "  Mac:  brew install git"
    echo "  Ubuntu/Debian: sudo apt install git"
    exit 1
fi

echo "[OK] Git is installed"
echo ""

# Step 1: Get folder path
echo "[STEP 1] Enter the folder where you extracted nova-fashion-project.zip"
echo "         Example: /Users/username/Desktop/nova-fashion"
echo ""
read -p "Folder path: " FOLDER_PATH

if [ ! -f "$FOLDER_PATH/package.json" ]; then
    echo "[ERROR] Cannot find package.json in that folder!"
    echo "Make sure you extracted the ZIP correctly."
    exit 1
fi

echo ""
echo "[OK] Found project files!"

# Step 2: Navigate
cd "$FOLDER_PATH"

# Step 3: Init Git
echo "[STEP 2] Initializing Git..."
git init
git add -A
git commit -m "NOVA - Futuristic Fashion E-Commerce Website"

# Step 4: Add remote
echo "[STEP 3] Connecting to GitHub..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/wafaboufassil/nova-fashion.git
git branch -M main

# Step 5: Push
echo "[STEP 4] Uploading to GitHub..."
echo ""
echo "============================================"
echo "   IMPORTANT!"
echo "============================================"
echo ""
echo "If asked for login:"
echo "  Use a Personal Access Token as password"
echo ""
echo "Create token at:"
echo "  https://github.com/settings/tokens"
echo "  Check 'repo' scope"
echo ""
echo "============================================"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "============================================"
    echo "   SUCCESS! Uploaded to GitHub!"
    echo "============================================"
    echo ""
    echo "View your project: https://github.com/wafaboufassil/nova-fashion"
    echo ""
else
    echo ""
    echo "[ERROR] Upload failed! Make sure your token is correct."
fi
