import React, { useState } from 'react';
import { Form, Input, Button, Alert, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API_URL } from '../../../config/constants';

const { Title, Text } = Typography;

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onFinish = async (values: { email: string }) => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would call the API
      await axios.post(`${API_URL}/auth/forgot-password`, values);
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
        {t('auth.forgotPassword.title')}
      </Title>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {success ? (
        <div>
          <Alert
            message={t('auth.forgotPassword.success')}
            type="success"
            showIcon
            style={{ marginBottom: 24 }}
          />
          <div style={{ textAlign: 'center' }}>
            <Link to="/login">
              <Button type="primary">{t('auth.forgotPassword.login')}</Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <Form
            name="forgot-password"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: t('auth.forgotPassword.email') + ' is required' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder={t('auth.forgotPassword.email')}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
              >
                {t('auth.forgotPassword.submit')}
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            <Link to="/login">
              <Text>{t('auth.forgotPassword.login')}</Text>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
