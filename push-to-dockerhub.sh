#!/bin/bash

# This script helps with pushing the Docker image to Docker Hub

# Set your Docker Hub username
# This is your actual Docker Hub username
DOCKER_USERNAME="bilalkhan980"

# Build the Docker image with Docker Hub username
echo "Building Docker image..."
docker build -t $DOCKER_USERNAME/ecommerce-app:latest .

# Login to Docker Hub
echo "Logging in to Docker Hub..."
docker login

# Push the image to Docker Hub
echo "Pushing image to Docker Hub..."
docker push $DOCKER_USERNAME/ecommerce-app:latest

echo "Image pushed successfully to Docker Hub!"
