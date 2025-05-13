import axios from 'axios';
import { API_URL } from '../../config/constants';

// Login
const login = async (credentials: { username: string; password: string }) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  
  if (response.data.data.token) {
    localStorage.setItem('token', response.data.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
  }
  
  return response.data.data;
};

// Get current user
const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await axios.get(`${API_URL}/auth/me`);
  return response.data.data;
};

// Logout
const logout = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
};

export const authService = {
  login,
  getCurrentUser,
  logout,
};
