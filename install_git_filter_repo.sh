#!/bin/bash

# Script to install git-filter-repo on macOS

# Check if python3 is installed
if ! command -v python3 &> /dev/null; then
  echo "Python3 is not installed. Please install Python3 first."
  exit 1
fi

# Install git-filter-repo using pip
echo "Installing git-filter-repo using pip..."
python3 -m pip install --user git-filter-repo

if [ $? -eq 0 ]; then
  echo "git-filter-repo installed successfully."
  echo "Make sure ~/.local/bin is in your PATH to use git-filter-repo."
else
  echo "Failed to install git-filter-repo."
  exit 1
fi
