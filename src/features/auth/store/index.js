import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userStorage } from '../storage';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: userStorage.get() || null,
      
      // Initialize auth state from localStorage
      initializeAuth: () => {
        const token = userStorage.get();
        if (token) {
          set({
            isAuthenticated: true,
            token: token
          });
        }
      },
      
      // Register and auto-login
      register: (userData, token) => {
        set({
          user: userData,
          isAuthenticated: true,
          token: token
        });
        userStorage.set(token);
        
      },
      
      // Login
      login: (userData, token) => {
        set({
          user: userData,
          isAuthenticated: true,
          token: token
        });
        userStorage.set(token);
        
      },
      
      // Logout
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null
        });
        userStorage.remove();
        
        // Clear guest cart and wishlist keys to start fresh for next guest
        localStorage.removeItem('current-guest-cart-key');
        localStorage.removeItem('current-guest-wishlist-key');
        
        // البيانات تبقى محفوظة في localStorage حسب userId
      },
      
      
      setUser: (userData) => {
        set({ user: userData });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;

