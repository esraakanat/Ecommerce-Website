import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useHeroSection } from "../../hooks/useHeroSection";
import appleLogo from "../../../../assets/home-assets/1200px-Apple_gray_logo 1.svg";
import heroImage from "../../../../assets/home-assets/hero.png";
import arrowIcon from "../../../../assets/home-assets/Vector (3).svg";

const HeroSection = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // React Query hook for hero section data
  const { 
    data: heroData, 
    isLoading: loading, 
    error, 
    refetch: refetchHero 
  } = useHeroSection();
  
  // Extract categories from query result
  const categories = heroData?.categories || [];

  // Handle retry for failed requests
  const handleRetry = () => {
    refetchHero();
  };

  // Error state
  if (error) {
    return (
      <div className="flex flex-col md:flex-row w-full bg-white relative">
        <div className="flex-1 relative bg-gray-100 mt-4 md:mt-6 mx-4 md:ml-24 md:mr-56 rounded-xl overflow-hidden 
          min-h-[250px] md:h-[344px] md:w-[892px] flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Hero Section</h3>
            <p className="text-gray-500 mb-4">We couldn't load the categories. Please try again.</p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="flex flex-col md:flex-row w-full bg-white relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* === Overlay when Sidebar Open === */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* === Sidebar Drawer for Mobile === */}
      <motion.div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        initial={{ x: -256 }}
        animate={{ x: sidebarOpen ? 0 : -256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* زر إغلاق */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={() => setSidebarOpen(false)}
        >
          ✕
        </button>

        {/* عناصر القائمة */}
        <nav className="mt-12 space-y-1 px-4">
          {/* All Products */}
          <Link
            to="/products"
            className="flex items-center justify-between py-2 hover:bg-gray-50 px-3 rounded cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="text-sm font-poppins text-black">All Products</span>
            <svg
              className="w-4 h-4 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          
          {/* Categories from API */}
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="flex items-center justify-between py-2 hover:bg-gray-50 px-3 rounded cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-sm font-poppins text-black">{cat.name}</span>
              {cat.name.toLowerCase().includes('clothes') && (
                <svg
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </Link>
          ))}
        </nav>
      </motion.div>

      {/* === Sidebar (Desktop Only) === */}
      <motion.div 
        className="hidden md:block w-64 bg-white border-r border-gray-200 pl-16 pt-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <nav className="space-y-1">
          {/* All Products */}
          <Link
            to="/products"
            className="flex items-center justify-between py-2 hover:bg-gray-50 px-3 rounded cursor-pointer"
          >
            <span className="text-sm font-poppins text-black">All Products</span>
            <svg
              className="w-4 h-4 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          
          {/* Categories from API */}
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="flex items-center justify-between py-2 hover:bg-gray-50 px-3 rounded cursor-pointer"
            >
              <span className="text-sm font-poppins text-black">{cat.name}</span>
              {cat.name.toLowerCase().includes('clothes') && (
                <svg
                  className="w-4 h-4 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </Link>
          ))}
        </nav>
      </motion.div>

      <motion.div 
        className="relative bg-black  sm:mt-6 md:mt-12 mx-4  sm:mx-8 md:mx-12 lg:mr-12 xl:mr-24
  rounded-sm overflow-hidden w-full  
  min-h-[150px] sm:min-h-[320px] md:min-h-[280px] lg:min-h-[320px] xl:min-h-[380px] 
  flex flex-col sm:flex-row items-center px-6 sm:px-8 md:px-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >

  {/* النصوص */}
  <motion.div 
    className="sm:basis-[40%] xl:basis-1/2 flex flex-col justify-center items-start text-left py-6 sm:py-0 sm:pr-6 lg:ml-8"
    initial={{ x: -50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
  >
    <motion.div 
      className="flex items-center mb-3"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
    >
      <motion.img
        src={appleLogo}
        alt="Apple"
        className="h-6 w-6 sm:h-7 sm:w-7 lg:h-11 lg:w-11 mr-2"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
      />
      <motion.span 
        className="text-white text-xs sm:text-sm md:text-base font-poppins tracking-wider"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
      >
        iPhone 14 Series
      </motion.span>
    </motion.div>

    <motion.h2 
      className="text-white lg:py-4 text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold font-poppins tracking-wider"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
    >
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1.6 }}
      >
        Up to 10%
      </motion.div>
      <motion.div 
        className="mt-4"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1.8 }}
      >
        off Voucher
      </motion.div>
    </motion.h2>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 2.0 }}
    >
      <Link
        to="/products"
        className="mt-4 inline-flex items-center text-[#FAFAFA] text-md sm:text-base font-poppins underline hover:text-gray-300 transition-colors tracking-wide underline-offset-8"
      >
        Shop Now
        <motion.img
          src={arrowIcon}
          alt="Arrow"
          className="h-5 w-5 sm:h-4 mt-2 sm:w-4 ml-2 brightness-0 invert"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        />
      </Link>
    </motion.div>
  </motion.div>

  {/* صورة الآيفون */}
  <motion.div 
    className="sm:basis-[60%] xl:basis-1/2 flex justify-center items-center w-full mt-6 sm:mt-0"
    initial={{ x: 50, opacity: 0, scale: 0.8 }}
    animate={{ x: 0, opacity: 1, scale: 1 }}
    transition={{ duration: 1.0, ease: "easeOut", delay: 0.8 }}
  >
    <motion.img
      src={heroImage}
      alt="iPhone 14"
      className="w-full max-w-[260px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px] xl:max-w-[540px] object-contain"
      initial={{ y: 50, opacity: 0, rotate: 5 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 1.0 }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 2,
        transition: { duration: 0.3 }
      }}
    />
  </motion.div>

  {/* نقاط التبديل */}
  <motion.div 
    className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3"
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut", delay: 2.2 }}
  >
    {[0, 1, 2, 3, 4].map((index) => (
      <motion.div
        key={index}
        className={`w-3 h-3 rounded-full ${index === 2 ? 'bg-red-500 border-2 border-white' : 'bg-gray-400'}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.3, 
          ease: "easeOut", 
          delay: 2.4 + (index * 0.1) 
        }}
        whileHover={{ 
          scale: 1.2,
          transition: { duration: 0.2 }
        }}
      />
    ))}
  </motion.div>
</motion.div>

    </motion.div>
  );
};

export default HeroSection;
