import React from 'react';

const CategoryLoading = () => {
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

        {/* Loading Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 md:gap-12 lg:gap-16 justify-items-center">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="w-[190px] h-[175px] rounded-md border border-gray-200 bg-gray-50 animate-pulse">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-10 h-10 bg-gray-300 rounded mb-2"></div>
                <div className="w-16 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryLoading;
