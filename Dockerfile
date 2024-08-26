# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set environment variables for UTF-8 support
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8
ENV PYTHONIOENCODING=utf-8

# Install pnpm and other necessary tools
RUN apk add --no-cache python3 make g++ file && \
    npm install -g pnpm

# Set working directory
WORKDIR /app

# Debug: List contents and check file encodings
RUN ls -la
RUN find . -type f -exec file {} \;

# Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# Debug: Check copied files
RUN file package.json pnpm-lock.yaml

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Debug: List all files and check their encodings
RUN find . -type f -exec file {} \;

# Create .env file from environment variables
RUN echo "DB_HOST=$DB_HOST" >> .env && \
    echo "DB_PORT=$DB_PORT" >> .env && \
    echo "DB_USER=$DB_USER" >> .env && \
    echo "DB_PASSWORD=$DB_PASSWORD" >> .env && \
    echo "DB_NAME=$DB_NAME" >> .env && \
    echo "AUTH_SECRET=$AUTH_SECRET" >> .env

# Debug: Check .env file
RUN file .env && cat .env

# Build the application
RUN pnpm build

# Stage 2: Production stage
FROM node:18-alpine AS production

# Set environment variables for UTF-8 support
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8
ENV PYTHONIOENCODING=utf-8

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy the built application and .env file from the builder stage
COPY --from=builder /app /app

# Debug: List all files in the production stage
RUN find . -type f -exec file {} \;

# Expose the port
EXPOSE 4321

# Start the application
CMD ["pnpm", "start"]