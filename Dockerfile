# Use Node.js as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json files for both frontend and backend
COPY app/frontend/package*.json ./frontend/
COPY app/backend/package*.json ./backend/

# Install dependencies for both frontend and backend
RUN cd frontend && npm install
RUN cd backend && npm install

# Copy the rest of the application code
COPY app/frontend ./frontend
COPY app/backend ./backend

# Build the frontend
RUN cd frontend && npm run build

# Set environment variables
ENV PORT=5000
ENV NODE_ENV=production
ENV MONGO_URI=mongodb+srv://Bilalkhan:Pakistan@cluster1.moct8fi.mongodb.net/

# Expose the port the app runs on
EXPOSE 5000

# Create a script to start both services
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'cd /app/backend && node seed.js && node index.js' >> /app/start.sh && \
    chmod +x /app/start.sh

# Command to run the application
CMD ["/app/start.sh"]
