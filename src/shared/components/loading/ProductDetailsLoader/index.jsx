import React from 'react';

const ProductDetailsLoader = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-4 max-w-7xl mx-auto">
        {/* Breadcrumb Loader */}
        <div className="flex items-center space-x-2 mb-8">
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          <span className="text-gray-400">/</span>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          <span className="text-gray-400">/</span>
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>

        {/* Main Content Loader */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Loader */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3 w-20">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
            <div className="flex-1">
              <div className="w-full h-[550px] bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Details Loader */}
          <div className="space-y-6">
            {/* Title */}
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>

            {/* Price */}
            <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>

            {/* Colors */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-7 h-7 bg-gray-200 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <div className="h-4 bg-gray-200 rounded w-12 mb-2 animate-pulse"></div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsLoader;
