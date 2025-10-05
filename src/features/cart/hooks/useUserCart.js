import { useEffect } from 'react';
import useCartStore from '../store';
import useAuthStore from '../../auth/store';

export const useUserCart = () => {
  const { isAuthenticated, user } = useAuthStore();
  const cartStore = useCartStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      cartStore.loadUserCart(); // للمستخدم المصادق
    } else {
      cartStore.loadUserCart(); // للضيف
    }
  }, [isAuthenticated, user?.id]);

  return cartStore;
};
