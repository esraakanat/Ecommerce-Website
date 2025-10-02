import { useEffect } from 'react';
import useWishlistStore from '../store';
import useAuthStore from '../../auth/store';

export const useUserWishlist = () => {
  const { isAuthenticated, user } = useAuthStore();
  const wishlistStore = useWishlistStore();

  useEffect(() => {
    if (isAuthenticated && user) {
      // User is logged in - load their wishlist and migrate guest wishlist if exists
      console.log('🔄 Loading user wishlist for:', user.name);
      wishlistStore.loadUserWishlist();
      wishlistStore.migrateGuestToUser();
    } else {
      // User is guest - load guest wishlist
      console.log('🔄 Loading guest wishlist');
      wishlistStore.loadUserWishlist();
    }
  }, [isAuthenticated, user?.id]); // Only depend on user.id to avoid infinite loops

  return wishlistStore;
};
