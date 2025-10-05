import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from '../../auth/store';


const getCartKey = () => {
  try {
    const authState = useAuthStore.getState();
    const userId = authState.user?.id;
    if (userId) {
      return `cart-${userId}`;
    } else {
     
      let guestCartKey = localStorage.getItem('current-guest-cart-key');
      if (!guestCartKey) {
        guestCartKey = `guest-cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('current-guest-cart-key', guestCartKey);
      }
      return guestCartKey;
    }
  } catch (error) {
    return 'guest-cart';
  }
};


const getCartData = () => {
  const key = getCartKey();
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : { state: { items: [] } };
};

const saveCartData = (items) => {
  const key = getCartKey();
  const data = { state: { items } };
  localStorage.setItem(key, JSON.stringify(data));
};

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addToCart: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find(item => item.id === product.id);
        
        if (existingItem) {
          const newItems = items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ items: newItems });
          saveCartData(newItems);
        } else {
         
          const newItems = [...items, { ...product, quantity }];
          set({ items: newItems });
          saveCartData(newItems);
        }
      },
 
      removeFromCart: (productId) => {
        const newItems = get().items.filter(item => item.id !== productId);
        set({ items: newItems });
        saveCartData(newItems);
      },
      
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
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      clearCart: () => {
        set({ items: [] });
        saveCartData([]);
      },
      
    
      loadUserCart: () => {
        const cartData = getCartData();
        const items = cartData.state.items;
        
        const hasCorruptedQuantities = items.some(item => item.quantity > 100);
        if (hasCorruptedQuantities) {
          const fixedItems = items.map(item => ({
            ...item,
            quantity: Math.min(item.quantity, 10) 
          }));
          set({ items: fixedItems });
          saveCartData(fixedItems);
        } else {
          set({ items: items });
        }
      },
      
    }),
    {
      name: getCartKey(),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.loadUserCart();
        }
      }
    }
  )
);

export default useCartStore;
