import React from 'react';
import { Link } from 'react-router-dom';

const EmptyProducts = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          We couldn't find any products matching your criteria. Try adjusting your filters or browse our categories.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/products"
            className="bg-[#DB4444] text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Browse All Products
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmptyProducts;
