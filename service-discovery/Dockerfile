# Dockerfile for service discovery

# Use the official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install any required dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set the NODE_ENV environment variable
ENV NODE_ENV=development

# Expose the port that the service will listen on
EXPOSE 3002

# Run the startup script when the container starts
CMD [ "npm", "start" ]
