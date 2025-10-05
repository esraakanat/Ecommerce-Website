import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUserCart } from "../../hooks/useUserCart";
import useCouponStore from "../../store/couponStore";
import useAuthStore from "../../../auth/store";

const CartSummary = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useUserCart();
  const { isAuthenticated } = useAuthStore();
  const {  appliedCoupon, couponCode,  couponError, couponSuccess, setCouponCode, applyCoupon, removeCoupon, 
    calculateDiscount,clearCouponMessages } = useCouponStore();
  
  const [inputCode, setInputCode] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    const success = applyCoupon(inputCode);
    if (success) {
      setInputCode('');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setInputCode('');
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    
    setIsUpdating(true);
    updateQuantity(itemId, newQuantity);
    
    setTimeout(() => {
      setIsUpdating(false);
    }, 500);
  };

  const addOffersToCartItems = (cartItems) => {
    return cartItems.map(item => {
      if (item.hasOffer) {
        return item;
      }
      
      const shouldHaveOffer = Math.random() < 0.3;
      
      if (shouldHaveOffer) {
        const discountPercent = [40, 35, 30, 25][Math.floor(Math.random() * 4)];
        const originalPrice = item.price;
        const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
        
        return {
          ...item,
          hasOffer: true,
          originalPrice,
          discountedPrice,
          discountPercent
        };
      }
      
      return item;
    });
  };

  const itemsWithOffers = addOffersToCartItems(items);

  const calculateTotals = () => {
    let subtotal = 0;
    let totalDiscount = 0;
    
    itemsWithOffers.forEach(item => {
      if (item.hasOffer) {
        subtotal += item.discountedPrice * item.quantity;
        totalDiscount += (item.originalPrice - item.discountedPrice) * item.quantity;
      } else {
        subtotal += item.price * item.quantity;
      }
    });
    
    const couponDiscount = calculateDiscount(subtotal);
    const finalTotal = subtotal - couponDiscount;
    
    return {
      subtotal,
      totalDiscount,
      couponDiscount,
      total: finalTotal
    };
  };

  const { subtotal, totalDiscount, couponDiscount, total } = calculateTotals();
  const shipping = 0;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Link
          to="/products"
          className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
      <div className=" py-8 ">
        <p className="text-gray-900 text-sm ">
          <Link to="/" className="text-gray-500 transition-colors">Home</Link> /cart
        </p>
      </div>

        <div className="my-8 w-full ">
          <div className="grid grid-cols-4 px-6 py-4 mb-12 bg-white border shadow-md border-white rounded-lg font-poppins font-medium text-black text-sm">
            <div className="text-center">Product</div>
            <div className="text-center">Price</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">Subtotal</div>
          </div>

          <div className="space-y-4">
            {itemsWithOffers.map((item) => (
              <div
                key={item.id}
                className=" mb-12 bg-white border shadow-md border-white rounded-lg font-poppins font-medium text-black text-sm p-4"
              >
                <div className="grid grid-cols-4 items-center text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={item.images?.[0] || "/src/assets/cart assets/g27cq4-500x500 1.png"}
                        alt={item.title}
                        className="w-14 h-14 md:w-16 md:h-16 object-contain  rounded"
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute -top-1 -left-1 md:-top-2 md:-left-2 w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <svg
                          className="w-2 h-2 md:w-3 md:h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 
                            111.414 1.414L11.414 10l4.293 4.293a1 1 0 
                            01-1.414 1.414L10 11.414l-4.293 4.293a1 1 
                            0 01-1.414-1.414L8.586 10 4.293 
                            5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <span className="font-base text-black font-poppins text-[12px] truncate max-w-[120px] md:max-w-none">{item.title}</span>
                  </div>

                  <div className="font-base text-black font-poppins text-[14px] ml-12 md:ml-16 lg:ml-32">
                    {item.hasOffer ? ( 
                      <div className="flex items-center gap-2">
                        <span className="text-black font-poppins  text-[14px]">
                          ${item.discountedPrice}
                        </span>
                        <span className="text-[#DB4444] text-[12px] line-through">
                          ${item.originalPrice}
                        </span>
                      </div>
                    ) : (
                      <span>${item.price || 'N/A'}</span>
                    )}
                  </div>

                  <div className="flex justify-center">
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                        }
                        className="w-12 h-8 text-center text-sm border-0 focus:ring-0 focus:outline-none bg-transparent"
                        min="1"
                        style={{ 
                          appearance: 'none',
                          MozAppearance: 'textfield',
                          WebkitAppearance: 'none'
                        }}
                      />
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-4 h-4 flex items-center justify-center text-gray-600 hover:text-gray-800"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 6.414 6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                          className="w-4 h-4 flex items-center justify-center text-gray-600 hover:text-gray-800"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L10 13.586l3.293-3.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <motion.div 
                    className="font-base text-black font-poppins text-[12px] text-center"
                    animate={isUpdating ? {
                      scale: [1, 1.1, 1],
                      color: ["#000000", "#3b82f6", "#000000"]
                    } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {item.hasOffer ? (
                      <div className="flex flex-col items-center gap-1">
                        <motion.span 
                          className="text-black font-poppins"
                          animate={isUpdating ? {
                            scale: [1, 1.2, 1],
                            y: [0, -2, 0]
                          } : {}}
                          transition={{ duration: 0.4 }}
                        >
                          ${(item.discountedPrice * item.quantity).toFixed(2)}
                        </motion.span>
                       
                      </div>
                    ) : (
                      <motion.span
                        animate={isUpdating ? {
                          scale: [1, 1.2, 1],
                          y: [0, -2, 0]
                        } : {}}
                        transition={{ duration: 0.4 }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </motion.span>
                    )}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
          <Link
            to="/products"
            onClick={() => {
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
              });
            }}
            className="px-8 py-4 border border-[#00000080] rounded text-sm font-medium text-black hover:bg-gray-50 text-center"
          >
            Return To Shop
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 border border-[#00000080] rounded text-sm font-medium text-black hover:bg-gray-50"
          >
            Update Cart
          </button>
        </div>

        <div className="mt-12 flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex flex-col gap-4">
            {!appliedCoupon ? (
              <form onSubmit={handleCouponSubmit} className="flex flex-row gap-4 items-start">
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="px-4 py-4 border text-sm border-black max-w-lg rounded w-48 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  {couponError && (
                    <p className="text-red-500 text-xs">{couponError}</p>
                  )}
                  {couponSuccess && (
                    <p className="text-green-500 text-xs">Coupon applied successfully!</p>
                  )}
                </div>
                <button 
                  type="submit"
                  className="px-6 py-4 bg-[#DB4444] text-white rounded hover:bg-red-600 font-base text-[14px] font-poppins"
                >
                  Apply Coupon
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded">
                  <span className="text-green-600 text-sm font-medium">
                    Coupon Applied: {appliedCoupon.code}
                  </span>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-red-500 hover:text-red-700 text-sm underline"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-green-600 text-xs">
                  {appliedCoupon.description}
                </p>
              </div>
            )}
            
            <div className="text-xs text-gray-500">
             
            </div>
          </div>

          <motion.div 
            className="border border-black  rounded-lg p-6 w-full sm:w-1/2 lg:w-1/3"
            animate={isUpdating ? {
              scale: [1, 1.02, 1],
              boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 0 20px rgba(59, 130, 246, 0.3)", "0 0 0 rgba(0,0,0,0)"]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-medium font-poppins  text-black mb-4">Cart Total</h3>
            <div className="space-y-6 text-sm  font-poppins  text-black">
              <motion.div 
                className="flex justify-between"
                animate={isUpdating ? {
                  scale: [1, 1.05, 1]
                } : {}}
                transition={{ duration: 0.3 }}
              >
                <span>Subtotal:</span>
                <motion.span
                  animate={isUpdating ? {
                    scale: [1, 1.2, 1],
                    color: ["#000000", "#3b82f6", "#000000"],
                    y: [0, -3, 0]
                  } : {}}
                  transition={{ duration: 0.4 }}
                >
                  ${subtotal.toFixed(2)}
                </motion.span>
              </motion.div>
              {totalDiscount > 0 && (
                <motion.div 
                  className="flex justify-between text-green-600"
                  animate={isUpdating ? {
                    scale: [1, 1.05, 1]
                  } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <span>Product Discounts:</span>
                  <motion.span
                    animate={isUpdating ? {
                      scale: [1, 1.2, 1],
                      y: [0, -3, 0]
                    } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    -${totalDiscount.toFixed(2)}
                  </motion.span>
                </motion.div>
              )}
              {couponDiscount > 0 && (
                <motion.div 
                  className="flex justify-between text-blue-600"
                  animate={isUpdating ? {
                    scale: [1, 1.05, 1]
                  } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <span>Coupon Discount ({appliedCoupon?.code}):</span>
                  <motion.span
                    animate={isUpdating ? {
                      scale: [1, 1.2, 1],
                      y: [0, -3, 0]
                    } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    -${couponDiscount.toFixed(2)}
                  </motion.span>
                </motion.div>
              )}
              <div className="flex justify-between border-t border-gray-400 pt-4">
                <span>Shipping:</span>
                <span className="text-black">Free</span>
              </div>
              <motion.div 
                className="border-t border-gray-400 pt-3 flex justify-between text-[16px] font-base font-poppins"
                animate={isUpdating ? {
                  scale: [1, 1.05, 1],
                  backgroundColor: ["transparent", "rgba(59, 130, 246, 0.1)", "transparent"]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                <span>Total:</span>
                <motion.span
                  animate={isUpdating ? {
                    scale: [1, 1.3, 1],
                    color: ["#000000", "#3b82f6", "#000000"],
                    y: [0, -5, 0],
                    fontWeight: ["normal", "bold", "normal"]
                  } : {}}
                  transition={{ duration: 0.6 }}
                  className="text-lg font-bold"
                >
                  ${total.toFixed(2)}
                </motion.span>
              </motion.div>
            </div>
            {isAuthenticated ? (
               <Link
                 to="/checkout"
                 onClick={() => {
                   window.scrollTo({
                     top: 0,
                     left: 0,
                     behavior: 'smooth'
                   });
                 }}
                 className="w-full mt-6 bg-[#DB4444] text-white py-3 rounded hover:bg-red-600 font-base text-[16px] font-poppins text-center block"
               >
                 Proceed to checkout
               </Link>
             ) : (
               <div className="w-full mt-6">
                 <Link
                   to="/checkout"
                   onClick={() => {
                     window.scrollTo({
                       top: 0,
                       left: 0,
                       behavior: 'smooth'
                     });
                   }}
                   className="w-full bg-[#DB4444] text-white py-3 rounded hover:bg-red-600 font-base text-[16px] font-poppins text-center block"
                 >
                   Proceed to checkout
                 </Link>
                 <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                   <div className="flex items-center">
                     <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                     </svg>
                     <p className="text-yellow-800 text-sm font-medium">
                       You need to log in to proceed to checkout.
                     </p>
                   </div>
                 </div>
               </div>
             )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
