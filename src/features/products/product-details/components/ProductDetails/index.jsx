import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ProductDetailsLoader from "../../../../../shared/components/loading/ProductDetailsLoader";
import ErrorState from "../../../../../shared/components/error/ErrorState";
import ProductNotFound from "../../../../../shared/components/error/ProductNotFound";
import { useUserWishlist } from "../../../../whislist/hooks/useUserWishlist";
import { useUserCart } from "../../../../cart/hooks/useUserCart";
import ProductBreadcrumb from "../ProductBreadcrumb";
import { useQueryProductDetails } from "../../../services/queryProductDetails";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [availableOptions, setAvailableOptions] = useState({
    colors: [],
    sizes: []
  });

  // React Query hook for product details
  const { 
    data: productData, 
    isLoading: loading, 
    error, 
    refetch: refetchProduct 
  } = useQueryProductDetails(id);
  
  // Extract product and category from query result
  const product = productData?.product;
  const category = productData?.category;

  const { addToWishlist, removeFromWishlist, isInWishlist } = useUserWishlist();
  const { addToCart, removeFromCart, items } = useUserCart();


  // Function to generate random available options
  const generateAvailableOptions = () => {
    const allColors = ["blue", "red", "green", "yellow", "purple", "black", "white"];
    const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
    
    // Always select exactly 4 colors randomly
    const availableColors = allColors
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    
    // Always select exactly 4 sizes randomly
    const availableSizes = allSizes
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    
    setAvailableOptions({
      colors: availableColors,
      sizes: availableSizes
    });
    
    // Set default selections to first available options
    setSelectedColor(availableColors[0]);
    setSelectedSize(availableSizes[0]);
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };

  // Handle cart toggle
  const handleCartToggle = () => {
    if (product) {
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
        addToCart(product, quantity);
        toast.success(`Product added to cart successfully! )`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  // Generate available options when product is loaded
  useEffect(() => {
    if (product) {
      generateAvailableOptions();
    }
  }, [product]);

  // Scroll to top when product changes (for related products navigation)
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [id]); // Trigger when product ID changes

  // Function to retry loading product
  const handleRetry = () => {
    refetchProduct();
  };

  if (loading) return <ProductDetailsLoader />;

  if (error) {
    return (
      <ErrorState
        title="Failed to Load Product"
        message="We couldn't load the product details. This might be due to a network issue or the product might be temporarily unavailable."
        showRetry={true}
        onRetry={handleRetry}
        showBackButton={true}
        backButtonText="Browse Products"
        backButtonLink="/products"
      />
    );
  }

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs */}
      <div className="px-4 py-4 max-w-7xl mx-auto">
        <ProductBreadcrumb product={product} category={category} />
      </div>

      {/* Layout */}
      <div className="px-4 pb-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* يسار - الصور */}
<div className="flex gap-4">
  {/* Thumbnails */}
  <div className="flex flex-col gap-3 w-20">
    {product.images?.map((image, index) => (
      <button
        key={index}
        onClick={() => setSelectedImage(index)}
        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
          selectedImage === index
            ? "border-red-500 shadow-md scale-105"
            : "border-gray-200 hover:border-gray-400"
        }`}
      >
        <img
          src={image}
          alt={`${product.title} ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </button>
    ))}
  </div>

  {/* Main Image */}
  <div className="flex-1">
    <div className="w-full h-[550px] rounded-lg overflow-hidden bg-gray-100">
      <img
        src={product.images?.[selectedImage]}
        alt={product.title}
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>

        {/* يمين - التفاصيل */}
<div className="flex flex-col justify-between h-[500px]">
  {/* القسم العلوي */}
  <div className="space-y-5">
    {/* Title */}
    <h1 className="text-2xl font-semibold">{product.title}</h1>

    {/* Rating */}
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => {
          const rating = product.rating || 4.5;
          const isFilled = i < Math.floor(rating);
          return (
            <svg
              key={i}
              className={`w-5 h-5 ${
                isFilled ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        })}
        <span className="text-sm text-gray-600">
          ({product.reviews || 150} Reviews)
        </span>
      </div>
      <span className="text-green-500 text-sm font-medium">
        In Stock
      </span>
    </div>

    {/* Price */}
    <div className="space-y-2">
      {product.hasOffer ? (
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-[#DB4444]">
            ${product.discountedPrice}
          </span>
          <span className="text-lg text-gray-500 line-through">
            ${product.originalPrice}
          </span>
          <span className="bg-[#DB4444] text-white px-2 py-1 rounded text-sm font-medium">
            -{product.discountPercent}%
          </span>
        </div>
      ) : (
        <div className="text-2xl font-bold">
          ${product.price || 'N/A'}
        </div>
      )}
    </div>

    {/* Description */}
    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
      {product.description}
    </p>

    {/* Colours */}
    <div>
      <h3 className="text-sm font-medium mb-2">Colours:</h3>
      <div className="flex gap-3 flex-wrap">
        {["blue", "red", "green", "yellow", "purple", "black", "white"].map((color) => {
          const isAvailable = availableOptions.colors.includes(color);
          const isSelected = selectedColor === color;
          
          return (
            <div key={color} className="relative">
              <button
                onClick={() => isAvailable && setSelectedColor(color)}
                disabled={!isAvailable}
                className={`w-7 h-7 rounded-full border-2 relative ${
                  isSelected
                    ? "border-black"
                    : isAvailable
                    ? "border-gray-300 hover:border-gray-400"
                    : "border-gray-200 opacity-50 cursor-not-allowed"
                } ${
                  color === "blue" ? "bg-blue-500" :
                  color === "red" ? "bg-red-500" :
                  color === "green" ? "bg-green-500" :
                  color === "yellow" ? "bg-yellow-500" :
                  color === "purple" ? "bg-purple-500" :
                  color === "black" ? "bg-black" :
                  color === "white" ? "bg-white border-gray-400" : ""
                }`}
              >
                {!isAvailable && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>

    {/* Sizes */}
    <div>
      <h3 className="text-sm font-medium mb-2">Size:</h3>
      <div className="flex gap-2 flex-wrap">
        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => {
          const isAvailable = availableOptions.sizes.includes(size);
          const isSelected = selectedSize === size;
          
          return (
            <button
              key={size}
              onClick={() => isAvailable && setSelectedSize(size)}
              disabled={!isAvailable}
              className={`px-3 py-1 text-sm border rounded relative ${
                isSelected
                  ? "bg-red-500 text-white border-red-500"
                  : isAvailable
                  ? "bg-white text-black border-gray-300 hover:border-gray-400"
                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-50"
              }`}
            >
              {size}
              {!isAvailable && (
                <div className="absolute -top-1 -right-1">
                  <svg
                    className="w-3 h-3 text-gray-400 bg-white rounded-full"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>

    {/* Quantity + Buy + Wishlist */}
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center border rounded overflow-hidden">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-3 py-2 hover:bg-gray-100"
        >
          -
        </button>
        <span className="px-4 py-2 border-l border-r">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-3 py-2 bg-red-500 text-white hover:bg-red-600"
        >
          +
        </button>
      </div>

      <button
        onClick={handleCartToggle}
        className={`px-6 py-2 rounded transition ${
          product && isInCart(product.id) 
            ? 'bg-gray-500 hover:bg-gray-600 text-white' 
            : 'bg-red-500 hover:bg-red-600 text-white'
        }`}
      >
        {product && isInCart(product.id) ? 'Remove' : 'Add to Cart'}
      </button>

      <button
        onClick={handleWishlistToggle}
        className={`p-2 border rounded transition ${
          isInWishlist(product?.id)
            ? "border-red-300 bg-red-50"
            : "border-gray-300 hover:bg-gray-50"
        }`}
      >
        <svg
          className={`w-5 h-5 ${
            isInWishlist(product?.id) ? "text-red-500" : "text-black"
          }`}
          fill={isInWishlist(product?.id) ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>
  </div>
{/* القسم السفلي - صندوق الدليفري */}
<div className="flex flex-col gap-3 mt-4">
  {/* Free Delivery */}
  <div className="flex items-start gap-2 border border-gray-200 rounded-md px-3 py-2 max-w-sm">
    <svg
      className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path d="M3 7h13v13H3z" />
      <path d="M16 10h4l1 3v7h-5V10z" />
      <circle cx="7.5" cy="20.5" r="1.2" />
      <circle cx="18.5" cy="20.5" r="1.2" />
    </svg>
    <div>
      <h4 className="font-medium text-gray-800 text-sm">Free Delivery</h4>
      <p className="text-gray-500 text-xs">
        Enter your postal code for Delivery Availability
      </p>
    </div>
  </div>

  {/* Return Delivery */}
  <div className="flex items-start gap-2 border border-gray-200 rounded-md px-3 py-2 max-w-sm">
    <svg
      className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12a9 9 0 0118 0 9 9 0 01-18 0zm0 0l3-3m-3 3l3 3"
      />
    </svg>
    <div>
      <h4 className="font-medium text-gray-800 text-sm">Return Delivery</h4>
      <p className="text-gray-500 text-xs">
        Free 30 Days Delivery Returns.{" "}
        <span className="underline cursor-pointer">Details</span>
      </p>
    </div>
  </div>
</div>




  </div>
</div>

      </div>
  
  );
}
