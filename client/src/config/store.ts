import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import storesReducer from '../features/stores/storesSlice';
import productsReducer from '../features/products/productsSlice';
import inventoryReducer from '../features/inventory/inventorySlice';
import procurementReducer from '../features/procurement/procurementSlice';
import ordersReducer from '../features/orders/ordersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    stores: storesReducer,
    products: productsReducer,
    inventory: inventoryReducer,
    procurement: procurementReducer,
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
