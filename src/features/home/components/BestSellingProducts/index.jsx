import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserWishlist } from "../../../whislist/hooks/useUserWishlist";
import ProductListSkeleton from "../../../../shared/components/loading/ProductListSkeleton";
import { useBestSellingProducts } from "../../hooks/useBestSellingProducts";

function BestSellingProducts() {
    const navigate = useNavigate();
    
    // React Query hook for best selling products
    const { 
        data: bestSellingData, 
        isLoading: loading, 
        error, 
        refetch: refetchBestSelling 
    } = useBestSellingProducts();
    
    // Extract products from query result
    const products = bestSellingData?.products || [];
    
    // Wishlist store
    const { addToWishlist, removeFromWishlist, isInWishlist } = useUserWishlist();

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

    // Function to retry loading products
    const handleRetry = () => {
        refetchBestSelling();
    };

    if (loading) {
        return <ProductListSkeleton/>;
    }

    if (error) {
        return (
            <div className="px-4 py-8 max-w-7xl mx-auto">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Best Selling Products</h3>
                    <p className="text-gray-500 mb-4">We couldn't load the best selling products. Please try again.</p>
                    <button
                        onClick={handleRetry}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 py-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                        <div>
                        <div className="flex items-center gap-2 mb-8 ml-12">
                            <div className="w-3 h-8 rounded-sm bg-[#DB4444]"></div>
                            <h2 className="text-sm font-normal text-[#DB4444] font-inter">This Month</h2>
                        </div>
                        {/* Flash Sales Title */}
                        <h1 className="text-2xl font-bold ml-10 text-black font-inter">Best Selling Products</h1>
                    </div>
                {/* View All Button */}
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
                    className="bg-[#DB4444] text-white px-6 py-2 rounded-sm font-base text-[14px] p-12 mr-10 mt-16 font-poppins hover:bg-red-600 transition-colors"
                >
                    View All
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product, index) => (
                    <Link 
                        key={product.id} 
                        to={`/products/${product.id}`} 
                        className="bg-white rounded-lg p-1 relative group w-[75%] mx-auto block hover:shadow-lg transition-shadow"
                    >
                        {/* Product Image Container */}
                        <div className="relative mb-2 aspect-square mx-auto rounded-lg overflow-hidden" style={{ backgroundColor: '#F5F5F5' }}>
                            <div 
                                className="w-full h-full flex items-center justify-center"
                                style={{ 
                                    backgroundColor: '#F5F5F5',
                                    backgroundImage: `url(${product.images?.[0]})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'
                                }}
                            >
                            </div>
                            
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
                        </div>

                        {/* Product Info */}
                        <div className="space-y-0.5">
                            <h3 className=" text-black font-poppins  font-medium text-[10px]  leading-tight">
                                {product.title}
                            </h3>
                            <div className="flex items-center gap-2">
                                <p className="text-[#DB4444]  font-poppins font-medium text-[12px] ">
                                    ${product.discountedPrice}
                                </p>
                                {product.originalPrice && (
                                    <p className="text-gray-500 font-poppins text-[12px] line-through">
                                        ${product.originalPrice}
                                    </p>
                                )}
                            </div>
                            
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
        </div>
    );
}

export default BestSellingProducts;
