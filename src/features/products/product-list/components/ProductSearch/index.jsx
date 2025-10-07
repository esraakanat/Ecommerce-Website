import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../../../../../shared/components/loading/Loader";
import ProductsErrorState from "../../../../../shared/components/error/ProductsErrorState";
import { useUserWishlist } from "../../../../whislist/hooks/useUserWishlist";
import { useUserCart } from "../../../../cart/hooks/useUserCart";
import { getProductImage, handleImageError } from "../../../../../shared/utils/imageUtils";
import { toast } from "react-toastify";
import { useQueryProductSearch } from "../../../services/queryProductSearch";

const ProductSearch = ({ searchQuery,  onProductsChange = () => {}, onLoadingChange = () => {},  onErrorChange = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const limit = 8;
  
  
  const {  data: searchData,  isLoading: loading,  error,  refetch: refetchSearch } = useQueryProductSearch(searchQuery, limit);
  
  const products = searchData?.products || [];
  const totalPages = Math.max(1, Math.ceil(products.length / limit));

  const { addToWishlist, removeFromWishlist, isInWishlist } = useUserWishlist();
  const { addToCart, removeFromCart, items } = useUserCart();

  const handleWishlistToggle = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };


  const handleRetry = () => {
    refetchSearch();
  };

  useEffect(() => {
    onProductsChange(products);
    onLoadingChange(loading);
    onErrorChange(error);
  }, [products, loading, error, onProductsChange, onLoadingChange, onErrorChange]);

  if (!searchQuery) return null;

  return (
    <div className="w-full bg-white">
      <div className="px-4 py-8 max-w-7xl mx-auto">
        {/* Search Results Header */}
        <div className="flex items-center justify-between pt-8 pb-4 px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold font-inter text-black">
              Search Results for "{searchQuery}"
            </h1>
          </div>
        </div>

 
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader />
        </div>
      )}

      {error && (
        <ProductsErrorState
          title="Search Failed"
          message="We couldn't search for products. This might be due to a network issue or server problem."
          onRetry={handleRetry}
        />
      )}

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


      {!loading && !error && products.length > 0 && (
        <div className="px-4 pb-4">
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="popLayout">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  layout
                >
                  <Link 
                    to={`/products/${product.id}`} 
                    className="bg-white rounded-lg p-1 relative group w-[90%] mx-auto block hover:shadow-lg transition-shadow"
                  >
                    <motion.div 
                      className="relative mb-2 aspect-square mx-auto rounded-lg overflow-hidden" 
                      style={{ backgroundColor: '#F5F5F5' }}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    >
                      <motion.img
                      src={getProductImage(product)}
                      alt={product.title}
                        className="w-full h-full object-cover"
                      onError={handleImageError}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
                      >
                        <motion.button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (isInCart(product.id)) {
                            removeFromCart(product.id);
                            toast.success("Product removed from cart", {
                              position: "top-right",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                            });
                          } else {
                            addToCart(product);
                            toast.success("Product added to cart", {
                              position: "top-right",
                              autoClose: 2000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                            });
                          }
                        }}
                          className={`w-full py-2 px-4 rounded-b-lg text-sm md:text-xs font-medium transition-colors ${
                          isInCart(product.id)
                              ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                              : 'bg-black hover:bg-gray-800 text-white'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isInCart(product.id) ? 'Remove' : 'Add To Cart'}
                        </motion.button>
                      </motion.div>
                  
                      {product.hasOffer && (
                        <motion.div 
                          className="absolute top-2 left-2 bg-[#DB4444] text-white px-2 py-1 rounded text-xs font-poppins font-sm"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          -{product.discountPercent}%
                        </motion.div>
                      )}
                     
                      <motion.div 
                        className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button 
                          onClick={(e) => handleWishlistToggle(product, e)}
                          className={`w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors ${
                            isInWishlist(product.id) ? 'bg-red-50' : ''
                          }`}
                          title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.svg 
                            className={`w-4 h-4 transition-colors ${
                              isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                            }`} 
                            fill={isInWishlist(product.id) ? 'currentColor' : 'none'} 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            animate={{ 
                              scale: isInWishlist(product.id) ? 1.1 : 1,
                              color: isInWishlist(product.id) ? '#ef4444' : '#6b7280'
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </motion.svg>
                        </motion.button>
                        <motion.button 
                          className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </motion.button>
                      </motion.div>
                    </motion.div>

                    <motion.div 
                      className="space-y-1"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + 0.6 }}
                    >
                      <motion.h3 
                        className=" text-black font-poppins  font-medium text-[12px]  leading-tight"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.7 }}
                      >
                        {product.title}
                      </motion.h3>
                      <motion.div 
                        className="flex items-center gap-2"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.8 }}
                      >
                        {product.hasOffer ? (
                          <>
                            <motion.p 
                              className="text-[#DB4444] font-poppins font-medium text-[14px]"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 + 0.9 }}
                            >
                              ${product.discountedPrice}
                            </motion.p>
                            <motion.p 
                              className="text-gray-500 font-poppins text-[14px] line-through"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 + 1.0 }}
                            >
                              ${product.originalPrice}
                            </motion.p>
                          </>
                        ) : (
                          <motion.p 
                            className="text-[#DB4444] font-poppins font-medium text-[14px]"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 + 0.9 }}
                          >
                            ${product.price || 'N/A'}
                          </motion.p>
                        )}
                      </motion.div>
                     
                      <motion.div 
                        className="flex items-center gap-1"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 1.1 }}
                      >
                        <div className="flex">
                          {[...Array(5)].map((_, i) => {
                            const rating = (index % 5) + 1; 
                            const isFilled = i < rating;
                            return (
                              <motion.svg 
                                key={i} 
                                className={`w-4 h-4 ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ 
                                  duration: 0.3, 
                                  delay: index * 0.1 + 1.2 + (i * 0.05) 
                                }}
                                whileHover={{ scale: 1.2, rotate: 10 }}
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </motion.svg>
                            );
                          })}
                    </div>
                        <motion.span 
                          className="text-gray-500 text-xs"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + 1.4 }}
                        >
                          ({Math.floor(Math.random() * 300) + 35})
                        </motion.span>
                      </motion.div>

                    </motion.div>
                </Link>
                </motion.div>
            ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProductSearch;