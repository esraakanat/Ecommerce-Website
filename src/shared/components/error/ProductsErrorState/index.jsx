import React from 'react';

const ProductsErrorState = ({ 
  title = "Failed to Load Products", 
  message = "We couldn't load the products. This might be due to a network issue or server problem.", 
  showRetry = true, 
  onRetry = () => window.location.reload()
}) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          className="w-8 h-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4">{message}</p>
      
      {showRetry && (
        <button
          onClick={onRetry}
          className="bg-[#DB4444] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ProductsErrorState;
