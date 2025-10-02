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
        
        // Trigger cart and wishlist migration after a short delay
        setTimeout(() => {
          // Import stores dynamically to avoid circular dependencies
          import('../../cart/store').then(({ default: useCartStore }) => {
            useCartStore.getState().migrateGuestToUser();
          });
          import('../../whislist/store').then(({ default: useWishlistStore }) => {
            useWishlistStore.getState().migrateGuestToUser();
          });
        }, 100);
      },
      
      // Login
      login: (userData, token) => {
        set({
          user: userData,
          isAuthenticated: true,
          token: token
        });
        userStorage.set(token);
        
        // Trigger cart and wishlist migration after a short delay
        setTimeout(() => {
          // Import stores dynamically to avoid circular dependencies
          import('../../cart/store').then(({ default: useCartStore }) => {
            useCartStore.getState().migrateGuestToUser();
          });
          import('../../whislist/store').then(({ default: useWishlistStore }) => {
            useWishlistStore.getState().migrateGuestToUser();
          });
        }, 100);
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
      
      // Set user
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

