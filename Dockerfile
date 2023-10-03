# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package*.json files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy other source code files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production stage
FROM node:18

# Set the working directory
WORKDIR /app

#RUN npm install --only=production - not needed for CRA

# Install `serve` to serve the production build
RUN npm install -g serve

# Copy build folder from the builder stage
COPY --from=builder /app/build ./build

# Expose the listening port
EXPOSE 8080

# Run the app using `serve`
CMD ["sh", "-c", "serve", "-s", "./build", "-l", "tcp://0.0.0.0:8080"]
#CMD ["serve", "./build"]
