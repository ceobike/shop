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

// Run migrations
const runMigrations = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');

    // Create migrations table if it doesn't exist
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Get executed migrations
    const [executedMigrations] = await sequelize.query(
      'SELECT name FROM migrations ORDER BY id ASC'
    );
    const executedMigrationNames = executedMigrations.map((m: any) => m.name);

    // Get migration files
    const migrationsDir = path.join(__dirname, '../migrations');
    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir, { recursive: true });
    }

    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.ts') || file.endsWith('.js'))
      .sort();

    // Run pending migrations
    for (const file of migrationFiles) {
      if (!executedMigrationNames.includes(file)) {
        logger.info(`Running migration: ${file}`);
        
        // Import migration
        const migration = await import(path.join(migrationsDir, file));
        
        // Run migration
        await migration.up(sequelize.getQueryInterface());
        
        // Record migration
        await sequelize.query(
          'INSERT INTO migrations (name) VALUES (?)',
          {
            replacements: [file],
          }
        );
        
        logger.info(`Migration completed: ${file}`);
      }
    }

    logger.info('All migrations completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error running migrations:', error);
    process.exit(1);
  }
};

// Run migrations
runMigrations();
