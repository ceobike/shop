import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { RootState } from '../../config/store';
import { getCurrentUser } from '../../features/auth/authSlice';

const ProtectedRoute: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, token } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (token && !isLoading) {
      dispatch(getCurrentUser() as any);
    }
  }, [dispatch, token]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
