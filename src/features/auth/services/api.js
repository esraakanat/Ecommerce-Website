import httpClient from '../../../lib/axios';
import { userStorage } from '../storage';


const AUTH_ENDPOINTS = {
  REGISTER: '/users',
  LOGIN: '/auth/login',
};


export const registerUser = async (userData) => {
  try {
    // EscuelaJS API expects: name, email, password, avatar
    const registerData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867' // Default avatar
    };
    
    const response = await httpClient.post(AUTH_ENDPOINTS.REGISTER, registerData);
    
    // EscuelaJS returns user data directly
    const user = response.data;
    
    
    const token = `user_${user.id}_${Date.now()}`;
    
   
    userStorage.set(token);
    
    return {
      success: true,
      user,
      token
    };
  } catch (error) {
    
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};


export const loginUser = async (credentials) => {
  try {
    // EscuelaJS doesn't have a direct login endpoint
    // We'll simulate login by getting user data
    const response = await httpClient.get('/users');
    const users = response.data;
    
    
    const user = users.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
  
    const token = `user_${user.id}_${Date.now()}`;
    
    
    userStorage.set(token);
    
    return {
      success: true,
      user,
      token
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};



