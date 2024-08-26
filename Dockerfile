# Stage 1: Build stage
FROM node:18-alpine AS builder

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

# Build the application
RUN pnpm build

# Stage 2: Production stage
FROM node:18-alpine AS production

# Install pnpm using npm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app /app

# Expose the port
EXPOSE 26396

# Start the application
CMD ["pnpm", "start"]