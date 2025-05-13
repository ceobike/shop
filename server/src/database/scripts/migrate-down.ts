import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { logger } from '../../utils/logger';

// Load environment variables
dotenv.config();

// Database configuration
const dbName = process.env.DB_NAME || 'shop_management_system';
const dbUser = process.env.DB_USER || 'shop_user';
const dbPassword = process.env.DB_PASSWORD || 'dev_password';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '3306', 10);

// Create Sequelize instance
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: (msg) => logger.debug(msg),
});

// Run migration rollback
const rollbackMigration = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');

    // Get last executed migration
    const [executedMigrations] = await sequelize.query(
      'SELECT id, name FROM migrations ORDER BY id DESC LIMIT 1'
    );

    if (executedMigrations.length === 0) {
      logger.info('No migrations to roll back');
      process.exit(0);
    }

    const lastMigration = executedMigrations[0] as { id: number; name: string };
    logger.info(`Rolling back migration: ${lastMigration.name}`);

    // Import migration
    const migrationsDir = path.join(__dirname, '../migrations');
    const migration = await import(path.join(migrationsDir, lastMigration.name));

    // Run migration rollback
    await migration.down(sequelize.getQueryInterface());

    // Remove migration record
    await sequelize.query(
      'DELETE FROM migrations WHERE id = ?',
      {
        replacements: [lastMigration.id],
      }
    );

    logger.info(`Migration rolled back: ${lastMigration.name}`);
    process.exit(0);
  } catch (error) {
    logger.error('Error rolling back migration:', error);
    process.exit(1);
  }
};

// Run migration rollback
rollbackMigration();
