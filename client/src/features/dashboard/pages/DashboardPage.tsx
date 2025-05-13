import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Typography, Spin } from 'antd';
import { 
  ShopOutlined, 
  TagOutlined, 
  InboxOutlined, 
  ShoppingCartOutlined 
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  
  // Mock data - in a real app, this would come from an API
  const [stats, setStats] = useState({
    stores: 0,
    products: 0,
    inventory: 0,
    orders: 0
  });

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          stores: 5,
          products: 120,
          inventory: 350,
          orders: 28
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Title level={2}>{t('dashboard.title')}</Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card className="dashboard-card">
            <Statistic
              title={t('dashboard.summary.stores')}
              value={stats.stores}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Card className="dashboard-card">
            <Statistic
              title={t('dashboard.summary.products')}
              value={stats.products}
              prefix={<TagOutlined />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Card className="dashboard-card">
            <Statistic
              title={t('dashboard.summary.inventory')}
              value={stats.inventory}
              prefix={<InboxOutlined />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} md={6}>
          <Card className="dashboard-card">
            <Statistic
              title={t('dashboard.summary.orders')}
              value={stats.orders}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
      </Row>
      
      {/* Additional dashboard content would go here */}
    </div>
  );
};

export default DashboardPage;
