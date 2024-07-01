# Use an official Node.js 14 image as a base
FROM mongo:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package*.json files
COPY package*.json ./

# Install dependencies
RUN mongodb

# Copy the rest of the code
COPY . .

# Expose the port the app will use
EXPOSE 3000

# Run the command to start the app
CMD ["npm", "start"]
