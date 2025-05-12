FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV PORT=5000
ENV NODE_ENV=production
ENV MONGO_URI=mongodb+srv://Bilalkhan:Pakistan@cluster1.moct8fi.mongodb.net/

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["node", "index.js"]
