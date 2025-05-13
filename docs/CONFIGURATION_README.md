# Shop Management System - Configuration Documentation

Welcome to the Shop Management System configuration documentation. This set of documents provides comprehensive information about setting up, configuring, and deploying the system.

## System Overview

The Shop Management System is a comprehensive solution for retail businesses to manage stores, products, inventory, procurement, and sales. The system consists of:

1. **Client**: React TypeScript application with Redux for state management
2. **Server**: Node.js TypeScript application with Express.js framework
3. **Database**: MySQL database accessed via Sequelize ORM

## Documentation Structure

This configuration documentation is organized into the following sections:

1. **Environment Setup**: Information about setting up the development environment
2. **Database Configuration**: Information about configuring the database
3. **Client Configuration**: Information about configuring the client application
4. **Server Configuration**: Information about configuring the server application
5. **Deployment**: Information about deploying the application

## Project Structure

The Shop Management System follows a modern, modular architecture:

```
shop-management-system/
├── client/                 # React TypeScript client
│   ├── public/             # Public assets
│   ├── src/                # Source code
│   │   ├── assets/         # Static assets
│   │   ├── components/     # React components
│   │   ├── config/         # Configuration files
│   │   ├── features/       # Feature modules
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   ├── .env.local          # Environment variables
│   └── package.json        # Dependencies and scripts
│
├── server/                 # Node.js TypeScript server
│   ├── src/                # Source code
│   │   ├── database/       # Database configuration
│   │   ├── features/       # Feature modules
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Utility functions
│   │   └── index.ts        # Entry point
│   ├── .env                # Environment variables
│   └── package.json        # Dependencies and scripts
│
├── docs/                   # Documentation
├── mysql-init/             # MySQL initialization scripts
├── frontend-db-init/       # Frontend database initialization scripts
├── frontend-mock-api/      # Mock API for frontend development
├── docker-compose.yml      # Docker Compose configuration
└── docker-compose.frontend.yml # Docker Compose configuration for frontend development
```

## Environment Variables

### Client Environment Variables

The client application uses the following environment variables:

- `REACT_APP_API_URL`: URL for the API server
- `REACT_APP_TITLE`: Application title
- `REACT_APP_DEFAULT_LANGUAGE`: Default language for the application
- `REACT_APP_ENV`: Current environment (development, production, etc.)

### Server Environment Variables

The server application uses the following environment variables:

- `NODE_ENV`: Current environment (development, production, etc.)
- `PORT`: Port for the server to listen on
- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_NAME`: Database name
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `JWT_SECRET`: Secret for JWT token generation
- `JWT_EXPIRES_IN`: JWT token expiration time
- `LOG_LEVEL`: Logging level (debug, info, warn, error)
- `CORS_ORIGIN`: CORS origin

## Docker Configuration

The project includes Docker Compose configurations for both the main application and frontend development:

- `docker-compose.yml`: Configuration for the main application
- `docker-compose.frontend.yml`: Configuration for frontend development

### Main Docker Compose Configuration

The main Docker Compose configuration includes:

- MySQL database

### Frontend Docker Compose Configuration

The frontend Docker Compose configuration includes:

- MySQL database for frontend development
- JSON Server for mock API
