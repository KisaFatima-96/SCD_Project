#!/bin/bash

# This script helps with local deployment to Minikube

# Set your Docker Hub username
# This is only used for reference in comments, as we're using local images for Minikube
DOCKER_USERNAME="bilalkhan980"

# Ensure Minikube is running
echo "Checking Minikube status..."
minikube status || minikube start

# Configure Docker to use Minikube's Docker daemon
echo "Configuring Docker to use Minikube's daemon..."
eval $(minikube docker-env)

# Build the Docker image
echo "Building Docker image..."
docker build -t ecommerce-app:latest .

# Apply Kubernetes manifests
echo "Applying Kubernetes manifests..."
kubectl apply -f k8s/namespace.yaml
# Using MongoDB Atlas instead of local MongoDB
echo "Using MongoDB Atlas instead of local MongoDB deployment"

# Update app-deployment.yaml to use local image
echo "Updating app-deployment.yaml for local deployment..."
sed -i.bak "s|image: \${DOCKER_USERNAME}/ecommerce-app:latest|image: ecommerce-app:latest\n        imagePullPolicy: Never|g" k8s/app-deployment.yaml

# Apply app deployment and service
echo "Applying app deployment and service..."
kubectl apply -f k8s/app-deployment.yaml
kubectl apply -f k8s/app-service.yaml

# Restore original app-deployment.yaml
echo "Restoring original app-deployment.yaml..."
mv k8s/app-deployment.yaml.bak k8s/app-deployment.yaml

# Wait for deployment to be ready
echo "Waiting for deployment to be ready..."
kubectl -n ecommerce-app rollout status deployment/ecommerce-app

# Display service information
echo "Application deployed successfully!"
kubectl -n ecommerce-app get services ecommerce-app

# Open the application in the browser
echo "Opening the application in the browser..."
echo "Setting up port-forwarding to access the application..."
echo "The application will be available at http://localhost:5000"
kubectl port-forward -n ecommerce-app svc/ecommerce-app 5000:80 &
sleep 3
echo "Port-forwarding is active. Press Ctrl+C to stop."
