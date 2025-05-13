import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Typography, Modal, message, Card } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API_URL } from '../../../config/constants';

const { Title } = Typography;

interface IStore {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  manager: string;
  createdAt: string;
}

const StoresPage: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState<IStore[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      // In a real app, this would call the API
      // const response = await axios.get(`${API_URL}/stores`);
      // setStores(response.data.data);
      
      // Mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStores([
        {
          id: '1',
          name: 'Main Store',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          phone: '555-123-4567',
          email: 'main@example.com',
          manager: 'John Smith',
          createdAt: '2023-01-01T00:00:00Z'
        },
        {
          id: '2',
          name: 'Downtown Branch',
          address: '456 Market St',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94103',
          phone: '555-987-6543',
          email: 'downtown@example.com',
          manager: 'Jane Doe',
          createdAt: '2023-02-15T00:00:00Z'
        },
        {
          id: '3',
          name: 'East Side Location',
          address: '789 Broadway',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          phone: '555-456-7890',
          email: 'eastside@example.com',
          manager: 'Bob Johnson',
          createdAt: '2023-03-10T00:00:00Z'
        }
      ]);
    } catch (error) {
      console.error('Error fetching stores:', error);
      message.error('Failed to fetch stores');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (storeId: string) => {
    Modal.confirm({
      title: t('common.confirmDelete'),
      onOk: async () => {
        try {
          // In a real app, this would call the API
          // await axios.delete(`${API_URL}/stores/${storeId}`);
          
          // Mock deletion
          await new Promise(resolve => setTimeout(resolve, 500));
          setStores(stores.filter(store => store.id !== storeId));
          message.success('Store deleted successfully');
        } catch (error) {
          console.error('Error deleting store:', error);
          message.error('Failed to delete store');
        }
      }
    });
  };

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchText.toLowerCase()) ||
    store.address.toLowerCase().includes(searchText.toLowerCase()) ||
    store.city.toLowerCase().includes(searchText.toLowerCase()) ||
    store.state.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: t('stores.fields.name'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a: IStore, b: IStore) => a.name.localeCompare(b.name)
    },
    {
      title: t('stores.fields.address'),
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: t('stores.fields.city'),
      dataIndex: 'city',
      key: 'city'
    },
    {
      title: t('stores.fields.state'),
      dataIndex: 'state',
      key: 'state'
    },
    {
      title: t('stores.fields.phone'),
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: t('stores.fields.manager'),
      dataIndex: 'manager',
      key: 'manager'
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: (_: any, record: IStore) => (
        <Space size="small">
          <Button 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => console.log('View store:', record.id)}
          />
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => console.log('Edit store:', record.id)}
          />
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={2}>{t('stores.title')}</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => console.log('Add store')}
        >
          {t('stores.add')}
        </Button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder={t('common.search')}
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredStores}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default StoresPage;
