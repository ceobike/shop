import React, { useState, useEffect } from 'react';
import { Table, Button, Input, Space, Typography, Tag, Modal, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API_URL } from '../../../config/constants';

const { Title } = Typography;

interface IUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

const UsersPage: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // In a real app, this would call the API
      // const response = await axios.get(`${API_URL}/users`);
      // setUsers(response.data.data);
      
      // Mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUsers([
        {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin',
          isActive: true,
          lastLogin: '2023-05-12T10:30:00Z',
          createdAt: '2023-01-01T00:00:00Z'
        },
        {
          id: '2',
          username: 'manager1',
          email: 'manager@example.com',
          firstName: 'Store',
          lastName: 'Manager',
          role: 'manager',
          isActive: true,
          lastLogin: '2023-05-11T14:20:00Z',
          createdAt: '2023-01-02T00:00:00Z'
        },
        {
          id: '3',
          username: 'employee1',
          email: 'employee@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'employee',
          isActive: true,
          lastLogin: '2023-05-10T09:15:00Z',
          createdAt: '2023-01-03T00:00:00Z'
        }
      ]);
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (userId: string) => {
    Modal.confirm({
      title: t('common.confirmDelete'),
      onOk: async () => {
        try {
          // In a real app, this would call the API
          // await axios.delete(`${API_URL}/users/${userId}`);
          
          // Mock deletion
          await new Promise(resolve => setTimeout(resolve, 500));
          setUsers(users.filter(user => user.id !== userId));
          message.success('User deleted successfully');
        } catch (error) {
          console.error('Error deleting user:', error);
          message.error('Failed to delete user');
        }
      }
    });
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase()) ||
    user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: t('users.fields.username'),
      dataIndex: 'username',
      key: 'username',
      sorter: (a: IUser, b: IUser) => a.username.localeCompare(b.username)
    },
    {
      title: t('users.fields.email'),
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: t('users.fields.firstName'),
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: t('users.fields.lastName'),
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: t('users.fields.role'),
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => {
        let color = 'blue';
        if (role === 'admin') color = 'red';
        if (role === 'manager') color = 'green';
        return <Tag color={color}>{role.toUpperCase()}</Tag>;
      }
    },
    {
      title: t('users.fields.isActive'),
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => isActive ? 
        <Tag color="green">Active</Tag> : 
        <Tag color="red">Inactive</Tag>
    },
    {
      title: t('common.actions'),
      key: 'actions',
      render: (_: any, record: IUser) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => console.log('Edit user:', record.id)}
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
        <Title level={2}>{t('users.title')}</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => console.log('Add user')}
        >
          {t('users.add')}
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
        dataSource={filteredUsers}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default UsersPage;
