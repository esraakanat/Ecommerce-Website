import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from '../../auth/store';

// Helper function to get cart key based on user status
const getCartKey = () => {
  try {
    const authState = useAuthStore.getState();
    const userId = authState.user?.id;
    if (userId) {
      return `cart-${userId}`;
    } else {
      // Generate unique guest cart key for each session
      let guestCartKey = localStorage.getItem('current-guest-cart-key');
      if (!guestCartKey) {
        guestCartKey = `guest-cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('current-guest-cart-key', guestCartKey);
      }
      return guestCartKey;
    }
  } catch (error) {
    // Fallback to guest cart if auth store is not ready
    return 'guest-cart';
  }
};

// Helper function to get cart data from localStorage
const getCartData = () => {
  const key = getCartKey();
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : { state: { items: [] } };
};

// Helper function to save cart data to localStorage
const saveCartData = (items) => {
  const key = getCartKey();
  const data = { state: { items } };
  localStorage.setItem(key, JSON.stringify(data));
};

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      // Add item to cart
      addToCart: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find(item => item.id === product.id);
        
        if (existingItem) {
          // If item exists, increase quantity by the specified amount
          const newItems = items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ items: newItems });
          saveCartData(newItems);
        } else {
          // If item doesn't exist, add new item with specified quantity
          const newItems = [...items, { ...product, quantity }];
          set({ items: newItems });
          saveCartData(newItems);
        }
      },
      
      // Remove item from cart
      removeFromCart: (productId) => {
        const newItems = get().items.filter(item => item.id !== productId);
        set({ items: newItems });
        saveCartData(newItems);
      },
      
      // Update item quantity
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        const newItems = get().items.map(item =>
          item.id === productId
            ? { ...item, quantity }
            : item
        );
        set({ items: newItems });
        saveCartData(newItems);
      },
      
      // Get total items count
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      // Get total price
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      // Clear cart
      clearCart: () => {
        set({ items: [] });
        saveCartData([]);
      },
      
      // Reset cart quantities to reasonable values
      resetCartQuantities: () => {
        const items = get().items;
        const resetItems = items.map(item => ({
          ...item,
          quantity: Math.min(item.quantity, 10) // Cap at 10 items
        }));
        set({ items: resetItems });
        saveCartData(resetItems);
        console.log('✅ Cart quantities reset to reasonable values');
      },
      
      // Load cart for current user
      loadUserCart: () => {
        const cartData = getCartData();
        const items = cartData.state.items;
        
        // Check for corrupted quantities and fix them
        const hasCorruptedQuantities = items.some(item => item.quantity > 100);
        if (hasCorruptedQuantities) {
          console.log('⚠️ Detected corrupted quantities, fixing...');
          const fixedItems = items.map(item => ({
            ...item,
            quantity: Math.min(item.quantity, 10) // Cap at 10 items
          }));
          set({ items: fixedItems });
          saveCartData(fixedItems);
          console.log('✅ Cart quantities fixed');
        } else {
          set({ items: items });
        }
      },
      
      // Migrate guest cart to user cart
      migrateGuestToUser: () => {
        // Get current guest cart key
        const currentGuestCartKey = localStorage.getItem('current-guest-cart-key');
        if (currentGuestCartKey) {
          const guestData = localStorage.getItem(currentGuestCartKey);
          if (guestData) {
            const guestCart = JSON.parse(guestData);
            if (guestCart.state && guestCart.state.items.length > 0) {
              // Check if migration has already been done for this session
              const migrationKey = `migration-done-${useAuthStore.getState().user?.id}`;
              if (localStorage.getItem(migrationKey)) {
                console.log('Migration already done this session, skipping...');
                return;
              }
              
              // Merge guest cart with user cart
              const currentItems = get().items;
              const guestItems = guestCart.state.items;
              
              // Create a map of current items for quick lookup
              const currentItemsMap = new Map();
              currentItems.forEach(item => {
                currentItemsMap.set(item.id, item);
              });
              
              // Merge guest items with current items
              const mergedItems = [...currentItems];
              guestItems.forEach(guestItem => {
                if (currentItemsMap.has(guestItem.id)) {
                  // If item exists, add quantities (but cap at reasonable amount)
                  const existingItem = currentItemsMap.get(guestItem.id);
                  const newQuantity = Math.min(existingItem.quantity + guestItem.quantity, 10);
                  existingItem.quantity = newQuantity;
                } else {
                  // If item doesn't exist, add it (but cap quantity)
                  const cappedItem = {
                    ...guestItem,
                    quantity: Math.min(guestItem.quantity, 10)
                  };
                  mergedItems.push(cappedItem);
                }
              });
              
              set({ items: mergedItems });
              saveCartData(mergedItems);
              
              // Mark migration as done for this session only
              localStorage.setItem(migrationKey, 'true');
              
              // Clear guest cart
              localStorage.removeItem(currentGuestCartKey);
              localStorage.removeItem('current-guest-cart-key');
              console.log('✅ Guest cart migrated to user cart');
            }
          }
        }
      }
    }),
    {
      name: getCartKey(),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Load cart for current user
          state.loadUserCart();
        }
      }
    }
  )
);

export default useCartStore;
