#!/bin/bash

echo "Manual Git LFS setup instructions for macOS without Homebrew:"

echo "1. Download the Git LFS installer package from https://git-lfs.github.com/."
echo "2. Run the downloaded installer and follow the installation prompts."
echo "3. After installation, open a terminal and navigate to your repository."
echo "4. Run the following commands to initialize Git LFS and track the large file:"

echo "   git lfs install"
echo "   git lfs track \"weather-frontend-nextjs/node_modules/@next/swc-darwin-x64/next-swc.darwin-x64.node\""
echo "   git add .gitattributes"
echo "   git commit -m \"Configure Git LFS to track large files\""
echo "   git push origin main"

echo "Please follow these steps manually. Let me know if you need help with any of them."
