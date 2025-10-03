import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { X, Search } from "lucide-react";
import { useProductSearch } from "../../../features/products/hooks/useProductSearch";
import { useUserWishlist } from "../../../features/whislist/hooks/useUserWishlist";
import { useUserCart } from "../../../features/cart/hooks/useUserCart";
import { toast } from "react-toastify";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Update URL when debounced search query changes
  useEffect(() => {
    
    if (debouncedQuery && debouncedQuery.trim() !== '') {
      // Update URL with search query without navigation
      const newParams = new URLSearchParams(location.search);
      newParams.set('search', debouncedQuery.trim());
      const newUrl = `${location.pathname}?${newParams.toString()}`;
      window.history.replaceState({}, '', newUrl);
    } else if (debouncedQuery === '') {
      // If search is cleared, remove search param from URL
      const newParams = new URLSearchParams(location.search);
      newParams.delete('search');
      const newUrl = newParams.toString() ? `${location.pathname}?${newParams.toString()}` : location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [debouncedQuery, location]);
  
  // React Query hook for product search
  const { 
    data: searchData, 
    isLoading: loading, 
    error, 
    refetch: refetchSearch 
  } = useProductSearch(debouncedQuery, 6); // Limit to 6 products for modal
  
  // Extract data from query result
  const products = searchData?.products || [];
  
  // Wishlist store
  const { addToWishlist, removeFromWishlist, isInWishlist } = useUserWishlist();
  const { addToCart, removeFromCart, items } = useUserCart();
  
  // Handle wishlist toggle
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
  
  // Check if product is in cart
  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };
  
  // Handle cart toggle
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
  
  // Handle product click
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
    onClose();
  };
  
  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
    }
  };
  
  // Handle retry
  const handleRetry = () => {
    refetchSearch();
  };
  
  // Close modal on escape key and handle keyboard shortcuts
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

  // Clear search query when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setDebouncedQuery("");
    }
  }, [isOpen]);

  // Global keyboard shortcut to open search modal
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      
      // Check if user pressed "/" key and not typing in an input field
      if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT') {
        e.preventDefault();
        // Dispatch custom event to open search modal
        document.dispatchEvent(new CustomEvent('openSearchModal'));
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, []);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50  transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-32">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[60vh] overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Search className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Search Products</h2>
                <p className="text-xs text-gray-500">Find the perfect product for you</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
              title="Close (ESC)"
            >
              <X className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
            </button>
          </div>
          
          {/* Search Input */}
          <div className="p-4 bg-gray-50">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchQuery(value);
                  }}
                  className="w-full px-3 py-3 pr-10 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Search className="h-3 w-3 text-blue-500" />
                </button>
              </div>
              {/* Keyboard shortcuts hint */}
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 font-mono text-xs">ESC</kbd>
                    to close
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 font-mono text-xs">Enter</kbd>
                    to search
                  </span>
                </div>
                <span className="text-gray-400 text-xs">Press <kbd className="px-1 py-0.5 bg-gray-200 rounded text-gray-600 font-mono text-xs">/</kbd> to open</span>
              </div>
            </form>
          </div>
          
          {/* Content */}
          <div className="p-4 max-h-64 overflow-y-auto bg-white">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-200 border-t-blue-600"></div>
                  <span className="text-gray-600 font-medium">Searching products...</span>
                </div>
              </div>
            )}
            
            {error && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Failed</h3>
                <p className="text-gray-600 mb-6">We couldn't search for products right now</p>
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  Try Again
                </button>
              </div>
            )}
            
            {!loading && !error && debouncedQuery && products.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-600 mb-2">No products found for "<span className="font-medium text-gray-900">"{debouncedQuery}"</span>"</p>
                <p className="text-sm text-gray-500">Try a different search term or check your spelling</p>
              </div>
            )}
            
            {!loading && !error && products.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Found {products.length} products for "{debouncedQuery}"
                </p>
                <div className="space-y-1">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all cursor-pointer border border-transparent hover:border-gray-200 hover:shadow-sm"
                      onClick={() => handleProductClick(product.id)}
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                        <img
                          src={product.images?.[0] || '/placeholder.jpg'}
                          alt={product.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/images/default-product.svg';
                          }}
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-semibold text-gray-900 truncate mb-0.5">
                          {product.title}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {product.hasOffer ? (
                            <>
                              <span className="text-sm font-bold text-red-600">
                                ${product.discountedPrice}
                              </span>
                              <span className="text-xs text-gray-500 line-through">
                                ${product.originalPrice}
                              </span>
                              <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                                -{product.discountPercent}%
                              </span>
                            </>
                          ) : (
                            <span className="text-sm font-bold text-gray-900">
                              ${product.price}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-0.5">
                        <button
                          onClick={(e) => handleWishlistToggle(product, e)}
                          className={`p-1.5 rounded-md transition-all ${
                            isInWishlist(product.id)
                              ? 'text-red-500 bg-red-50 shadow-sm'
                              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                          }`}
                          title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={(e) => handleCartToggle(product, e)}
                          className={`p-1.5 rounded-md transition-all ${
                            isInCart(product.id)
                              ? 'text-blue-500 bg-blue-50 shadow-sm'
                              : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                          }`}
                          title={isInCart(product.id) ? 'Remove from cart' : 'Add to cart'}
                        >
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {products.length >= 6 && (
                  <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                    <button
                      onClick={() => {
                        navigate(`/products?search=${encodeURIComponent(debouncedQuery)}`);
                        onClose();
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm hover:shadow-md text-sm"
                    >
                      View All Results ({products.length}+)
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {!debouncedQuery && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">Search Products</h3>
                <p className="text-gray-600 mb-3 text-sm">Start typing to search for products</p>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                  <span>Try:</span>
                  <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-700 text-xs">shirt</span>
                  <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-700 text-xs">shoes</span>
                  <span className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-700 text-xs">electronics</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
