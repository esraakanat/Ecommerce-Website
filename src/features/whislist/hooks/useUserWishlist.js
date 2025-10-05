import { useEffect } from 'react';
import useWishlistStore from '../store';
import useAuthStore from '../../auth/store';

export const useUserWishlist = () => {
  const { isAuthenticated, user } = useAuthStore();
  const wishlistStore = useWishlistStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      wishlistStore.loadUserWishlist(); // للمستخدم المصادق
    } else {
      wishlistStore.loadUserWishlist(); // للضيف
    }
  }, [isAuthenticated, user?.id]); 
  return wishlistStore;
};
