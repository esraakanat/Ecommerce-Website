import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import CategoryLoading from "../../../../shared/components/loading/CategoryLoading";
import { useCategories } from "../../hooks/useCategories";
import cellPhoneIcon from "../../../../assets/home-assets/Category-CellPhone.svg";
import computerIcon from "../../../../assets/home-assets/Category-Computer.svg";
import smartWatchIcon from "../../../../assets/home-assets/SmartWatch.svg";
import cameraIcon from "../../../../assets/home-assets/Category-Camera.svg";
import headphoneIcon from "../../../../assets/home-assets/Category-Headphone.svg";
import gameIcon from "../../../../assets/home-assets/Game.svg";


const CategoryFilter = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const location = useLocation();
  const currentCategory = new URLSearchParams(location.search).get("category");
  
  // React Query hook for categories
  const { 
    data: categoriesData, 
    isLoading: loading, 
    error, 
    refetch: refetchCategories 
  } = useCategories();
  
  // Extract categories from query result
  const categories = categoriesData?.categories || [];

  // Set default hover to furniture category when categories are loaded
  useEffect(() => {
    if (categories.length > 0) {
      const furnitureCategory = categories.find(cat => 
        cat.name.toLowerCase().includes("furniture")
      );
      if (furnitureCategory) {
        setHoveredCard(furnitureCategory.id);
      }
    }
  }, [categories]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  // Function to retry loading categories
  const handleRetry = () => {
    refetchCategories();
  };

  const handleMouseEnter = (cardId) => {
    // Clear any existing timeout when entering a new category
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHoveredCard(cardId);
  };

  const handleMouseLeave = () => {
    // Add delay before returning to furniture category
    const timeout = setTimeout(() => {
      const furnitureCategory = categories.find(cat => 
        cat.name.toLowerCase().includes("furniture")
      );
      if (furnitureCategory) {
        setHoveredCard(furnitureCategory.id);
      }
    }, 300); // 300ms delay
    
    setHoverTimeout(timeout);
  };

  if (loading) {
    return <CategoryLoading />;
  }

  if (error) {
    return (
      <div className="bg-white py-8">
        <div className="px-8 py-8 max-w-8xl mx-auto">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Categories</h3>
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
    <div className="bg-white py-8">
      <div className="px-8 py-8 max-w-8xl mx-auto"> 
        {/* عنوان + خط احمر */}
        <div className="flex items-center mb-4 ml-8">
          <div className="w-4 h-7 bg-[#DB4444] mr-2 rounded-sm"></div>
          <span className="text-sm font-semibold font-poppins text-[#DB4444]">Categories</span>
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold font-inter text-gray-900 mb-8 ml-8 tracking-wider">
          Browse By Category
        </h2>

        {/* الكروت موزعين بالنص */}
<div className="
  grid 
  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
  gap-6 sm:gap-8 md:gap-4 lg:gap-4
  justify-items-center
">

  {categories.map((cat) => (
    <Link
      key={cat.id}
      to={`/products?category=${encodeURIComponent(cat.name)}`}
      onMouseEnter={() => handleMouseEnter(cat.id)}
      onMouseLeave={handleMouseLeave}
      className={`w-[180px] h-[165px] rounded-md flex flex-col items-center justify-center border transition-all duration-200 ${
        hoveredCard === cat.id
          ? "bg-[#DB4444] text-white"
          : "bg-white border-gray-300 text-gray-700"
      }`}
    >
      <div className="mb-2 text-2xl">
        {/* الأيقونات حسب الكاتيجوري */}
        {cat.name.toLowerCase().includes("clothes") && (
          <img 
            src={computerIcon} 
            alt="clothes" 
            className={`w-10 h-10 transition-all duration-200 ${
              hoveredCard === cat.id 
                ? "filter brightness-0 invert" 
                : "filter brightness-0"
            }`} 
          />
        )}
        {cat.name.toLowerCase().includes("electronics") && (
          <img 
            src={smartWatchIcon} 
            alt="electronics" 
            className={`w-10 h-10 transition-all duration-200 ${
              hoveredCard === cat.id 
                ? "filter brightness-0 invert" 
                : "filter brightness-0"
            }`} 
          />
        )}
        {cat.name.toLowerCase().includes("furniture") && (
          <img 
            src={cameraIcon} 
            alt="furniture" 
            className={`w-10 h-10 transition-all duration-200 ${
              hoveredCard === cat.id 
                ? "filter brightness-0 invert" 
                : "filter brightness-0"
            }`} 
          />
        )}
        {cat.name.toLowerCase().includes("shoes") && (
          <img 
            src={headphoneIcon} 
            alt="shoes" 
            className={`w-10 h-10 transition-all duration-200 ${
              hoveredCard === cat.id 
                ? "filter brightness-0 invert" 
                : "filter brightness-0"
            }`} 
          />
        )}
        {cat.name.toLowerCase().includes("miscellaneous") && (
          <img 
            src={gameIcon} 
            alt="Miscellaneous" 
            className={`w-10 h-10 transition-all duration-200 ${
              hoveredCard === cat.id 
                ? "filter brightness-0 invert" 
                : "filter brightness-0"
            }`} 
          />
        )}
      </div>
      <span className="text-sm font-medium text-center">{cat.name}</span>
    </Link>
  ))}
</div>
</div>
    </div>
  );
};

export default CategoryFilter;
