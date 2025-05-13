# Shop Management System - Server

This is the backend API server for the Shop Management System, built with Node.js, Express, TypeScript, and Sequelize ORM.

## Project Structure

The server follows a modern, modular architecture organized by features/domains:

```
server/
├── dist/                  # Compiled TypeScript output
├── logs/                  # Application logs
├── src/                   # Source code
│   ├── database/          # Database configuration and migrations
│   │   ├── migrations/    # Database migrations
│   │   ├── scripts/       # Migration scripts
│   │   └── connection.ts  # Database connection setup
│   ├── features/          # Feature modules
│   │   ├── auth/          # Authentication feature
│   │   ├── users/         # Users feature
│   │   ├── stores/        # Stores feature
│   │   ├── products/      # Products feature
│   │   ├── inventory/     # Inventory feature
│   │   ├── procurement/   # Procurement feature
│   │   └── orders/        # Orders feature
│   ├── middleware/        # Express middleware
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── index.ts           # Application entry point
├── .env                   # Environment variables
├── .env.example           # Example environment variables
├── package.json           # Project dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Feature Module Structure

Each feature module follows a consistent structure:

```
feature/
├── feature.model.ts       # Database model
├── feature.service.ts     # Business logic
├── feature.controller.ts  # Request handlers
├── feature.routes.ts      # Route definitions
├── feature.validation.ts  # Request validation
└── feature.test.ts        # Unit tests
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and update the values
4. Install the database:
   ```
   npm run install:db
   ```

   This will:
   - Create the database if it doesn't exist
   - Set up all required tables
   - Seed initial data (admin user, sample store)

   Alternatively, you can manually create the database:
   ```
   CREATE DATABASE shop_management_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

### Development

Start the development server:

```
npm run dev
```

### Database Migrations

Create a new migration:

```
npm run migrate:create <migration-name>
```

Run migrations:

```
npm run migrate:up
```

Rollback the last migration:

```
npm run migrate:down
```

### Building for Production

Build the application:

```
npm run build
```

Start the production server:

```
npm start
```
