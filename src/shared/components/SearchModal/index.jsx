import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryProductSearch } from "../../../features/products/services/queryProductSearch";
import { useUserWishlist } from "../../../features/whislist/hooks/useUserWishlist";
import { useUserCart } from "../../../features/cart/hooks/useUserCart";
import { toast } from "react-toastify";
import useDebounce from "../../hooks/useDebounce";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  const debouncedQuery = useDebounce(searchQuery, 300);


  useEffect(() => {
    
    if (debouncedQuery && debouncedQuery.trim() !== '') {
      const newParams = new URLSearchParams(location.search);
      newParams.set('search', debouncedQuery.trim());
      const newUrl = `${location.pathname}?${newParams.toString()}`;
      window.history.replaceState({}, '', newUrl);
    } else if (debouncedQuery === '') {
      const newParams = new URLSearchParams(location.search);
      newParams.delete('search');
      const newUrl = newParams.toString() ? `${location.pathname}?${newParams.toString()}` : location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [debouncedQuery, location]);
  
  
  const {data: searchData,isLoading: loading, error, refetch: refetchSearch} = useQueryProductSearch(debouncedQuery, 6); 
  const products = searchData?.products || [];
  
  const { addToWishlist, removeFromWishlist, isInWishlist } = useUserWishlist();
  const { addToCart, removeFromCart, items } = useUserCart();
  
  const handleWishlistToggle = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist!');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };
  
  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };
 
  const handleCartToggle = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInCart(product.id)) {
      removeFromCart(product.id);
      toast.success('Product removed from cart!');
    } else {
      addToCart(product);
      toast.success('Product added to cart!');
    }
  };
  
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
    onClose();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };
  
  const handleRetry = () => {
    refetchSearch();
  };
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {

      if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT') {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('openSearchModal'));
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[9999] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
    
          <div className="relative min-h-screen flex items-start justify-center p-4 pt-32">
            <motion.div 
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[60vh] overflow-hidden border border-gray-100"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ 
                duration: 0.4, 
                ease: "easeOut",
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
           
              <motion.div 
                className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <motion.div 
                    className="p-1.5 bg-blue-100 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="h-4 w-4 text-blue-600" />
                  </motion.div>
                  <div>
                    <motion.h2 
                      className="text-lg font-semibold text-gray-900"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      Search Products
                    </motion.h2>
                    <motion.p 
                      className="text-xs text-gray-500"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      Find the perfect product for you
                    </motion.p>
                  </div>
                </motion.div>
                <motion.button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
                  title="Close (ESC)"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <X className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
                </motion.button>
              </motion.div>
          
              <motion.div 
                className="p-4 bg-gray-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <form onSubmit={handleSearchSubmit} className="relative">
                  <motion.div 
                    className="relative"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <motion.input
                      type="text"
                      placeholder="Search for products..."
                      value={searchQuery}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSearchQuery(value);
                      }}
                      className="w-full px-3 py-3 pr-10 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm"
                      autoFocus
                      whileFocus={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                   
                    <motion.button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                      
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Search className="h-3 w-3 text-blue-500" />
                    </motion.button>
                  </motion.div>
               
                  <motion.div 
                    className="flex items-center justify-between mt-2 text-xs text-gray-500"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <motion.div 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <motion.span 
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 font-mono text-xs">ESC</kbd>
                        to close
                      </motion.span>
                      <motion.span 
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 font-mono text-xs">Enter</kbd>
                        to search
                      </motion.span>
                    </motion.div>
                    <motion.span 
                      className="text-gray-400 text-xs"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    >
                      Press <kbd className="px-1 py-0.5 bg-gray-200 rounded text-gray-600 font-mono text-xs">/</kbd> to open
                    </motion.span>
                  </motion.div>
                </form>
              </motion.div>
          
              <motion.div 
                className="p-4 max-h-64 overflow-y-auto bg-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                {loading && (
                  <motion.div 
                    className="flex items-center justify-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <motion.div 
                        className="animate-spin rounded-full h-8 w-8 border-2 border-blue-200 border-t-blue-600"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.span 
                        className="text-gray-600 font-medium"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        Searching products...
                      </motion.span>
                    </motion.div>
                  </motion.div>
                )}
            
                {error && (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <motion.svg 
                        className="w-8 h-8 text-red-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </motion.svg>
                    </motion.div>
                    <motion.h3 
                      className="text-lg font-semibold text-gray-900 mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      Search Failed
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      We couldn't search for products right now
                    </motion.p>
                    <motion.button
                      onClick={handleRetry}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Try Again
                    </motion.button>
                  </motion.div>
                )}
            
                {!loading && !error && debouncedQuery && products.length === 0 && (
                  <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        <Search className="h-8 w-8 text-gray-400" />
                      </motion.div>
                    </motion.div>
                    <motion.h3 
                      className="text-lg font-semibold text-gray-900 mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      No Results Found
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      No products found for "<span className="font-medium text-gray-900">"{debouncedQuery}"</span>"
                    </motion.p>
                    <motion.p 
                      className="text-sm text-gray-500"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      Try a different search term or check your spelling
                    </motion.p>
                  </motion.div>
                )}
            
                {!loading && !error && products.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.p 
                      className="text-sm text-gray-600 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      Found {products.length} products for "{debouncedQuery}"
                    </motion.p>
                    <motion.div 
                      className="space-y-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {products.map((product, index) => (
                        <motion.div
                          key={product.id}
                          className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all cursor-pointer border border-transparent hover:border-gray-200 hover:shadow-sm"
                          onClick={() => handleProductClick(product.id)}
                          initial={{ opacity: 0, x: -20, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.1,
                            ease: "easeOut"
                          }}
                          whileHover={{ 
                            scale: 1.02, 
                            y: -2,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                        
                          <motion.div 
                            className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shadow-sm"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.img
                              src={product.images?.[0] || '/placeholder.jpg'}
                              alt={product.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = '/images/default-product.svg';
                              }}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                            />
                          </motion.div>
                      
                          <motion.div 
                            className="flex-1 min-w-0"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
                          >
                            <motion.h3 
                              className="text-xs font-semibold text-gray-900 truncate mb-0.5"
                              whileHover={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              {product.title}
                            </motion.h3>
                            <motion.div 
                              className="flex items-center space-x-1"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                            >
                              {product.hasOffer ? (
                                <>
                                  <motion.span 
                                    className="text-sm font-bold text-red-600"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    ${product.discountedPrice}
                                  </motion.span>
                                  <motion.span 
                                    className="text-xs text-gray-500 line-through"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    ${product.originalPrice}
                                  </motion.span>
                                  <motion.span 
                                    className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    -{product.discountPercent}%
                                  </motion.span>
                                </>
                              ) : (
                                <motion.span 
                                  className="text-sm font-bold text-gray-900"
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  ${product.price}
                                </motion.span>
                              )}
                            </motion.div>
                          </motion.div>
                      
                          <motion.div 
                            className="flex items-center space-x-0.5"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                          >
                            <motion.button
                              onClick={(e) => handleWishlistToggle(product, e)}
                              className={`p-1.5 rounded-md transition-all ${
                                isInWishlist(product.id)
                                  ? 'text-red-500 bg-red-50 shadow-sm'
                                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                              }`}
                              title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                            >
                              <motion.svg 
                                className="h-3 w-3" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                                animate={isInWishlist(product.id) ? {
                                  scale: [1, 1.2, 1],
                                  rotate: [0, 10, 0]
                                } : {}}
                                transition={{ duration: 0.3 }}
                              >
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </motion.svg>
                            </motion.button>
                            
                            <motion.button
                              onClick={(e) => handleCartToggle(product, e)}
                              className={`p-1.5 rounded-md transition-all ${
                                isInCart(product.id)
                                  ? 'text-blue-500 bg-blue-50 shadow-sm'
                                  : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                              }`}
                              title={isInCart(product.id) ? 'Remove from cart' : 'Add to cart'}
                              whileHover={{ scale: 1.2, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              transition={{ duration: 0.2 }}
                            >
                              <motion.svg 
                                className="h-3 w-3" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                animate={isInCart(product.id) ? {
                                  scale: [1, 1.2, 1],
                                  rotate: [0, 10, 0]
                                } : {}}
                                transition={{ duration: 0.3 }}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                              </motion.svg>
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      ))}
                    </motion.div>
                
                    {products.length >= 6 && (
                      <motion.div 
                        className="mt-4 pt-3 border-t border-gray-100 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <motion.button
                          onClick={() => {
                            navigate(`/products?search=${encodeURIComponent(debouncedQuery)}`);
                            onClose();
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md text-sm"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          View All Results ({products.length}+)
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
            
                {!debouncedQuery && (
                  <motion.div 
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        <Search className="h-8 w-8 text-blue-500" />
                      </motion.div>
                    </motion.div>
                    <motion.h3 
                      className="text-base font-semibold text-gray-900 mb-1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      Search Products
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 mb-3 text-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      Start typing to search for products
                    </motion.p>
                    <motion.div 
                      className="flex items-center justify-center gap-1 text-xs text-gray-500"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <span>Try:</span>
                      <motion.span 
                        className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-700 text-xs"
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        shirt
                      </motion.span>
                      <motion.span 
                        className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-700 text-xs"
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        shoes
                      </motion.span>
                      <motion.span 
                        className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-700 text-xs"
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        electronics
                      </motion.span>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>
    );
};

export default SearchModal;
