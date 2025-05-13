import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
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

// Create database if it doesn't exist
const createDatabase = async () => {
  try {
    // Create connection to MySQL server
    const connection = await mysql.createConnection({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
    });

    // Create database if it doesn't exist
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );

    logger.info(`Database ${dbName} created or already exists`);
    await connection.end();
  } catch (error) {
    logger.error('Error creating database:', error);
    throw error;
  }
};

// Initialize database
const initializeDatabase = async () => {
  try {
    // Create database if it doesn't exist
    await createDatabase();

    // Create Sequelize instance
    const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
      host: dbHost,
      port: dbPort,
      dialect: 'mysql',
      logging: (msg) => logger.debug(msg),
      define: {
        timestamps: true,
        underscored: true,
      },
    });

    // Test connection
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');

    // Import models
    const { User } = await import('../../features/users/user.model');
    const { Store } = await import('../../features/stores/store.model');
    const { Product } = await import('../../features/products/product.model');
    const { Inventory } = await import('../../features/inventory/inventory.model');
    const { Procurement } = await import('../../features/procurement/procurement.model');
    const { Order } = await import('../../features/orders/order.model');

    // Define associations
    User.hasMany(Store);
    Store.belongsTo(User);

    Store.hasMany(Product);
    Product.belongsTo(Store);

    Store.hasMany(Inventory);
    Product.hasMany(Inventory);
    Inventory.belongsTo(Store);
    Inventory.belongsTo(Product);

    Store.hasMany(Procurement);
    Product.hasMany(Procurement);
    Procurement.belongsTo(Store);
    Procurement.belongsTo(Product);

    Store.hasMany(Order);
    Order.belongsTo(Store);

    // Sync models with database
    await sequelize.sync({ force: true });
    logger.info('Database synchronized');

    // Seed initial data
    await seedInitialData();

    logger.info('Database initialization completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error initializing database:', error);
    process.exit(1);
  }
};

// Seed initial data
const seedInitialData = async () => {
  try {
    const { User, UserRole } = await import('../../features/users/user.model');
    const { Store } = await import('../../features/stores/store.model');

    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
    });

    logger.info('Admin user created');

    // Create sample store
    await Store.create({
      name: 'Main Store',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '555-123-4567',
      email: 'store@example.com',
      userId: adminUser.id,
    });

    logger.info('Sample store created');
  } catch (error) {
    logger.error('Error seeding initial data:', error);
    throw error;
  }
};

// Run database initialization
initializeDatabase();
