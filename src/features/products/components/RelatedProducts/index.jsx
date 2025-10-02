import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpClient from "../../../../lib/axios";
import Loader from "../../../../shared/components/loading/Loader";
import EmptyRelatedProducts from "../../../../shared/components/empty/EmptyRelatedProducts";
import { useUserCart } from "../../../cart/hooks/useUserCart";
import { toast } from "react-toastify";

export default function RelatedProducts({ categoryId, currentProductId }) {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  console.log('RelatedProducts - currentProductId:', currentProductId);
  
  const { addToCart, removeFromCart, items } = useUserCart();

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

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response;
        if (!categoryId) {
          response = await httpClient.get(`/products`, {
            params: { limit: 4, mix_categories: true, randomize: true }
          });
        } else {
          response = await httpClient.get(`/categories/${categoryId}/products`);
        }

        const filtered = response.data
          .filter((p) => p.id !== currentProductId)
          .filter((p) => p.images?.[0] && p.images[0] !== '' && !p.images[0].includes('placeholder') && !p.images[0].includes('600') && !p.images[0].includes('400'))
          .slice(0, 4);

        setRelated(filtered);
      } catch (err) {
        console.error("Error fetching related products:", err);
        setError("Failed to load related products");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [categoryId, currentProductId]);

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="text-center py-8">
        <p className="text-red-500 font-poppins text-lg">{error}</p>
      </div>
    );

  if (related.length === 0)
    return <EmptyRelatedProducts />;

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Header Section - Responsive */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-2 h-5 sm:w-3 sm:h-7 rounded-sm bg-[#DB4444]"></div>
          <span className="text-[#DB4444] text-xs sm:text-sm font-medium">Related items</span>
        </div>

        {/* Products Grid - Fully Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {related.map((product, index) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col group relative"
            >
              {/* Product Image Container */}
              <div className="relative aspect-square w-full bg-gray-100">
                <div
                  className="w-full h-full bg-center bg-contain bg-no-repeat"
                  style={{ backgroundImage: `url(${product.images[0]})` }}
                />
                
                {/* Add to Cart Button - Responsive */}
                <button
                  onClick={(e) => handleCartToggle(product, e)}
                  className={`absolute bottom-0 left-0 right-0 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-colors ${
                    isInCart(product.id) 
                      ? 'bg-gray-500 hover:bg-gray-600 text-white' 
                      : 'bg-black hover:bg-gray-800 text-white'
                  }`}
                >
                  {isInCart(product.id) ? 'Remove' : 'Add To Cart'}
                </button>

                {/* Action Icons - Responsive */}
                <div className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 flex flex-col gap-1.5 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Info - Responsive */}
              <div className="p-1.5 sm:p-2 flex flex-col gap-0.5 sm:gap-1">
                <h3 className="text-black font-poppins font-medium text-xs sm:text-sm truncate leading-tight">
                  {product.title}
                </h3>
                <p className="text-[#DB4444] font-poppins font-medium text-xs sm:text-sm">
                  ${product.price || 'N/A'}
                  {console.log('Related product data:', product)}
                </p>

                {/* Rating - Responsive */}
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => {
                      const rating = (index % 5) + 1;
                      const isFilled = i < rating;
                      return (
                        <svg key={i} className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${isFilled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
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
    </div>
  );
}
