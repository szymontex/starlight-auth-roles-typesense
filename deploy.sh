#!/bin/bash

# Path to the project directory
PROJECT_DIR="/path/to/your/project"
export DOCKER_BUILDKIT=1
export BUILDKIT_PROGRESS=plain
export TYPESENSE_API_KEY="your_typesense_api_key"
export TYPESENSE_HOST="your_typesense_host"
export TYPESENSE_PORT="your_typesense_port"
export TYPESENSE_PROTOCOL="http"
export PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY="your_public_typesense_search_only_api_key"
export PUBLIC_TYPESENSE_API_KEY="your_public_typesense_api_key"
export PUBLIC_TYPESENSE_HOST="your_public_typesense_host"
export PUBLIC_TYPESENSE_PORT="your_public_typesense_port"
export PUBLIC_TYPESENSE_PROTOCOL="http"

# Remove the old directory if it exists
if [ -d "$PROJECT_DIR" ]; then
  echo "Removing the old directory..."
  sudo rm -rf "$PROJECT_DIR"
fi

# Clone the latest version of the repository
echo "Cloning the repository..."
git clone https://github.com/yourusername/yourrepository.git "$PROJECT_DIR"

# Navigate to the project directory
cd "$PROJECT_DIR" || exit

mkdir -p "$(pwd)"/typesense-data

# Create the .env file
echo "Creating the .env file..."
cat << EOF > .env
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USER=your_db_user
DB_PASSWORD="your_db_password"
DB_NAME=your_db_name
AUTH_SECRET=your_auth_secret
TYPESENSE_API_KEY=$TYPESENSE_API_KEY
TYPESENSE_HOST=$TYPESENSE_HOST
TYPESENSE_PORT=$TYPESENSE_PORT
TYPESENSE_PROTOCOL=$TYPESENSE_PROTOCOL
PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY=$PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY
PUBLIC_TYPESENSE_API_KEY=$PUBLIC_TYPESENSE_API_KEY
PUBLIC_TYPESENSE_HOST=$PUBLIC_TYPESENSE_HOST
PUBLIC_TYPESENSE_PORT=$PUBLIC_TYPESENSE_PORT
PUBLIC_TYPESENSE_PROTOCOL=$PUBLIC_TYPESENSE_PROTOCOL
EOF

# Run Docker Compose
echo "Building and starting Docker containers..."
docker-compose up --build -d
