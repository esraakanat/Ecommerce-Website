import { useState } from "react";
import { Link } from "react-router-dom";
import { useHeroSection } from "../../hooks/useHeroSection";
import appleLogo from "../../../../assets/home assets/1200px-Apple_gray_logo 1.svg";
import heroImage from "../../../../assets/home assets/hero.png";

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
    <div className="flex flex-col md:flex-row w-full bg-white relative">
      {/* === Overlay when Sidebar Open === */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* === Sidebar Drawer for Mobile === */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
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
      </div>

      {/* === Sidebar (Desktop Only) === */}
      <div className="hidden md:block w-64 bg-white border-r border-gray-200 pl-16 pt-6">
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
      </div>

      {/* === زر الهامبرغر خارج البانر (يظهر فقط على الموبايل) === */}
      <div className="flex md:hidden px-4 mt-4">
        <button
          className="text-black"
          onClick={() => setSidebarOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* === Main Banner === */}
      <div className="flex-1 relative bg-black mt-4 md:mt-6 mx-4 md:ml-24 md:mr-56 rounded-xl overflow-hidden 
        min-h-[250px] md:h-[344px] md:w-[892px] flex items-center justify-between">
        
        {/* النصوص على يسار البانر */}
        <div className="absolute top-10 md:top-6 left-6 z-10">
          <div className="flex items-center mb-4">
            <img
              src={appleLogo}
              alt="Apple"
              className="h-6 w-6 md:h-10 md:w-10 mr-2"
            />
            <span className="text-white text-xs md:text-sm font-poppins">
              iPhone 14 Series
            </span>
          </div>

          <div className="mb-3 md:mb-4">
            <div className="text-white text-2xl md:text-5xl font-bold font-poppins leading-tight">
              Up to 10%
            </div>
            <div className="text-white text-2xl md:text-5xl font-poppins mt-1">
              off Voucher
            </div>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center text-[#FAFAFA] text-xs md:text-sm font-poppins underline hover:text-gray-300 transition-colors"
          >
            Shop Now
            <svg
              className="h-3 w-3 md:h-4 md:w-4 ml-2"
              fill="white"
              viewBox="0 0 8 13"
            >
              <path
                d="M4.95 6.63597L0 1.68597L1.414 0.271973L7.778 6.63597L1.414 13L0 11.586L4.95 6.63597Z"
                fill="white"
              />
            </svg>
          </Link>
        </div>

 {/* صورة الآيفون */}
<div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 w-full max-w-[400px] md:max-w-[350px] lg:max-w-[300px]">
  <div className="relative w-full aspect-[16/9]">
    <img
      src={heroImage}
      alt="iPhone 14"
      className="w-full h-full object-contain"
    />
    <div className="absolute inset-0 bg-purple-500 opacity-20 blur-2xl rounded-xl"></div>
  </div>
</div>




        {/* نقاط التبديل */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
