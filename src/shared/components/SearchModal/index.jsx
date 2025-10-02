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
    console.log('SearchModal - Debounced query changed:', debouncedQuery);
    
    if (debouncedQuery && debouncedQuery.trim() !== '') {
      // Update URL with search query without navigation
      const newParams = new URLSearchParams(location.search);
      newParams.set('search', debouncedQuery.trim());
      const newUrl = `${location.pathname}?${newParams.toString()}`;
      console.log('SearchModal - Updating URL to:', newUrl);
      window.history.replaceState({}, '', newUrl);
    } else if (debouncedQuery === '') {
      // If search is cleared, remove search param from URL
      const newParams = new URLSearchParams(location.search);
      newParams.delete('search');
      const newUrl = newParams.toString() ? `${location.pathname}?${newParams.toString()}` : location.pathname;
      console.log('SearchModal - Clearing search from URL:', newUrl);
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
      console.log('Global key pressed:', e.key, 'Target:', e.target.tagName);
      
      // Check if user pressed "/" key and not typing in an input field
      if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT') {
        console.log('Opening search modal with / key');
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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-16">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Search Products</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Search Input */}
          <div className="p-4 border-b">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  console.log('SearchModal - Search input changed:', value);
                  setSearchQuery(value);
                }}
                className="w-full px-4 py-3 pr-12 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              {/* Keyboard shortcut indicator */}
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <kbd className="inline-flex items-center px-2 py-1 text-xs font-mono text-gray-500 bg-gray-100 border border-gray-300 rounded">
                  /
                </kbd>
              </div>
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </form>
          </div>
          
          {/* Content */}
          <div className="p-4 max-h-96 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Searching...</span>
              </div>
            )}
            
            {error && (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">Failed to search products</p>
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
            
            {!loading && !error && debouncedQuery && products.length === 0 && (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No products found for "{debouncedQuery}"</p>
                <p className="text-sm text-gray-500 mt-2">Try a different search term</p>
              </div>
            )}
            
            {!loading && !error && products.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-4">
                  Found {products.length} products for "{debouncedQuery}"
                </p>
                <div className="space-y-3">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                      onClick={() => handleProductClick(product.id)}
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={product.images?.[0] || '/placeholder.jpg'}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {product.title}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {product.hasOffer ? (
                            <>
                              <span className="text-lg font-semibold text-red-600">
                                ${product.offerPrice}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice}
                              </span>
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                -{product.discountPercent}%
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-semibold text-gray-900">
                              ${product.price}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => handleWishlistToggle(product, e)}
                          className={`p-2 rounded-full transition-colors ${
                            isInWishlist(product.id)
                              ? 'text-red-500 bg-red-50'
                              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                          }`}
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                        </button>
                        
                        <button
                          onClick={(e) => handleCartToggle(product, e)}
                          className={`p-2 rounded-full transition-colors ${
                            isInCart(product.id)
                              ? 'text-blue-500 bg-blue-50'
                              : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'
                          }`}
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {products.length >= 6 && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => {
                        navigate(`/products?search=${encodeURIComponent(debouncedQuery)}`);
                        onClose();
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View All Results
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {!debouncedQuery && (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Start typing to search for products</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
