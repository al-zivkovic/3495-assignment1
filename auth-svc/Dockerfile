# Use node image as base
FROM node:12

# Set the working directory
WORKDIR /app

# Copy the package.json file to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Expose the port for the app
EXPOSE 3002

# Start the app
CMD [ "npm", "start" ]
