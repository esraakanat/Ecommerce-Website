import { useEffect } from 'react';
import useCartStore from '../store';
import useAuthStore from '../../auth/store';

export const useUserCart = () => {
  const { isAuthenticated, user } = useAuthStore();
  const cartStore = useCartStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      // User is logged in - load their cart and migrate guest cart if exists
      console.log('🔄 Loading user cart for:', user.name);
      cartStore.loadUserCart();
      cartStore.migrateGuestToUser();
    } else {
      // User is guest - load guest cart
      console.log('🔄 Loading guest cart');
      cartStore.loadUserCart();
    }
  }, [isAuthenticated, user?.id]); // Only depend on user.id to avoid infinite loops

  return cartStore;
};
