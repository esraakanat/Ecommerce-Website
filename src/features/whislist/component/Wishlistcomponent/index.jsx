import React from 'react';
import { Link } from 'react-router-dom';
import { useUserWishlist } from '../../hooks/useUserWishlist';
import { useUserCart } from '../../../cart/hooks/useUserCart';
import { toast } from 'react-toastify';

function Wishlistcomponent() {
    const { wishlist, removeFromWishlist, isInWishlist } = useUserWishlist();
    const { addToCart, removeFromCart, items } = useUserCart();

    const handleRemoveFromWishlist = (productId, e) => {
        e.preventDefault();
        e.stopPropagation();
        removeFromWishlist(productId);
    };

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

    return (
        <div className="px-4 py-8 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12 ml-4">
                    <p className="text-black font-poppins font-base text-medium">
                        wishlist  ({wishlist.length})  
                    </p>
                    
                    {wishlist.length > 0 && (
                        <button 
                            onClick={() => {
                                wishlist.forEach(product => {
                                    if (!isInCart(product.id)) {
                                        addToCart(product, 1);
                                    }
                                });
                                toast.success(`All items moved to cart!`);
                            }}
                            className="border border-gray-300 px-4 py-2  mr-6 rounded text-black font-poppins text-sm hover:bg-gray-50 transition-colors"
                        >
                            Move All To Bag
                        </button>
                    )}
                </div>

                {wishlist.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold font-poppins text-gray-900 mb-2">Your wishlist is empty</h3>
                        <p className="text-black font-poppins text-medium mb-6">Add some products to your wishlist to see them here</p>
                        <Link 
                            to="/products"
                            className="inline-flex items-center font-poppins px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0.5">
                        {wishlist.map((product, index) => (
                            <div key={product.id}>
                                <Link 
                                    to={`/products/${product.id}`} 
                                    className="bg-white rounded-lg p-1 relative group w-[90%] mx-auto block hover:shadow-lg transition-shadow"
                                >
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
                                    
                                    <button
                                        onClick={(e) => handleRemoveFromWishlist(product.id, e)}
                                        className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors group"
                                        title="Remove from wishlist"
                                    >
                                        <svg className="w-4 h-4 text-black group-hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-black font-poppins font-medium text-[12px] leading-tight">
                                        {product.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <p className="text-[#DB4444] font-poppins font-medium text-[14px]">
                                            ${product.price || 'N/A'}
                                        </p>
                                    </div>
                                   
                                    <div className="flex items-center gap-1">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => {
                                                const rating = (index % 5) + 1;
                                                const isFilled = i < rating;
                                                return (
                                                    <svg key={i} className={`w-4 h-4 ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                );
                                            })}
                                        </div>
                                        <span className="text-gray-500 text-xs">({Math.floor(Math.random() * 300) + 35})</span>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
}

export default Wishlistcomponent;