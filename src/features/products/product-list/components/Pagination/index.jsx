import React from 'react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  hasMorePages = true,
  className = ""
}) => {
 

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    } else {
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentPage === i
                ? 'bg-blue-600 text-white border border-blue-600'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            currentPage === 1
              ? 'bg-blue-600 text-white border border-blue-600'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        pages.push(
          <span key="ellipsis1" className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500">
            ...
          </span>
        );
      }

     
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(
            <button
              key={i}
              onClick={() => handlePageChange(i)}
              className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                currentPage === i
                  ? 'bg-blue-600 text-white border border-blue-600'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {i}
            </button>
          );
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <span key="ellipsis2" className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500">
            ...
          </span>
        );
      }

      if (totalPages > 1) {
        pages.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              currentPage === totalPages
                ? 'bg-blue-600 text-white border border-blue-600'
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className={`flex flex-row items-center justify-center space-x-1 ${className}`}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </button>

      <div className="flex items-center space-x-1 flex-wrap justify-center">
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || !hasMorePages}
        className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">Next</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
