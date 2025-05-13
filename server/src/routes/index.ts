import { Express } from 'express';
import { authRoutes } from '../features/auth/auth.routes';
import { userRoutes } from '../features/users/user.routes';
import { storeRoutes } from '../features/stores/store.routes';
import { productRoutes } from '../features/products/product.routes';
import { inventoryRoutes } from '../features/inventory/inventory.routes';
import { procurementRoutes } from '../features/procurement/procurement.routes';
import { orderRoutes } from '../features/orders/order.routes';

export const setupRoutes = (app: Express) => {
  // API version prefix
  const apiPrefix = '/api';

  // Health check endpoint
  app.get(`${apiPrefix}/health`, (req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Feature routes
  app.use(`${apiPrefix}/auth`, authRoutes);
  app.use(`${apiPrefix}/users`, userRoutes);
  app.use(`${apiPrefix}/stores`, storeRoutes);
  app.use(`${apiPrefix}/products`, productRoutes);
  app.use(`${apiPrefix}/inventory`, inventoryRoutes);
  app.use(`${apiPrefix}/procurement`, procurementRoutes);
  app.use(`${apiPrefix}/orders`, orderRoutes);
};
