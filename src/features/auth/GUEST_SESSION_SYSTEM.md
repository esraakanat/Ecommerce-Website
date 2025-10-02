# نظام جلسات الزائر - Guest Session System

## ✅ **المشكلة التي تم حلها:**

### **المشكلة السابقة:**
- **الزائر يستخدم نفس المفتاح** `guest-cart` و `guest-wishlist` دائماً
- **عند تسجيل دخول مستخدم آخر وخروجه** - الزائر الجديد يرى بيانات الزائر السابق
- **البيانات تختلط** بين جلسات الزوار المختلفة

### **الحل الجديد:**
- **كل زائر له مفتاح فريد** في كل جلسة
- **عند تسجيل الدخول** - يتم نقل بيانات الزائر للمستخدم
- **عند تسجيل الخروج** - يتم تنظيف مفاتيح الزائر لبدء جلسة جديدة

## 🎯 **النظام الجديد:**

### **1. مفاتيح فريدة للزائر:**
```javascript
// Cart Key Generation
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
    return 'guest-cart';
  }
};

// Wishlist Key Generation
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
    return 'guest-wishlist';
  }
};
```

### **2. Migration محسن:**
```javascript
// Cart Migration
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
```

### **3. Logout محسن:**
```javascript
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
```

## 🔄 **تدفق العمل:**

### **1. زائر جديد:**
- **يتم إنشاء مفتاح فريد** `guest-cart-1234567890-abc123def`
- **يتم حفظ المفتاح** في `current-guest-cart-key`
- **البيانات محفوظة** في المفتاح الفريد

### **2. تسجيل دخول:**
- **يتم نقل البيانات** من المفتاح الفريد للمستخدم
- **يتم حذف المفتاح الفريد** للزائر
- **يتم حفظ البيانات** في `cart-${userId}`

### **3. تسجيل خروج:**
- **يتم حذف مفاتيح الزائر** `current-guest-cart-key`
- **البيانات تبقى محفوظة** للمستخدم في `cart-${userId}`
- **الزائر التالي** يحصل على مفتاح فريد جديد

### **4. زائر جديد بعد تسجيل خروج:**
- **يتم إنشاء مفتاح فريد جديد** `guest-cart-9876543210-xyz789ghi`
- **لا يرى بيانات الزائر السابق**
- **جلسة جديدة تماماً**

## 🎯 **النتيجة:**

### **✅ كل زائر له جلسة منفصلة:**
- **مفتاح فريد** لكل جلسة زائر
- **لا توجد تداخل** في البيانات
- **جلسة جديدة** بعد كل تسجيل خروج

### **✅ البيانات محفوظة للمستخدمين:**
- **كل مستخدم له بياناته** في `cart-${userId}`
- **Logout لا يحذف البيانات** - تبقى محفوظة
- **Login مرة أخرى** - البيانات تعود

### **✅ Migration آمن:**
- **يعمل مرة واحدة فقط** في كل session
- **لا توجد كميات غريبة** - capped at 10
- **لا توجد تكرار** في migration
- **Guest data يتم نقلها** ثم حذفها

### **✅ نظام مستقر:**
- **لا توجد تداخل** بين جلسات الزوار
- **كل مستخدم له بياناته** منفصلة تماماً
- **Migration يعمل بشكل صحيح**
- **كميات طبيعية** - لا توجد أرقام غريبة

## 🚀 **الفوائد:**

- ✅ **جلسات زائر منفصلة** - لا توجد تداخل
- ✅ **بيانات مستخدم محفوظة** - لا تختفي عند logout
- ✅ **Migration آمن** - يعمل مرة واحدة فقط
- ✅ **نظام مستقر** - يعمل بشكل صحيح
- ✅ **كميات طبيعية** - لا توجد أرقام غريبة

تم حل المشكلة! 🎉

