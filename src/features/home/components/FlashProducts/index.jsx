import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserWishlist } from "../../../whislist/hooks/useUserWishlist";
import { useUserCart } from "../../../cart/hooks/useUserCart";
import ProductListSkeleton from "../../../../shared/components/loading/ProductListSkeleton";
import ProductsErrorState from "../../../../shared/components/error/ProductsErrorState";
import EmptyProducts from "../../../../shared/components/empty/EmptyProducts";
import { useFlashProducts } from "../../hooks/useFlashProducts";
import { toast } from "react-toastify";
function FlashProducts() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [timeLeft, setTimeLeft] = useState({
        days: 3,
        hours: 23,
        minutes: 19,
        seconds: 56
    });
    const navigate = useNavigate();
    
    // React Query hook for flash products
    const { 
        data: flashProductsData, 
        isLoading: loading, 
        error, 
        refetch: refetchFlashProducts 
    } = useFlashProducts();
    
    // Extract products from query result
    const products = flashProductsData?.products || [];
    
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

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                } else {
                    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Function to retry loading products
    const handleRetry = () => {
        refetchFlashProducts();
    };


    // Navigation functions
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(products.length / 4));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.ceil(products.length / 4)) % Math.ceil(products.length / 4));
    };

    // Get current slide products
    const getCurrentSlideProducts = () => {
        const startIndex = currentSlide * 4;
        return products.slice(startIndex, startIndex + 4);
    };

    if (loading) {
        return <ProductListSkeleton/>;
    }

    if (error) {
        return (
            <ProductsErrorState
                title="Failed to Load Flash Sales"
                message="We couldn't load the flash sale products. This might be due to a network issue or server problem."
                onRetry={handleRetry}
                showRetry={true}
            />
        );
    }

    if (products.length === 0) {
        return <EmptyProducts />;
    }

    return (
        <div className="px-4 py-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div>
                        {/* Today's Label */}
                        <div className="flex items-center gap-2 ml-10 mb-8">
                            <div className="w-3 h-8 rounded-sm bg-[#DB4444]"></div>
                            <h2 className="text-sm font-normal text-[#DB4444] font-inter">Today's</h2>
                        </div>
                        {/* Flash Sales Title */}
                        <h1 className="text-2xl font-bold ml-10 text-black font-inter">Flash Sales</h1>
                    </div>
                    
                    {/* Countdown Timer */}
                    <div className="flex items-center gap-2 mt-16 ml-8">
                        <div className="text-center">
                            <div className="text-lg font-bold text-black">{timeLeft.days.toString().padStart(2, '0')}</div>
                            <div className="text-xs text-gray-500">Days</div>
                        </div>
                        <div className="text-[#DB4444] text-lg font-bold">:</div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-black">{timeLeft.hours.toString().padStart(2, '0')}</div>
                            <div className="text-xs text-gray-500">Hours</div>
                        </div>
                        <div className="text-[#DB4444] text-lg font-bold">:</div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-black">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                            <div className="text-xs text-gray-500">Minutes</div>
                        </div>
                        <div className="text-[#DB4444] text-lg font-bold">:</div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-black">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                            <div className="text-xs text-gray-500">Seconds</div>
                        </div>
                    </div>
                </div>
                
                {/* Navigation Arrows */}
                <div className="flex gap-2 mr-10 mt-16">
                    <button 
                        onClick={prevSlide}
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
                {getCurrentSlideProducts().map((product, index) => (
                    <Link 
                        key={product.id} 
                        to={`/products/${product.id}`} 
                        className="bg-white  rounded-lg p-1 relative group w-[75%] mx-auto block hover:shadow-lg transition-shadow"
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
                            
                            {/* Discount Badge */}
                            <div className="absolute top-2 left-2 bg-[#DB4444] text-white px-2 py-1 rounded text-xs font-poppins font-sm">
                                -{product.discountPercent}%
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
                            
                            {/* Add to Cart Button */}
                            <div className="absolute bottom-0 left-0 right-0">
                                <button 
                                    onClick={(e) => handleCartToggle(product, e)}
                                    className={`w-full py-2 px-4 rounded-b-lg text-sm font-medium transition-colors ${
                                        isInCart(product.id) 
                                            ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                                            : 'bg-black hover:bg-gray-800 text-white'
                                    }`}
                                >
                                    {isInCart(product.id) ? 'Remove' : 'Add To Cart'}
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
                                <p className="text-gray-500 font-poppins text-[12px] line-through">
                                    ${product.originalPrice}
                                </p>
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
                    className="bg-[#DB4444] text-white font-poppins text-[14px] px-8 py-3 rounded-md font-medium hover:bg-red-600 transition-colors"
                >
                    View All Products
                </button>
            </div>
            <div className="flex justify-center mt-16">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>
        </div>
        
    );
}

export default FlashProducts;
