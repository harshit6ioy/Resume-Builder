#!/bin/bash

# deploy.sh
# A simple script to deploy the application manually on your AWS EC2 server.
# Run this script using: ./deploy.sh

echo "Starting Deployment..."

# Ensure we are in the script directory
cd "$(dirname "$0")"

# Pull the latest changes from the main branch
echo "Pulling latest code from GitHub..."
git pull origin main

# Make sure the .env file exists
if [ ! -f .env ]; then
    echo "Warning: .env file not found. Deployment might fail if variables are missing."
    echo "Please create a .env file containing VITE_API_URL, DB_URI, APP_KEY, etc."
fi

# Build and start the containers
echo "Building and starting Docker containers..."
docker-compose down
docker-compose build
docker-compose up -d

# Clean up unused Docker images to save disk space on EC2
echo "Cleaning up old Docker images..."
docker image prune -f

echo "Deployment Successful! 🚀"
echo "Your application should now be live."
