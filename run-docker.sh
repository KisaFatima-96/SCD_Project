#!/bin/bash

# This script builds and runs the Docker containers for the e-commerce application

echo "Building and starting Docker containers..."
docker-compose up --build -d

echo "Waiting for containers to start..."
sleep 5

echo "Application is running!"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5000/api"

echo "To view logs, run: docker-compose logs -f"
echo "To stop the application, run: docker-compose down"
