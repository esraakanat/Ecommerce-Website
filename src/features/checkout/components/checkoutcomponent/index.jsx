import React, { useState } from 'react';
import { useUserCart } from '../../../cart/hooks/useUserCart';
import useCouponStore from '../../../cart/store/couponStore';
import { toast } from 'react-toastify';
import SuccessModal from '../../../../shared/components/SuccessModal';
import bKashIcon from '../../../../assets/check out assets/image 30.svg';
import visaIcon from '../../../../assets/check out assets/image 31.svg';
import mastercardIcon from '../../../../assets/check out assets/image 32.svg';
import nagadIcon from '../../../../assets/check out assets/image 33.svg';

const Checkoutcomponent = () => {
  const { items, getTotalPrice, clearCart } = useUserCart();
  const { 
    appliedCoupon, 
    couponCode, 
    couponError, 
    couponSuccess,
    setCouponCode, 
    applyCoupon, 
    removeCoupon, 
    calculateDiscount,
    clearCouponMessages 
  } = useCouponStore();
  
  const [formData, setFormData] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    townCity: '',
    phoneNumber: '',
    emailAddress: '',
    saveInfo: true
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [inputCode, setInputCode] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    const success = applyCoupon(inputCode);
    if (success) setInputCode('');
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setInputCode('');
  };

  const handlePlaceOrder = () => {
    if (!formData.firstName || !formData.streetAddress || !formData.townCity || !formData.phoneNumber || !formData.emailAddress) {
      toast.error('Please fill in all required fields', { position: "top-right", autoClose: 3000 });
      return;
    }

    const newOrderNumber = 'ORD-' + Date.now().toString().slice(-6);
    setOrderNumber(newOrderNumber);
    setShowSuccessModal(true);
    clearCart();
    removeCoupon();
    setFormData({
      firstName: '',
      companyName: '',
      streetAddress: '',
      apartment: '',
      townCity: '',
      phoneNumber: '',
      emailAddress: '',
      saveInfo: true
    });

  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setOrderNumber('');
  };

  const subtotal = getTotalPrice();
  const shipping = 0;
  const couponDiscount = calculateDiscount(subtotal);
  const total = subtotal + shipping - couponDiscount;

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="text-sm">
            <span className="text-gray-500">Account</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500">My Account</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500">Product</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500">View Cart</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-black font-medium">CheckOut</span>
          </nav>
        </div>

        {/* Grid: sm/md vertical, lg horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left Section - Billing Details */}
          <div className="w-full">
            <h2 className="text-2xl text-black font-inter font-base mb-6">Billing Details</h2>
            <form className="space-y-4 w-full">
              {[
                { label: "First Name *", name: "firstName", type: "text", required: true },
                { label: "Company Name", name: "companyName", type: "text", required: false },
                { label: "Street Address *", name: "streetAddress", type: "text", required: true },
                { label: "Apartment, floor, etc. (optional)", name: "apartment", type: "text", required: false },
                { label: "Town/City *", name: "townCity", type: "text", required: true },
                { label: "Phone Number *", name: "phoneNumber", type: "tel", required: true },
                { label: "Email Address *", name: "emailAddress", type: "email", required: true },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-[14px] font-base font-poppins text-gray-500 mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-none bg-[#F5F5F5] rounded"
                    required={field.required}
                  />
                </div>
              ))}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                  style={{ accentColor: '#DB4444' }}
                />
                <label className="ml-2 text-sm text-gray-700">
                  Save this information for faster check-out next time
                </label>
              </div>
            </form>
          </div>

          {/* Right Section - Order & Payment */}
          <div className="w-full mt-6   md:mt-16  lg:max-w-md lg:ml-6  ">
            <div className="bg-white border-none p-6 w-full">
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.images?.[0] || '/src/assets/cart assets/g27cq4-500x500 1.png'}
                        alt={item.title}
                        className="w-10 h-10 object-cover"
                      />
                      <span className="font-base text-black font-poppins text-[12px]">{item.title}</span>
                    </div>
                    <span className="font-base text-black font-poppins text-[14px]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Summary */}
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="font-base text-black font-poppins text-[12px]">Subtotal:</span>
                  <span className="font-base text-black font-poppins text-[12px]">${subtotal.toFixed(2)}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span className="font-base font-poppins text-[12px]">Coupon Discount ({appliedCoupon?.code}):</span>
                    <span className="font-base font-poppins text-[12px]">-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-200">
                  <span className="font-base text-black font-poppins text-[12px]">Shipping:</span>
                  <span className="font-base text-black font-poppins text-[12px]">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-md font-base text-black font-poppins text-[12px]">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                    style={{ accentColor: 'black' }}
                  />
                  <label className="ml-2 text-black font-base font-poppins text-[12px]">Bank</label>
                  <div className="ml-4 flex space-x-2">
                    <img src={bKashIcon} alt="bKash" className="h-4" />
                    <img src={visaIcon} alt="Visa" className="h-4" />
                    <img src={mastercardIcon} alt="Mastercard" className="h-4" />
                    <img src={nagadIcon} alt="Nagad" className="h-4" />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500 focus:ring-2"
                    style={{ accentColor: '#DB4444' }}
                  />
                  <label className="ml-2 text-black font-base font-poppins text-[12px]">Cash on delivery</label>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mb-6">
                {!appliedCoupon ? (
                  <form onSubmit={handleCouponSubmit} className="flex space-x-2">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Coupon Code"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="w-full px-4 py-2 border text-sm border-black rounded"
                      />
                      {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
                      {couponSuccess && <p className="text-green-500 text-xs mt-1">Coupon applied successfully!</p>}
                    </div>
                    <button 
                      type="submit"
                      className="px-6 py-2 bg-[#DB4444] text-white rounded hover:bg-red-600 font-base text-[14px] font-poppins"
                    >
                      Apply Coupon
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded">
                    <div>
                      <span className="text-green-600 text-sm font-medium">
                        Coupon Applied: {appliedCoupon.code}
                      </span>
                      <p className="text-green-600 text-xs">{appliedCoupon.description}</p>
                    </div>
                    <button onClick={handleRemoveCoupon} className="text-red-500 hover:text-red-700 text-sm underline">Remove</button>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-2">
                  <p>Test coupons: SAVE10, SAVE20, SAVE50, WELCOME, SUMMER, FLASH</p>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-[#DB4444] text-white py-3 px-8 rounded hover:bg-red-600 font-base text-[16px] font-poppins text-center block"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        title="Order Placed Successfully!"
        message="Your payment has been confirmed and your order is being processed."
        orderNumber={orderNumber}
      />
    </div>
  );
};

export default Checkoutcomponent;
