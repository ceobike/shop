import React, { useState } from 'react';
import { Form, Input, Button, Alert, Typography, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API_URL } from '../../../config/constants';

const { Title, Text } = Typography;
const { Option } = Select;

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would call the API
      await axios.post(`${API_URL}/auth/register`, values);
      
      setSuccess(true);
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
        {t('auth.register.title')}
      </Title>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {success && (
        <Alert
          message={t('auth.register.success')}
          type="success"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      <Form
        name="register"
        onFinish={onFinish}
        layout="vertical"
        disabled={success}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: t('auth.register.username') + ' is required' }]}
        >
          <Input placeholder={t('auth.register.username')} size="large" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: t('auth.register.email') + ' is required' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder={t('auth.register.email')} size="large" />
        </Form.Item>

        <Form.Item
          name="firstName"
          rules={[{ required: true, message: t('auth.register.firstName') + ' is required' }]}
        >
          <Input placeholder={t('auth.register.firstName')} size="large" />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[{ required: true, message: t('auth.register.lastName') + ' is required' }]}
        >
          <Input placeholder={t('auth.register.lastName')} size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: t('auth.register.password') + ' is required' },
            { min: 6, message: 'Password must be at least 6 characters' }
          ]}
        >
          <Input.Password placeholder={t('auth.register.password')} size="large" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: t('auth.register.confirmPassword') + ' is required' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password placeholder={t('auth.register.confirmPassword')} size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
          >
            {t('auth.register.submit')}
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: 'center' }}>
        <Link to="/login">
          <Text>{t('auth.register.login')}</Text>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
