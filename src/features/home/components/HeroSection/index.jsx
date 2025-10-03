import { useState } from "react";
import { Link } from "react-router-dom";
import { useHeroSection } from "../../hooks/useHeroSection";
import appleLogo from "../../../../assets/home-assets/1200px-Apple_gray_logo 1.svg";
import heroImage from "../../../../assets/home-assets/hero.png";

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

      <div className="relative bg-black mt-4 sm:mt-6 mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-24 
  rounded-md overflow-hidden w-full 
  min-h-[250px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px] xl:min-h-[480px] 
  flex flex-col sm:flex-row items-center px-6 sm:px-8 md:px-10">

  {/* النصوص */}
  <div className="sm:basis-[40%] xl:basis-1/2 flex flex-col justify-center items-start text-left py-6 sm:py-0 sm:pr-6">
    <div className="flex items-center mb-3">
      <img
        src={appleLogo}
        alt="Apple"
        className="h-6 w-6 sm:h-7 sm:w-7 lg:h-9 lg:w-9 mr-2"
      />
      <span className="text-white text-xs sm:text-sm md:text-base font-poppins">
        iPhone 14 Series
      </span>
    </div>

    <h2 className="text-white text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-poppins leading-tight">
      Up to 10% <br className="hidden sm:block" /> off Voucher
    </h2>

    <Link
      to="/products"
      className="mt-4 inline-flex items-center text-[#FAFAFA] text-sm sm:text-base font-poppins underline hover:text-gray-300 transition-colors"
    >
      Shop Now
      <svg
        className="h-3 w-3 sm:h-4 sm:w-4 ml-2"
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
  <div className="sm:basis-[60%] xl:basis-1/2 flex justify-center items-center w-full mt-6 sm:mt-0">
    <img
      src={heroImage}
      alt="iPhone 14"
      className="w-full max-w-[260px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px] xl:max-w-[540px] object-contain"
    />
  </div>

  {/* نقاط التبديل */}
  <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
