import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from '../../auth/store';

// Helper function to get wishlist key based on user status
const getWishlistKey = () => {
  try {
    const authState = useAuthStore.getState();
    const userId = authState.user?.id;
    if (userId) {
      return `wishlist-${userId}`;
    } else {
      // Generate unique guest wishlist key for each session
      let guestWishlistKey = localStorage.getItem('current-guest-wishlist-key');
      if (!guestWishlistKey) {
        guestWishlistKey = `guest-wishlist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('current-guest-wishlist-key', guestWishlistKey);
      }
      return guestWishlistKey;
    }
  } catch (error) {
    // Fallback to guest wishlist if auth store is not ready
    return 'guest-wishlist';
  }
};

// Helper function to get wishlist data from localStorage
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
      
      // إضافة منتج للمفضلة
      addToWishlist: (product) => {
        const { wishlist } = get();
        const isAlreadyInWishlist = wishlist.some(item => item.id === product.id);
        
        if (!isAlreadyInWishlist) {
          const newWishlist = [...wishlist, product];
          set({ wishlist: newWishlist });
          saveWishlistData(newWishlist);
          return true; // تمت الإضافة بنجاح
        }
        return false; // المنتج موجود بالفعل
      },
      
      // إزالة منتج من المفضلة
      removeFromWishlist: (productId) => {
        const { wishlist } = get();
        const newWishlist = wishlist.filter(item => item.id !== productId);
        set({ wishlist: newWishlist });
        saveWishlistData(newWishlist);
      },
      
      // التحقق من وجود منتج في المفضلة
      isInWishlist: (productId) => {
        const { wishlist } = get();
        return wishlist.some(item => item.id === productId);
      },
      
      // مسح المفضلة بالكامل
      clearWishlist: () => {
        set({ wishlist: [] });
        saveWishlistData([]);
      },
      
      // الحصول على عدد المنتجات في المفضلة
      getWishlistCount: () => {
        const { wishlist } = get();
        return wishlist.length;
      },
      
      // Load wishlist for current user
      loadUserWishlist: () => {
        const wishlistData = getWishlistData();
        set({ wishlist: wishlistData.state.wishlist });
      },
      
      // Migrate guest wishlist to user wishlist
      migrateGuestToUser: () => {
        // Get current guest wishlist key
        const currentGuestWishlistKey = localStorage.getItem('current-guest-wishlist-key');
        if (currentGuestWishlistKey) {
          const guestData = localStorage.getItem(currentGuestWishlistKey);
          if (guestData) {
            const guestWishlist = JSON.parse(guestData);
            if (guestWishlist.state && guestWishlist.state.wishlist.length > 0) {
              // Check if migration has already been done for this session
              const migrationKey = `wishlist-migration-done-${useAuthStore.getState().user?.id}`;
              if (localStorage.getItem(migrationKey)) {
                return;
              }
              
              // Merge guest wishlist with user wishlist
              const currentWishlist = get().wishlist;
              const guestItems = guestWishlist.state.wishlist;
              
              // Create a set of current wishlist IDs for quick lookup
              const currentWishlistIds = new Set();
              currentWishlist.forEach(item => {
                currentWishlistIds.add(item.id);
              });
              
              // Merge guest items with current wishlist
              const mergedWishlist = [...currentWishlist];
              guestItems.forEach(guestItem => {
                if (!currentWishlistIds.has(guestItem.id)) {
                  // If item doesn't exist, add it
                  mergedWishlist.push(guestItem);
                }
              });
              
              set({ wishlist: mergedWishlist });
              saveWishlistData(mergedWishlist);
              
              // Mark migration as done for this session only
              localStorage.setItem(migrationKey, 'true');
              
              // Clear guest wishlist
              localStorage.removeItem(currentGuestWishlistKey);
              localStorage.removeItem('current-guest-wishlist-key');
            }
          }
        }
      }
    }),
    {
      name: getWishlistKey(),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Load wishlist for current user
          state.loadUserWishlist();
        }
      }
    }
  )
);

export default useWishlistStore;
