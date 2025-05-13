import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';

// Layouts
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Auth Pages
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import ForgotPasswordPage from './features/auth/pages/ForgotPasswordPage';

// Protected Pages
import DashboardPage from './features/dashboard/pages/DashboardPage';
import UsersPage from './features/users/pages/UsersPage';
import StoresPage from './features/stores/pages/StoresPage';
import ProductsPage from './features/products/pages/ProductsPage';
import InventoryPage from './features/inventory/pages/InventoryPage';
import ProcurementPage from './features/procurement/pages/ProcurementPage';
import OrdersPage from './features/orders/pages/OrdersPage';

// Auth Guard
import ProtectedRoute from './components/auth/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/procurement" element={<ProcurementPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Route>
        </Route>

        {/* Redirect to login if no route matches */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Layout>
  );
};

export default App;
