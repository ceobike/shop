import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';

// Load environment variables
dotenv.config();

// Database configuration
const dbName = process.env.DB_NAME || 'shop_management_system';
const dbUser = process.env.DB_USER || 'shop_user';
const dbPassword = process.env.DB_PASSWORD || 'dev_password';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT || '3306', 10);

// Create Sequelize instance
export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: (msg) => logger.debug(msg),
  define: {
    timestamps: true,
    underscored: true,
  },
});

// Initialize models
export const initializeModels = async () => {
  try {
    // Import models
    const { User } = await import('../features/users/user.model');
    const { Store } = await import('../features/stores/store.model');
    const { Product } = await import('../features/products/product.model');
    const { Inventory } = await import('../features/inventory/inventory.model');
    const { Procurement } = await import('../features/procurement/procurement.model');
    const { Order } = await import('../features/orders/order.model');

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
    await sequelize.sync({ alter: true });
    logger.info('Models synchronized with database');
  } catch (error) {
    logger.error('Error initializing models:', error);
    throw error;
  }
};
