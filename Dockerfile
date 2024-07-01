# Use an official Node.js 14 image as a base
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy the package*.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Copy .env file
COPY ./config/dev.env .env

# Expose the port the app will use
EXPOSE 3000

# Run the command to start the app
CMD ["npm", "start"]
