import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQueryJustForYouProducts } from "../../services/queryJustForYouProducts";
import { useUserCart } from "../../../cart/hooks/useUserCart";
import { toast } from "react-toastify";

function JustForYou() {
    const navigate = useNavigate();
  
  const { data: productsData, isLoading: loading, error, refetch: refetchProducts } = useQueryJustForYouProducts();
    
    const { addToCart, removeFromCart, items } = useUserCart();
   
    const products = productsData?.products || [];

    const isInCart = (productId) => {
        return items.some(item => item.id === productId);
    };

    const handleAddToCart = (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        
        addToCart(product, 1);
        toast.success(`Product added to cart successfully!`);
    };

    const handleRemoveFromCart = (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        
        removeFromCart(product.id);
        toast.success(`Product removed from cart!`);
    };

    if (error) {
        return (
            <div className="px-4 py-8 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-8 ml-12 rounded-sm bg-[#DB4444]"></div>
                        <h2 className="text-xl font-semibold text-black font-inter">Just For You</h2>
                    </div>
                </div>
                <div className="text-center py-12">
                    <div className="text-red-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load recommendations</h3>
                    <p className="text-gray-500 mb-4">We couldn't load your personalized recommendations.</p>
                    <button 
                        onClick={() => refetchProducts()}
                        className="bg-[#DB4444] text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-red-500"></div>
                        <h2 className="text-2xl font-bold text-black font-inter">Just For You</h2>
                    </div>
                    <button className="text-gray-600 hover:text-black transition-colors">
                        See All
                    </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-white rounded-lg p-1 relative group w-[75%] mx-auto animate-pulse">
                            <div className="relative mb-2 aspect-square mx-auto rounded-lg overflow-hidden bg-gray-200"></div>
                            <div className="space-y-1">
                                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 py-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 ">
                    <div className="w-3 h-8  ml-12 rounded-sm bg-[#DB4444]"></div>
                    <h2 className="text-xl font-semibold text-black font-inter">Just For You</h2>
                </div>
                <div className="flex gap-2">
                 
                    <button 
                        onClick={() => navigate('/products')}
                        className="text-black font-poppins font-sm text-[14px] hover:text-black mr-10 border border-black px-8 py-2 rounded-md transition-colors"
                    >
                        See All
                    </button>
                </div>
            </div>


            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {products.map((product, index) => (
                    <Link 
                        key={product.id} 
                        to={`/products/${product.id}`} 
                        className="bg-white border border-gray-200 mt-2 rounded-lg p-1 relative group w-[75%] mx-auto block hover:shadow-lg transition-shadow"
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
                    
                            <div className="absolute bottom-0 left-0 right-0">
                                {isInCart(product.id) ? (
                                    <button 
                                        onClick={(e) => handleRemoveFromCart(product, e)}
                                        className="w-full bg-gray-500 text-white py-2 px-4 rounded-b-lg text-sm font-medium hover:bg-gray-600 transition-colors"
                                    >
                                        Remove
                                    </button>
                                ) : (
                                    <button 
                                        onClick={(e) => handleAddToCart(product, e)}
                                        className="w-full bg-black text-white py-2 px-4 rounded-b-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                                    >
                                        Add To Cart
                                    </button>
                                )}
                            </div>
                    
                            <div className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors group opacity-0 group-hover:opacity-100">
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <h3 className=" text-black font-poppins  font-medium text-[10px]  leading-tight">
                                {product.title}
                            </h3>
                            <p className="text-[#DB4444]  font-poppins font-medium text-[12px] ">${product.price}</p>
                            
                            <div className="flex items-center gap-1">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-gray-500 text-xs">({Math.floor(Math.random() * 100) + 35})</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default JustForYou;
