#!/bin/bash

# Script to remove a large file from Git history using git filter-repo
# This requires git-filter-repo to be installed: https://github.com/newren/git-filter-repo

FILE_TO_REMOVE="weather-frontend-nextjs/node_modules/@next/swc-darwin-x64/next-swc.darwin-x64.node"

echo "Removing $FILE_TO_REMOVE from Git history..."

# Check if git-filter-repo is installed
if ! command -v git-filter-repo &> /dev/null && ! command -v /Users/melchizedekvii/Library/Python/3.10/bin/git-filter-repo &> /dev/null; then
  echo "git-filter-repo not found. Please install it first."
  echo "Installation instructions: https://github.com/newren/git-filter-repo#installation"
  exit 1
fi

# Backup current branch name
CURRENT_BRANCH=$(git branch --show-current)

# Run git filter-repo to remove the file
if command -v git-filter-repo &> /dev/null; then
  git filter-repo --path "$FILE_TO_REMOVE" --invert-paths
else
  /Users/melchizedekvii/Library/Python/3.10/bin/git-filter-repo --path "$FILE_TO_REMOVE" --invert-paths
fi

echo "File removed from history. Please force push the cleaned repository:"
echo "git push origin $CURRENT_BRANCH --force"
