import axios from '../../../lib/axios';
import { userStorage } from '../storage';

// API endpoints for EscuelaJS API
const AUTH_ENDPOINTS = {
  REGISTER: '/users',
  LOGIN: '/auth/login',
  PROFILE: '/auth/profile'
};

// Register user
export const registerUser = async (userData) => {
  try {
    // EscuelaJS API expects: name, email, password, avatar
    const registerData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867' // Default avatar
    };
    
    const response = await axios.post(AUTH_ENDPOINTS.REGISTER, registerData);
    
    // EscuelaJS returns user data directly
    const user = response.data;
    
    // For EscuelaJS, we'll use the user ID as a simple token
    // In a real app, you'd get a proper JWT token
    const token = `user_${user.id}_${Date.now()}`;
    
    // Store token in localStorage
    userStorage.set(token);
    
    return {
      success: true,
      user,
      token
    };
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    // EscuelaJS doesn't have a direct login endpoint
    // We'll simulate login by getting user data
    const response = await axios.get('/users');
    const users = response.data;
    
    // Find user by email
    const user = users.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // Simple token generation
    const token = `user_${user.id}_${Date.now()}`;
    
    // Store token in localStorage
    userStorage.set(token);
    
    return {
      success: true,
      user,
      token
    };
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    // Remove token from localStorage
    userStorage.remove();
    
    // Optionally call logout endpoint
    // await axios.post(AUTH_ENDPOINTS.LOGOUT);
    
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Logout failed');
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await axios.get('/auth/profile');
    return response.data;
  } catch (error) {
    console.error('Get profile error:', error);
    throw new Error('Failed to get user profile');
  }
};
