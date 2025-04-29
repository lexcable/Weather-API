#!/bin/bash

# Script to set up Git Large File Storage (Git LFS) for the repository
# Installs Git LFS, initializes it, and tracks large files
# Includes progress/status output

echo "Starting Git LFS setup..."

# Check if git-lfs is installed
if ! command -v git-lfs &> /dev/null; then
  echo "Git LFS not found. Installing Git LFS..."
  # Install Git LFS (macOS using Homebrew)
  if command -v brew &> /dev/null; then
    brew install git-lfs
    if [ $? -ne 0 ]; then
      echo "Failed to install Git LFS via Homebrew."
      exit 1
    fi
  else
    echo "Homebrew not found. Please install Git LFS manually from https://git-lfs.github.com/"
    exit 1
  fi
else
  echo "Git LFS is already installed."
fi

echo "Initializing Git LFS in the repository..."
git lfs install
if [ $? -ne 0 ]; then
  echo "Failed to initialize Git LFS."
  exit 1
fi

echo "Tracking large file: weather-frontend-nextjs/node_modules/@next/swc-darwin-x64/next-swc.darwin-x64.node"
git lfs track "weather-frontend-nextjs/node_modules/@next/swc-darwin-x64/next-swc.darwin-x64.node"
if [ $? -ne 0 ]; then
  echo "Failed to track large file."
  exit 1
fi

echo "Adding .gitattributes file to the repository..."
git add .gitattributes
if [ $? -ne 0 ]; then
  echo "Failed to add .gitattributes file."
  exit 1
fi

echo "Git LFS setup complete. Please commit the .gitattributes file and push again."
