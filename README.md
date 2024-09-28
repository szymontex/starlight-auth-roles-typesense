# Starlight Custom Documentation Project

This project is a customized documentation website framework based on [Astro Starlight](https://github.com/withastro/starlight). It has been specifically adapted to support role-based access control, integration with MySQL for authentication, and deployment using Docker. 

## Project Overview

This project serves as a documentation platform that is customized for different user roles such as administrators, company members, editors, and guests. The platform uses Astro's Starlight framework as a foundation, with additional enhancements including MySQL-based authentication, dynamic sidebars, and powerful search capabilities provided by Typesense.

### Key Features

- **MySQL-Based Authentication**: User authentication is handled via MySQL. The project uses a standard SQL query to verify user credentials. This query can be found in the `lib/auth.ts` file and must return the user’s ID, username, password hash, and role.
- **Role-Based Access Control**: The system supports four default user roles:
  - **Admin**: Full access to all documentation and administrative areas.
  - **CompanyMember**: Access to company-specific documentation and general content.
  - **Editor**: Access to editing tools and content management sections.
  - **Guest**: Access to public documentation only.
- **Dynamic Sidebar**: The sidebar is dynamically generated based on the user's role, allowing for customized navigation experiences. This feature is enabled by the dynamic sidebar functionality contributed by [Fryuni](https://github.com/Fryuni) in [this pull request](https://github.com/withastro/starlight/pull/1255).
- **Typesense Integration**: The project integrates with Typesense, providing a fast and typo-tolerant search experience that respects user roles when filtering results.
- **Docker Deployment**: The project includes a `deploy.sh` script for automated deployment using Docker, making it easy to set up the documentation site on a server.

## Deployment

### Using `deploy.sh`

The project includes a `deploy.sh` script that automates the deployment of this repository to a Docker environment. This script handles the following:

1. **Environment Setup**: Exports necessary environment variables for Typesense and Docker.
2. **Repository Cloning**: Clones the latest version of the repository to a specified directory.
3. **Environment Configuration**: Creates a `.env` file with the necessary configuration values, including database credentials, Typesense API keys, and other critical environment variables.
4. **Docker Deployment**: Builds and starts Docker containers using `docker-compose`.

#### To deploy the project:

1. Clone the repository or pull the latest changes.
2. Before running the script, ensure that all required environment variables are set. This includes:
   - `DB_HOST`: The hostname or IP address of the MySQL server.
   - `DB_PORT`: The port number on which MySQL is running.
   - `DB_USER`: The MySQL user with access to the database.
   - `DB_PASSWORD`: The password for the MySQL user.
   - `DB_NAME`: The name of the MySQL database.
   - `AUTH_SECRET`: The secret key used for generating JWT tokens.
   - `TYPESENSE_API_KEY`, `TYPESENSE_HOST`, `TYPESENSE_PORT`, `TYPESENSE_PROTOCOL`: Configuration for Typesense.
   - `PUBLIC_TYPESENSE_*`: Public keys and settings for Typesense client access.
   
3. Run the `deploy.sh` script:
   ```bash
   ./deploy.sh
   ```
4. The script will handle the rest, including setting up the environment and starting the Docker containers.

**Note:** Without a valid SSL certificate, the project might not function correctly after deployment, especially regarding secure cookie handling and API requests.

## Customizations

Several customizations have been made to the default Astro Starlight framework to meet the specific requirements of this project:

### 1. **MySQL-Based Authentication**

- User authentication is managed via MySQL using a standard SQL query found in `lib/auth.ts`. This query is essential for the authentication process and must return the following fields:
  - `id`: The unique identifier for the user.
  - `username`: The username of the user.
  - `password`: The hashed password of the user.
  - `role`: The role assigned to the user (e.g., admin, companyMember, editor, guest).

### 2. **Role-Based Content Access**

- The documentation content and sidebar navigation are dynamically generated based on the user's role. This ensures that users only access the content relevant to their permissions.

### 3. **Typesense Integration**

- The project integrates with Typesense to provide powerful search functionality. Search results are filtered based on the user's role to ensure they only see relevant content.

### 4. **Docker Deployment**

- The project includes a `deploy.sh` script that automates the deployment process. This script ensures that all necessary environment variables are correctly configured and that Docker containers are built and started seamlessly.

### 5. **Package Management with pnpm**

- All dependencies for this project are managed using `pnpm`. To install the required packages, simply run:
  ```bash
  pnpm install
  ```

## Acknowledgments

Special thanks to [Fryuni](https://github.com/Fryuni) for their contribution to Astro Starlight, which enables dynamic sidebar functionality. You can check out their contribution [here](https://github.com/withastro/starlight/pull/1255).

## Documentation

For more detailed documentation on the tools and frameworks used in this project, refer to:

- **[Astro Starlight Documentation](https://starlight.astro.build/getting-started/)**: Learn more about the core framework used in this project.
- **[Typesense Documentation](https://typesense.org/docs/)**: Explore the documentation for Typesense, the search engine used in this project.

## Support

If you need help, you can reach out through the following channels:

- **Astro Discord**: Join the Astro community on Discord. Post questions in the #support forum with the “starlight” tag, or discuss in the #starlight channel.
- **GitHub Issues**: Submit bug reports and feature requests as GitHub issues in this repository.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow the guidelines below:

- **Contributor Manual**: Start with the Astro Starlight [Contributor Manual](https://github.com/withastro/starlight/blob/main/CONTRIBUTING.md).
- **Community Guide**: Join the community discussions in the #starlight channel on Discord.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

---
