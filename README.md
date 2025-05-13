# Shop Management System

A comprehensive solution for retail businesses to manage stores, products, inventory, procurement, and sales.

## Project Structure

The project follows a modern, modular architecture:

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
│   ├── .env                # Environment variables
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

## Technologies Used

### Client

- React
- TypeScript
- Redux Toolkit
- Ant Design
- React Router
- Axios
- i18next

### Server

- Node.js
- TypeScript
- Express.js
- Sequelize ORM
- MySQL
- JWT Authentication
- Winston Logger

### Development Tools

- Docker
- ESLint
- Prettier
- Jest
- Husky

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd shop-management-system
   ```

2. Start the database using Docker:
   ```
   docker-compose up -d
   ```

3. Install server dependencies and set up the database:
   ```
   cd server
   npm install
   npm run install:db
   ```

4. Start the server:
   ```
   npm run dev
   ```

5. In a new terminal, install client dependencies and start the client:
   ```
   cd client
   npm install
   npm run start:win  # For Windows
   # OR
   npm start  # For macOS/Linux
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3001
   ```

## Development

### Server

The server follows a feature-based architecture, where each feature has its own directory containing all related files (model, controller, routes, etc.).

To create a new migration:
```
cd server
npm run migrate:create <migration-name>
```

To run migrations:
```
npm run migrate:up
```

### Client

The client also follows a feature-based architecture, with each feature having its own directory containing all related files (components, slices, services, etc.).

## Docker

The project includes Docker Compose configurations for both the main application and frontend development:

- `docker-compose.yml`: Configuration for the main application
- `docker-compose.frontend.yml`: Configuration for frontend development

To start the frontend development environment:
```
docker-compose -f docker-compose.frontend.yml up -d
```

## Documentation

For more detailed information, please refer to the documentation in the `docs` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
