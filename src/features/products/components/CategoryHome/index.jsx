import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CategoryLoading from "../../../../shared/components/loading/CategoryLoading";
import { useCategories } from "../../hooks/useCategories";


const CategoryFilter = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
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

  // Function to retry loading categories
  const handleRetry = () => {
    refetchCategories();
  };

  const handleMouseEnter = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  if (loading) {
    return <CategoryLoading />;
  }

  if (error) {
    return (
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
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
      <div className="max-w-7xl mx-auto px-4">
        {/* عنوان + خط احمر */}
        <div className="flex items-center mb-4 ml-12">
          <div className="w-3 h-8 bg-[#DB4444] mr-2 rounded-sm"></div>
          <span className="text-sm font-medium font-poppins text-[#DB4444]">Categories</span>
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold font-inter text-gray-900 mb-8 ml-12">
          Browse By Category
        </h2>

        {/* الكروت موزعين بالنص */}
<div className="
  grid 
  grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
  gap-6 sm:gap-8 md:gap-12 lg:gap-16 
  justify-items-center
">
  {/* خيار All Products */}
  <Link
    to="/products"
    onMouseEnter={() => handleMouseEnter('all')}
    onMouseLeave={handleMouseLeave}
    className={`w-[190px] h-[175px] rounded-md flex flex-col items-center justify-center border transition-all duration-200 ${
      hoveredCard === 'all' 
        ? "bg-[#DB4444] text-white"
        : "bg-white border-gray-300 text-gray-700"
    }`}
  >
    <div className="mb-2 text-2xl">
      <img 
        src={"/src/assets/home assets/Category-CellPhone.svg"} 
        alt="all products" 
        className="w-10 h-10 filter brightness-0 hover:invert transition-all duration-200" 
      />
    </div>
    <span className="text-sm font-medium text-center">All Products</span>
  </Link>

  {categories.map((cat) => (
    <Link
      key={cat.id}
      to={`/products?category=${encodeURIComponent(cat.name)}`}
      onMouseEnter={() => handleMouseEnter(cat.id)}
      onMouseLeave={handleMouseLeave}
      className={`w-[190px] h-[175px] rounded-md flex flex-col items-center justify-center border transition-all duration-200 ${
        hoveredCard === cat.id
          ? "bg-[#DB4444] text-white"
          : "bg-white border-gray-300 text-gray-700"
      }`}
    >
      <div className="mb-2 text-2xl">
        {/* الأيقونات حسب الكاتيجوري */}
        {cat.name.toLowerCase().includes("clothes") && (
          <img src={"/src/assets/home assets/Category-Computer.svg"} alt="clothes" className="w-10 h-10 filter brightness-0 hover:invert transition-all duration-200" />
        )}
        {cat.name.toLowerCase().includes("electronics") && (
          <img src={"/src/assets/home assets/SmartWatch.svg"} alt="electronics" className="w-10 h-10 filter brightness-0 hover:invert transition-all duration-200" />
        )}
        {cat.name.toLowerCase().includes("furniture") && (
          <img src={"/src/assets/home assets/Category-Camera.svg"} alt="furniture" className="w-10 h-10 filter brightness-0 hover:invert transition-all duration-200" />
        )}
        {cat.name.toLowerCase().includes("shoes") && (
          <img src={"/src/assets/home assets/Category-Headphone.svg"} alt="shoes" className="w-10 h-10 filter brightness-0 hover:invert transition-all duration-200" />
        )}
        {cat.name.toLowerCase().includes("miscellaneous") && (
          <img src={"/src/assets/home assets/Game.svg"} alt="Miscellaneous" className="w-10 h-10 filter brightness-0 hover:invert transition-all duration-200" />
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
