import React, { useState, useEffect } from 'react';

const ServiceSection = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative bg-white py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free and Fast Delivery */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-400">
                <img src="/src/assets/home assets/delivery.svg" alt="delivery" className="w-12 h-12 px-2 bg-black rounded-full" />
              </div>
            </div>
            <h3 className="text-lg font-bold font-poppins text-black uppercase tracking-wide">
              FREE AND FAST DELIVERY
            </h3>
            <p className="text-sm text-black font-poppins">
              Free delivery for all orders over $140
            </p>
          </div>

          {/* 24/7 Customer Service */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-400">
                <img src="/src/assets/home assets/service.svg" alt="customer" className="w-12 h-12 px-2 bg-black rounded-full" />
              </div>
            </div>
            <h3 className="text-lg font-bold  font-poppins text-black uppercase tracking-wide">
              24/7 CUSTOMER SERVICE
            </h3>
            <p className="text-sm font-poppins text-black">
              Friendly 24/7 customer support
            </p>
          </div>

          {/* Money Back Guarantee */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-400">
                <img src="/src/assets/home assets/secure.svg" alt="money" className="w-12 h-12 px-2 bg-black rounded-full" />
              </div>
            </div>
            <h3 className="text-lg font-bold font-poppins text-black uppercase tracking-wide">
              MONEY BACK GUARANTEE
            </h3>
            <p className="text-sm font-poppins text-black">
              We return money within 30 days
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors duration-200 z-50"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
          </svg>
        </button>
      )}
    </div>
  );
};

export default ServiceSection;
