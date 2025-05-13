import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout, Card, Typography } from 'antd';
import { RootState } from '../../config/store';

const { Title } = Typography;
const { Content } = Layout;

const AuthLayout: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{ width: 400, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Title level={2}>Shop Management System</Title>
          </div>
          <Outlet />
        </Card>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
