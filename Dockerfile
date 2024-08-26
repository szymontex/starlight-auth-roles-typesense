# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set PYTHONIOENCODING
ENV PYTHONIOENCODING=utf-8

# Install pnpm using npm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Create .env file from environment variables
RUN echo "DB_HOST=$DB_HOST" >> .env && \
    echo "DB_PORT=$DB_PORT" >> .env && \
    echo "DB_USER=$DB_USER" >> .env && \
    echo "DB_PASSWORD=$DB_PASSWORD" >> .env && \
    echo "DB_NAME=$DB_NAME" >> .env && \
    echo "AUTH_SECRET=$AUTH_SECRET" >> .env

# Build the application
RUN pnpm build

# Stage 2: Production stage
FROM node:18-alpine AS production

# Install pnpm using npm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy the built application and .env file from the builder stage
COPY --from=builder /app /app

# Expose the port
EXPOSE 4321

# Start the application
CMD ["pnpm", "start"]