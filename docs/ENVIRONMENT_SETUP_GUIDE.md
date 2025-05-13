# Shop Management System - Environment Setup Guide

This guide provides step-by-step instructions for setting up the development environment for the Shop Management System.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1. **Node.js** (v14 or higher)
   - Download and install from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **Docker and Docker Compose**
   - Download and install Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop)
   - Verify installation: `docker --version` and `docker-compose --version`

3. **Git**
   - Download and install from [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

## Setup Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd shop-management-system
```

### 2. Database Setup

The project uses MySQL as the database, which is configured to run in a Docker container.

1. Start the database container:

```bash
docker-compose up -d
```

This command will:
- Pull the MySQL 8.0 image if not already available
- Create a container named `shop_management_mysql`
- Set up the database with the credentials specified in the `docker-compose.yml` file
- Initialize the database using the scripts in the `mysql-init` directory

2. Verify the database is running:

```bash
docker ps
```

You should see the `shop_management_mysql` container running.

### 3. Server Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on the `.env.example` file:

```bash
cp .env.example .env
```

4. Edit the `.env` file to match your environment settings if needed.

5. Initialize the database:

```bash
npm run install:db
```

This command will:
- Create the database if it doesn't exist
- Set up all required tables
- Seed initial data (admin user, sample store)

6. Start the server in development mode:

```bash
npm run dev
```

The server should now be running on http://localhost:3000.

### 4. Client Setup

1. Open a new terminal window and navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file based on the existing `.env` file:

```bash
cp .env .env.local
```

4. Edit the `.env.local` file to match your environment settings if needed.

5. Start the client in development mode:

```bash
# For Windows
npm run start:win

# For macOS/Linux
npm start
```

The client should now be running on http://localhost:3001.

### 5. Frontend Development Environment (Optional)

For frontend development, you can use the mock API and a separate database:

1. Start the frontend development environment:

```bash
docker-compose -f docker-compose.frontend.yml up -d
```

This command will:
- Start a MySQL database container for frontend development
- Start a JSON Server container for the mock API

2. The mock API will be available at http://localhost:3010.

## Troubleshooting

### Database Connection Issues

If you encounter database connection issues:

1. Check if the MySQL container is running:

```bash
docker ps
```

2. Check the MySQL container logs:

```bash
docker logs shop_management_mysql
```

3. Ensure your `.env` file has the correct database configuration.

### Server Issues

If you encounter issues with the server:

1. Check the server logs in the terminal where you started the server.

2. Check the logs directory for more detailed logs:

```bash
cat server/logs/error.log
```

### Client Issues

If you encounter issues with the client:

1. Check the client logs in the terminal where you started the client.

2. Clear your browser cache and try again.

## Next Steps

Once your environment is set up, you can:

1. Log in to the application using the default admin credentials:
   - Username: `admin`
   - Password: `admin123`

2. Explore the application and start developing!

For more information, refer to the other documentation files in the `docs` directory.
