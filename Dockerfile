# Stage 1: Build stage
FROM node:22.7.0-alpine AS builder

# Set environment variables for UTF-8 support
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8
ENV PYTHONIOENCODING=utf-8

# Install pnpm and other necessary tools
RUN apk add --no-cache python3 make g++ && \
    npm install -g pnpm@9.8.0

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml if they exist, otherwise create empty ones
COPY package.json* pnpm-lock.yaml* ./
RUN if [ ! -f package.json ]; then echo '{}' > package.json; fi
RUN if [ ! -f pnpm-lock.yaml ]; then touch pnpm-lock.yaml; fi

# Remove any existing node_modules, pnpm-lock.yaml, and clean the pnpm store if it exists
RUN rm -rf node_modules pnpm-lock.yaml && \
    [ -d "/root/.local/share/pnpm/store" ] && pnpm store prune || echo "No pnpm store to prune"

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
FROM node:22.7.0-alpine AS production

# Set environment variables for UTF-8 support
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8
ENV PYTHONIOENCODING=utf-8

# Install pnpm
RUN npm install -g pnpm@9.8.0

# Set working directory
WORKDIR /app

# Copy the built application and .env file from the builder stage
COPY --from=builder /app /app

# Prune the pnpm store again to ensure a clean environment, if it exists
RUN [ -d "/root/.local/share/pnpm/store" ] && pnpm store prune || echo "No pnpm store to prune" && \
    rm -rf node_modules

# Expose the port
EXPOSE 4321

# Start the application
CMD ["pnpm", "start"]
