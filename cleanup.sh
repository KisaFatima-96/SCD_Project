#!/bin/bash

# This script helps with cleaning up Kubernetes resources

echo "Deleting Kubernetes resources..."

# Delete app deployment and service
kubectl delete -f k8s/app-service.yaml
kubectl delete -f k8s/app-deployment.yaml

# Using MongoDB Atlas instead of local MongoDB
echo "Using MongoDB Atlas - no local MongoDB resources to clean up"

# Delete namespace (this will delete all resources in the namespace)
kubectl delete -f k8s/namespace.yaml

echo "Kubernetes resources deleted successfully!"
