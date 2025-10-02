import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ProductBreadcrumb = ({ product, category }) => {
  const location = useLocation();
  const [previousPage, setPreviousPage] = useState(null);

  useEffect(() => {
    // Get previous page from sessionStorage
    const prevPage = sessionStorage.getItem('previousPage');
    setPreviousPage(prevPage);
  }, []);

  // Determine if user came from products page
  const cameFromProducts = previousPage === '/products' || 
                          previousPage?.includes('/products?') ||
                          previousPage?.includes('/products#');
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
      {/* Home Link */}
      <Link 
        to="/" 
        className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Home
      </Link>
      
      {/* Separator */}
      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      
      {/* Products Link - Show if user came from products page */}
      {cameFromProducts && (
        <>
          <Link 
            to="/products"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Products
          </Link>
          
          {/* Separator */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </>
      )}
      
      {/* Category Link */}
      {category && (
        <>
          <Link 
            to={`/products?category=${encodeURIComponent(category.name || category)}`}
            className="hover:text-blue-600 transition-colors duration-200"
          >
            {category.name || category}
          </Link>
          
          {/* Separator */}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </>
      )}
      
      {/* Current Product (Not a link) */}
      <span className="text-gray-900 font-medium truncate max-w-xs">
        {product?.title || 'Product'}
      </span>
    </nav>
  );
};

export default ProductBreadcrumb;
