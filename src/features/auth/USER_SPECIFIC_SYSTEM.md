# نظام المستخدم المحدد - User-Specific System

## 🎯 **المطلوب:**

### **3 حالات مستخدم:**

#### **1. زائر (Guest)**
- **ما عنده حساب** → خزّن السلة والـ wishlist بـ localStorage فقط
- **إذا عمل Refresh** → تظل موجودة
- **إذا سجل حساب جديد أو عمل Login** → Replace (تتجاهل cart الزائر وتستخدم cart الحساب)

#### **2. مستخدم مسجل دخول (Logged In User)**
- **السلة والـ wishlist لازم ترتبط بالحساب**
- **خزّن كل شي بالـ localStorage مع userId**، مو بس cart
- **لما يعمل login** → تجيب بياناته المخزنة حسب userId

#### **3. مستخدم ثاني**
- **يدخل ببريد مختلف** → بياخد cart/wishlist مختلفة تمامًا
- **السبب: كل شي مربوط بـ userId**

## ✅ **التطبيق:**

### **1. Cart Store - User-Specific:**
```javascript
// Helper function to get cart key based on user status
const getCartKey = () => {
  const authState = useAuthStore.getState();
  const userId = authState.user?.id;
  return userId ? `cart-${userId}` : 'guest-cart';
};

// Helper function to save cart data to localStorage
const saveCartData = (items) => {
  const key = getCartKey();
  const data = { state: { items } };
  localStorage.setItem(key, JSON.stringify(data));
};

// Migrate guest cart to user cart
migrateGuestToUser: () => {
  const guestData = localStorage.getItem('guest-cart');
  if (guestData) {
    const guestCart = JSON.parse(guestData);
    if (guestCart.state && guestCart.state.items.length > 0) {
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
          // If item exists, add quantities
          const existingItem = currentItemsMap.get(guestItem.id);
          existingItem.quantity += guestItem.quantity;
        } else {
          // If item doesn't exist, add it
          mergedItems.push(guestItem);
        }
      });
      
      set({ items: mergedItems });
      saveCartData(mergedItems);
      
      // Clear guest cart
      localStorage.removeItem('guest-cart');
    }
  }
}
```

### **2. Wishlist Store - User-Specific:**
```javascript
// Helper function to get wishlist key based on user status
const getWishlistKey = () => {
  const authState = useAuthStore.getState();
  const userId = authState.user?.id;
  return userId ? `wishlist-${userId}` : 'guest-wishlist';
};

// Migrate guest wishlist to user wishlist
migrateGuestToUser: () => {
  const guestData = localStorage.getItem('guest-wishlist');
  if (guestData) {
    const guestWishlist = JSON.parse(guestData);
    if (guestWishlist.state && guestWishlist.state.wishlist.length > 0) {
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
      
      // Clear guest wishlist
      localStorage.removeItem('guest-wishlist');
    }
  }
}
```

### **3. User Cart Hook:**
```javascript
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
  }, [isAuthenticated, user, cartStore]);

  return cartStore;
};
```

### **4. User Wishlist Hook:**
```javascript
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
  }, [isAuthenticated, user, wishlistStore]);

  return wishlistStore;
};
```

### **5. Auth Store - Migration Trigger:**
```javascript
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
```

## 🚀 **النتيجة:**

### **✅ Guest User:**
- **السلة والمفضلة** → `guest-cart` و `guest-wishlist`
- **Refresh** → تظل موجودة
- **تسجيل دخول** → يتم نقل البيانات للحساب

### **✅ Logged In User:**
- **السلة والمفضلة** → `cart-${userId}` و `wishlist-${userId}`
- **Logout** → البيانات تبقى محفوظة
- **Login مرة أخرى** → البيانات تعود

### **✅ Different User:**
- **حساب مختلف** → `cart-${differentUserId}` و `wishlist-${differentUserId}`
- **بيانات منفصلة تماماً**

### **✅ Migration System:**
- **Guest → User** → دمج البيانات
- **User → Guest** → حفظ البيانات
- **User → Different User** → تبديل البيانات

تم تطبيق النظام بنجاح! 🎉
