import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <motion.nav 
      className="flex items-center space-x-2 text-sm text-gray-500 mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        delay: 0.2 
      }}
    >
      {/* Home Link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Link 
          to="/" 
          className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1"
        >
          <motion.svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </motion.svg>
          <motion.span
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Home
          </motion.span>
        </Link>
      </motion.div>
      
      {/* Separator */}
      <motion.svg 
        className="w-4 h-4 text-gray-400" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </motion.svg>
      
      {/* Products Link - Show if user came from products page */}
      {cameFromProducts && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Link 
              to="/products"
              className="hover:text-blue-600 transition-colors duration-200"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Products
              </motion.span>
            </Link>
          </motion.div>
          
          {/* Separator */}
          <motion.svg 
            className="w-4 h-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </>
      )}
      
      {/* Category Link */}
      {category && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <Link 
              to={`/products?category=${encodeURIComponent(category.name || category)}`}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {category.name || category}
              </motion.span>
            </Link>
          </motion.div>
          
          {/* Separator */}
          <motion.svg 
            className="w-4 h-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </>
      )}
      
      {/* Current Product (Not a link) */}
      <motion.span 
        className="text-gray-900 font-medium truncate max-w-xs"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        {product?.title || 'Product'}
      </motion.span>
    </motion.nav>
  );
};

export default ProductBreadcrumb;
