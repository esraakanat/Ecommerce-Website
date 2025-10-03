import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../../../shared/components/loading/Loader";
import ProductsErrorState from "../../../../shared/components/error/ProductsErrorState";
import EmptyProducts from "../../../../shared/components/empty/EmptyProducts";
import { useUserWishlist } from "../../../whislist/hooks/useUserWishlist";
import { useUserCart } from "../../../cart/hooks/useUserCart";
import { getProductImage, handleImageError } from "../../../../shared/utils/imageUtils";
import { toast } from "react-toastify";
import { useProductSearch } from "../../hooks/useProductSearch";

const ProductSearch = ({ 
  searchQuery, 
  onProductsChange = () => {}, 
  onLoadingChange = () => {}, 
  onErrorChange = () => {} 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const limit = 8;
  
  // React Query hook for product search
  const { 
    data: searchData, 
    isLoading: loading, 
    error, 
    refetch: refetchSearch 
  } = useProductSearch(searchQuery, limit);
  
  // Extract data from query result
  const products = searchData?.products || [];
  const totalPages = Math.max(1, Math.ceil(products.length / limit));

  // Wishlist store
  const { addToWishlist, removeFromWishlist, isInWishlist } = useUserWishlist();
  const { addToCart, removeFromCart, items } = useUserCart();

  // Handle wishlist toggle
  const handleWishlistToggle = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };

  // Handle retry for failed requests
  const handleRetry = () => {
    refetchSearch();
  };


  // Update parent component with search results
  useEffect(() => {
    onProductsChange(products);
    onLoadingChange(loading);
    onErrorChange(error);
  }, [products, loading, error, onProductsChange, onLoadingChange, onErrorChange]);

  // Don't render anything if no search query
  if (!searchQuery) return null;

  return (
    <div className="bg-white">
      {/* Search Results Header */}
      <div className="flex items-center justify-between pt-8 pb-4 px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold font-inter text-black">
            Search Results for "{searchQuery}"
          </h1>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader />
        </div>
      )}

      {/* Error State */}
      {error && (
        <ProductsErrorState
          title="Search Failed"
          message="We couldn't search for products. This might be due to a network issue or server problem."
          onRetry={handleRetry}
        />
      )}

      {/* No Results State */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">We couldn't find any products matching "{searchQuery}"</p>
          <p className="text-sm text-gray-400">Try a different search term or browse our products</p>
        </div>
      )}

      {/* Search Results Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="px-4 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {products.map((product) => (
              <div key={product.id} className="group relative bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                <Link to={`/products/${product.id}`} className="block">
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <img
                      src={getProductImage(product)}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      onError={handleImageError}
                    />
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => handleWishlistToggle(product, e)}
                      className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <svg 
                        className={`w-4 h-4 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                        fill={isInWishlist(product.id) ? 'currentColor' : 'none'} 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>

                    {/* Sale Badge */}
                    {product.hasOffer && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Sale
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {product.hasOffer ? (
                          <>
                            <span className="text-lg font-bold text-red-600">
                              ${product.offerPrice}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600">4.5</span>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (isInCart(product.id)) {
                            removeFromCart(product.id);
                            toast.success("Product removed from cart", {
                              position: "bottom-right",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                            });
                          } else {
                            addToCart(product);
                            toast.success("Product added to cart", {
                              position: "bottom-right",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                            });
                          }
                        }}
                        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                          isInCart(product.id)
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                      >
                        {isInCart(product.id) ? 'Remove' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;