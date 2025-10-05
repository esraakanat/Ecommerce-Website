import React from 'react';

const ProductListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="bg-white rounded-lg p-1 relative w-[75%] mx-auto block">
         
          <div className="relative mb-2 aspect-square mx-auto rounded-lg overflow-hidden bg-gray-200 animate-pulse">
            <div className="w-full h-full bg-gray-300"></div>
            
         
            <div className="absolute bottom-0 left-0 right-0">
              <div className="w-full py-2 px-4 rounded-b-lg bg-gray-300 animate-pulse"></div>
            </div>
          </div>

       
          <div className="space-y-0.5">
           
            <div className="h-3 bg-gray-200 rounded animate-pulse mb-1"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
            
     
            <div className="flex items-center gap-2">
              <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
           
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
              <div className="h-3 w-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListSkeleton;
