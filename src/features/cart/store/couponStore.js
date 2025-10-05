import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Coupon codes with their discount values
const COUPON_CODES = {
  'SAVE10': { discount: 10, type: 'percentage', description: '10% off your order' },
  'SAVE20': { discount: 20, type: 'percentage', description: '20% off your order' },
  'SAVE50': { discount: 50, type: 'percentage', description: '50% off your order' },
  'FIXED10': { discount: 10, type: 'fixed', description: '$10 off your order' },
  'FIXED25': { discount: 25, type: 'fixed', description: '$25 off your order' },
  'WELCOME': { discount: 15, type: 'percentage', description: '15% off for new customers' },
  'SUMMER': { discount: 30, type: 'percentage', description: '30% off summer sale' },
  'FLASH': { discount: 40, type: 'percentage', description: '40% off flash sale' }
};

const useCouponStore = create(
  persist(
    (set, get) => ({
      // State
      appliedCoupon: null,
      couponCode: '',
      couponError: null,
      couponSuccess: false,

      // Actions
      setCouponCode: (code) => {
        set({ couponCode: code, couponError: null, couponSuccess: false });
      },

      applyCoupon: (code) => {
        const trimmedCode = code?.trim().toUpperCase();
        
        if (!trimmedCode) {
          set({ 
            couponError: 'Please enter a coupon code',
            couponSuccess: false 
          });
          return false;
        }

        if (COUPON_CODES[trimmedCode]) {
          const coupon = {
            code: trimmedCode,
            ...COUPON_CODES[trimmedCode]
          };
          
          set({ 
            appliedCoupon: coupon,
            couponCode: '',
            couponError: null,
            couponSuccess: true 
          });
          
          setTimeout(() => {
            set({ couponSuccess: false });
          }, 3000);
          
          return true;
        } else {
          set({ 
            couponError: 'Invalid coupon code',
            couponSuccess: false 
          });
          return false;
        }
      },

      removeCoupon: () => {
        set({ 
          appliedCoupon: null,
          couponCode: '',
          couponError: null,
          couponSuccess: false 
        });
      },

      clearCouponMessages: () => {
        set({ 
          couponError: null,
          couponSuccess: false 
        });
      },

      calculateDiscount: (subtotal) => {
        const { appliedCoupon } = get();
        
        if (!appliedCoupon) return 0;
        
        if (appliedCoupon.type === 'percentage') {
          return (subtotal * appliedCoupon.discount) / 100;
        } else {
          return Math.min(appliedCoupon.discount, subtotal);
        }
      },

      getAvailableCoupons: () => {
        return Object.keys(COUPON_CODES).map(code => ({
          code,
          ...COUPON_CODES[code]
        }));
      },

      clearCouponOnBrowserClose: () => {
      
        window.addEventListener('beforeunload', () => {
        
          if (performance.navigation.type === 1) {
            removeCoupon();
          }
        });
      }
    }),
    {
      name: 'coupon-storage', 
      partialize: (state) => ({ 
        appliedCoupon: state.appliedCoupon 
      }), 
    }
  )
);

export default useCouponStore;
