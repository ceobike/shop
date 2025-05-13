import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Alert, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { login, reset } from '../authSlice';
import { RootState } from '../../../config/store';

const { Text } = Typography;

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const onFinish = (values: { username: string; password: string }) => {
    dispatch(login(values) as any);
  };

  return (
    <div>
      <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
        {t('auth.login.title')}
      </Typography.Title>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: t('auth.login.username') + ' is required' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={t('auth.login.username')}
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: t('auth.login.password') + ' is required' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('auth.login.password')}
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={isLoading}
          >
            {t('auth.login.submit')}
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: 'center' }}>
        <Link to="/forgot-password">
          <Text>{t('auth.login.forgotPassword')}</Text>
        </Link>
        <br />
        <Link to="/register">
          <Text>{t('auth.login.register')}</Text>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
