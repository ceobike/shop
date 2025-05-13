# Shop Management System - Client

This is the client-side application for the Shop Management System, built with React, TypeScript, and Ant Design.

## Project Structure

```
client/
├── public/             # Public assets
├── src/                # Source code
│   ├── assets/         # Static assets (images, styles)
│   ├── components/     # Reusable React components
│   ├── config/         # Configuration files
│   ├── features/       # Feature modules
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Utility functions
├── .env                # Environment variables (default)
├── .env.local          # Local environment variables (gitignored)
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Available Scripts

In the project directory, you can run:

### `npm start` or `npm run start:win` (for Windows)

Runs the app in development mode on port 3001.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run lint`

Runs ESLint to check for code quality issues.

### `npm run lint:fix`

Runs ESLint and automatically fixes issues where possible.

### `npm run format`

Formats code using Prettier.

### `npm run type-check`

Runs TypeScript compiler to check for type errors without emitting files.

### `npm run validate`

Runs both linting and type checking.

## Environment Variables

- `REACT_APP_API_URL`: URL for the API server
- `REACT_APP_TITLE`: Application title
- `REACT_APP_DEFAULT_LANGUAGE`: Default language for the application
- `REACT_APP_ENV`: Current environment (development, production, etc.)

## TypeScript Configuration

The project uses TypeScript with path aliases for better import organization:

- `@/*`: Alias for src/*
- `@components/*`: Alias for src/components/*
- `@features/*`: Alias for src/features/*
- `@assets/*`: Alias for src/assets/*
- `@hooks/*`: Alias for src/hooks/*
- `@services/*`: Alias for src/services/*
- `@utils/*`: Alias for src/utils/*
- `@config/*`: Alias for src/config/*
- `@types/*`: Alias for src/types/*

## Code Style

This project uses ESLint and Prettier for code quality and formatting:

- ESLint enforces code quality rules
- Prettier ensures consistent code formatting
- Husky and lint-staged run checks before commits

## Naming Conventions

- Interfaces: Prefixed with `I` (e.g., `IUser`)
- Type aliases: PascalCase (e.g., `UserData`)
- Enums: PascalCase (e.g., `UserRole`)
- React components: PascalCase (e.g., `UserProfile`)
- Files containing React components: PascalCase (e.g., `UserProfile.tsx`)
- Utility files: camelCase (e.g., `formatDate.ts`)
- Hooks: camelCase, prefixed with `use` (e.g., `useAuth.ts`)
