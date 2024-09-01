# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set environment variables for UTF-8 support
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8
ENV PYTHONIOENCODING=utf-8

# Install pnpm and other necessary tools
RUN apk add --no-cache python3 make g++ && \
    npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json if it exists, otherwise create an empty one
COPY package.json* ./
RUN if [ ! -f package.json ]; then echo '{}' > package.json; fi

# Remove any existing node_modules, pnpm-lock.yaml and clean the pnpm store
RUN pnpm store prune && rm -rf node_modules pnpm-lock.yaml

# Install dependencies if package.json exists, forcing a fresh installation
RUN if [ -s package.json ]; then pnpm install --force; fi

# Copy the rest of the application code
COPY . .

# Create .env file from environment variables
RUN echo "DB_HOST=$DB_HOST" >> .env && \
    echo "DB_PORT=$DB_PORT" >> .env && \
    echo "DB_USER=$DB_USER" >> .env && \
    echo "DB_PASSWORD=$DB_PASSWORD" >> .env && \
    echo "DB_NAME=$DB_NAME" >> .env && \
    echo "AUTH_SECRET=$AUTH_SECRET" >> .env

# Build the application if there's a build script
RUN if grep -q '"build"' package.json; then pnpm build; fi

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

# Expose the port
EXPOSE 4321

# Start the application
CMD ["pnpm", "start"]
