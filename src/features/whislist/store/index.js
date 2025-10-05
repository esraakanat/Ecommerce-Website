import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from '../../auth/store';


const getWishlistKey = () => {
  try {
    const authState = useAuthStore.getState();
    const userId = authState.user?.id;
    if (userId) {
      return `wishlist-${userId}`;
    } else {
      let guestWishlistKey = localStorage.getItem('current-guest-wishlist-key');
      if (!guestWishlistKey) {
        guestWishlistKey = `guest-wishlist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('current-guest-wishlist-key', guestWishlistKey);
      }
      return guestWishlistKey;
    }
  } catch (error) {
    return 'guest-wishlist';
  }
};

const getWishlistData = () => {
  const key = getWishlistKey();
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : { state: { wishlist: [] } };
};

// Helper function to save wishlist data to localStorage
const saveWishlistData = (wishlist) => {
  const key = getWishlistKey();
  const data = { state: { wishlist } };
  localStorage.setItem(key, JSON.stringify(data));
};

const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      
      addToWishlist: (product) => {
        const { wishlist } = get();
        const isAlreadyInWishlist = wishlist.some(item => item.id === product.id);
        
        if (!isAlreadyInWishlist) {
          const newWishlist = [...wishlist, product];
          set({ wishlist: newWishlist });
          saveWishlistData(newWishlist);
          return true; 
        }
        return false; 
      },
      
      
      removeFromWishlist: (productId) => {
        const { wishlist } = get();
        const newWishlist = wishlist.filter(item => item.id !== productId);
        set({ wishlist: newWishlist });
        saveWishlistData(newWishlist);
      },
      

      isInWishlist: (productId) => {
        const { wishlist } = get();
        return wishlist.some(item => item.id === productId);
      },
      
      clearWishlist: () => {
        set({ wishlist: [] });
        saveWishlistData([]);
      },
      
      getWishlistCount: () => {
        const { wishlist } = get();
        return wishlist.length;
      },
    
      loadUserWishlist: () => {
        const wishlistData = getWishlistData();
        set({ wishlist: wishlistData.state.wishlist });
      },
    }),

    {
      name: getWishlistKey(),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.loadUserWishlist();
        }
      }
    }
  )
);

export default useWishlistStore;
