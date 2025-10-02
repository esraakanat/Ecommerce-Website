import React from 'react';

const ErrorState = ({ 
  title = "Something went wrong", 
  message = "We encountered an error. Please try again.", 
  showRetry = true, 
  onRetry = () => window.location.reload(),
  showBackButton = false,
  backButtonText = "Go Back",
  backButtonLink = "/"
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-red-500"
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
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {showRetry && (
            <button
              onClick={onRetry}
              className="bg-[#DB4444] text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Try Again
            </button>
          )}
          {showBackButton && (
            <a
              href={backButtonLink}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {backButtonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
