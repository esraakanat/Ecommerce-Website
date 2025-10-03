import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserWishlist } from "../../../whislist/hooks/useUserWishlist";
import { useUserCart } from "../../../cart/hooks/useUserCart";
import ProductListSkeleton from "../../../../shared/components/loading/ProductListSkeleton";
import ProductsErrorState from "../../../../shared/components/error/ProductsErrorState";
import EmptyProducts from "../../../../shared/components/empty/EmptyProducts";
import { useExploreProducts } from "../../hooks/useExploreProducts";
import { getProductImage, handleImageError } from "../../../../shared/utils/imageUtils";
import { toast } from "react-toastify";

function ExploreOurProducts() {
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();
    
    // React Query hook for explore products
    const { 
        data: exploreData, 
        isLoading: loading, 
        error, 
        refetch: refetchExplore 
    } = useExploreProducts(currentPage);
    
    // Extract products from query result
    const products = exploreData?.products || [];
    const hasMore = exploreData?.hasMore || false;
    
    // Wishlist store
    const { addToWishlist, removeFromWishlist, isInWishlist } = useUserWishlist();
    
    // Cart store
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

    // Handle cart toggle
    const handleCartToggle = (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isInCart(product.id)) {
            removeFromCart(product.id);
            toast.success('Product removed from cart!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            addToCart(product);
            toast.success('Product added to cart successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    // Function to retry loading products
    const handleRetry = () => {
        refetchExplore();
    };

    // Navigation functions
    const nextPage = () => {
        if (hasMore) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    if (loading) {
        return <ProductListSkeleton/>;
    }

    if (error) {
        return (
            <ProductsErrorState
                title="Failed to Load Explore Products"
                message="We couldn't load the explore products. This might be due to a network issue or server problem."
                onRetry={handleRetry}
                showRetry={true}
            />
        );
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <div className="px-8 py-8 max-w-8xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
            <div>
                        <div className="flex items-center gap-2 mb-8 ">
                            <div className="w-4 h-7 rounded-sm bg-[#DB4444]"></div>
                            <h2 className="text-sm font-semibold text-[#DB4444] font-inter">Our Products</h2>
                        </div>
                        {/* Flash Sales Title */}
                        <h1 className="text-2xl font-bold ml-12 text-black font-inter tracking-wider">Explore Our Products</h1>
                    </div>
                
                 {/* Navigation Arrows */}
                 <div className="flex gap-2 mr-12 mt-16">
                     <button 
                         onClick={prevPage}
                         disabled={currentPage === 0}
                         className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${
                             currentPage === 0 
                                 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                 : 'bg-gray-100 text-black hover:bg-gray-200'
                         }`}
                     >
                         <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                         </svg>
                     </button>
                     <button 
                         onClick={nextPage}
                         disabled={!hasMore}
                         className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${
                             !hasMore 
                                 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                 : 'bg-gray-100 text-black hover:bg-gray-200'
                         }`}
                     >
                         <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                         </svg>
                     </button>
                 </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {products.map((product, index) => (
                    <Link 
                        key={product.id} 
                        to={`/products/${product.id}`} 
                        className="bg-white  rounded-lg p-1 relative group w-[75%] mx-auto block hover:shadow-lg transition-shadow"
                    >
                        {/* Product Image Container */}
                        <div className="relative mb-2 aspect-square mx-auto rounded-lg overflow-hidden" style={{ backgroundColor: '#F5F5F5' }}>
                            <img
                                src={getProductImage(product)}
                                alt={product.title}
                                className="w-full h-full object-cover"
                                onError={handleImageError}
                            />
                            
                            {/* NEW Badge */}
                            {product.hasNewBadge && (
                                <div className="absolute top-2 left-2 bg-[#00FF66] font-poppins font-sm text-[10px] text-white px-2 py-1 rounded text-xs font-medium">
                                    NEW
                                </div>
                            )}
                            
                            {/* Action Icons */}
                            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={(e) => handleWishlistToggle(product, e)}
                                    className={`w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors ${
                                        isInWishlist(product.id) ? 'bg-red-50' : ''
                                    }`}
                                    title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                                >
                                    <svg 
                                        className={`w-4 h-4 transition-colors ${
                                            isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                                        }`} 
                                        fill={isInWishlist(product.id) ? 'currentColor' : 'none'} 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                                <button className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                            
                            {/* Add to Cart Button - Only for some products */}
                            {index === 1 && (
                                <div className="absolute bottom-0 left-0 right-0">
                                    <button 
                                        onClick={(e) => handleCartToggle(product, e)}
                                        className={`w-full py-2 px-4 rounded-b-lg text-sm font-base font-poppins transition-colors ${
                                            isInCart(product.id) 
                                                ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                                                : 'bg-black hover:bg-gray-800 text-white'
                                        }`}
                                    >
                                        {isInCart(product.id) ? 'Remove' : 'Add To Cart'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-0.5">
                            <h3 className=" text-black font-poppins  font-medium text-[10px]  leading-tight">
                                {product.title}
                            </h3>
                            <p className="text-[#DB4444]  font-poppins font-medium text-[12px] ">${product.price}</p>
                            
                            {/* Color Options */}
                            {product.colorOptions && product.colorOptions.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                    {product.colorOptions.map((color, colorIndex) => (
                                        <div 
                                            key={colorIndex}
                                            className={`w-3 h-3 rounded-full ${color.bg} ${
                                                color.selected ? 'ring-2 ring-gray-800 ring-offset-1' : ''
                                            }`}
                                        ></div>
                                    ))}
                                </div>
                            )}
                            
                            {/* Rating */}
                            <div className="flex items-center gap-1">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => {
                                        const rating = (index % 5) + 1;
                                        const isFilled = i < rating;
                                        return (
                                            <svg key={i} className={`w-3 h-3 ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        );
                                    })}
                                </div>
                                <span className="text-gray-500 text-xs">({Math.floor(Math.random() * 300) + 35})</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* View All Products Button */}
            <div className="text-center">
                <button 
                    onClick={() => {
                        navigate('/products');
                        // Scroll to top when navigating to products page
                        window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth'
                        });
                    }}
                    className="bg-[#DB4444] text-white px-8 py-3 rounded-sm  font-poppins  font-base text-[14px] p-12 mr-10 mt-16 font-poppins hover:bg-red-600 transition-colors"
                >
                    View All Products
                </button>
            </div>
        </div>
    );
}

export default ExploreOurProducts;
