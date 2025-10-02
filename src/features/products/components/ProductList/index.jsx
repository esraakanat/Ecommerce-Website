import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ProductListSkeleton from "../../../../shared/components/loading/ProductListSkeleton";
import ProductsErrorState from "../../../../shared/components/error/ProductsErrorState";
import EmptyProducts from "../../../../shared/components/empty/EmptyProducts";
import ProductFiltersContainer from "../ProductFiltersContainer";
import ProductSearch from "../ProductSearch";
import Pagination from "../../../../shared/components/Pagination";
import { useUserWishlist } from "../../../whislist/hooks/useUserWishlist";
import { useUserCart } from "../../../cart/hooks/useUserCart";
import { useProducts, useCategories } from "../../hooks/useProducts";
import { toast } from "react-toastify";

export default function ProductsList({ 
  searchQuery = null, 
  initialCategory = null, 
  initialSort = null, 
  initialSale = null,
  initialPage = null
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // State for filters
  const [page, setPage] = useState(initialPage ? parseInt(initialPage) : 1);
  const [sortBy, setSortBy] = useState(initialSort || 'default');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [showOffers, setShowOffers] = useState(initialSale === 'true');
  const limit = 8; // 8 منتجات في الصفحة
  
  // State for search results
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  
  // Wishlist store
  const { addToWishlist, removeFromWishlist, isInWishlist } = useUserWishlist();
  const { addToCart, removeFromCart, items } = useUserCart();
  
  // React Query hooks
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const { 
    data: productsData, 
    isLoading: productsLoading, 
    error: productsError,
    refetch: refetchProducts
  } = useProducts({
    category: selectedCategory,
    sortBy,
    showOffers,
    page,
    limit,
    categories: categoriesData || []
  });
  
  // Loading and error states
  const loading = productsLoading || categoriesLoading;
  const error = productsError;
  
  // Extract data from query results
  const products = productsData?.products || [];
  const totalProducts = productsData?.totalCount || 0;
  const hasMorePages = productsData?.hasMoreData || false;
  const totalPages = productsData?.totalPages || Math.max(1, Math.ceil(totalProducts / limit));
  
  // Always show pagination when there are products
  const shouldShowPagination = true;
  
  // Debug pagination values
  console.log('Pagination Debug:', {
    totalPages,
    hasMorePages,
    productsLength: products.length,
    limit,
    totalProducts,
    shouldShowPagination,
    page,
    loading,
    error,
    selectedCategory,
    sortBy,
    showOffers
  });
  
  
  

  // Function to update URL with current filters
  const updateURL = (newCategory, newSort, newSale, newPage = null) => {
    const params = new URLSearchParams(location.search);
    
    // Update or remove category parameter
    if (newCategory && newCategory !== 'all') {
      params.set('category', newCategory);
    } else {
      params.delete('category');
    }
    
    // Update or remove sort parameter
    if (newSort && newSort !== 'default') {
      params.set('sort', newSort);
    } else {
      params.delete('sort');
    }
    
    // Update or remove sale parameter
    if (newSale) {
      params.set('sale', 'true');
    } else {
      params.delete('sale');
    }
    
    // Update or remove page parameter
    if (newPage && newPage > 1) {
      params.set('page', newPage.toString());
    } else {
      params.delete('page');
    }
    
    // Update URL without page reload
    const newURL = `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    navigate(newURL, { replace: true });
  };
  // Handle filter changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPage(1); // Reset to first page
    updateURL(category, sortBy, showOffers);
    // Invalidate products query to refetch with new category
    queryClient.invalidateQueries(['products']);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setPage(1); // Reset to first page
    updateURL(selectedCategory, sort, showOffers);
    // Invalidate products query to refetch with new sort
    queryClient.invalidateQueries(['products']);
  };

  const handleOffersChange = (offers) => {
    setShowOffers(offers);
    setPage(1); // Reset to first page
    updateURL(selectedCategory, sortBy, offers);
    // Invalidate products query to refetch with new offers filter
    queryClient.invalidateQueries(['products']);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    console.log('ProductList handlePageChange called:', { newPage, currentPage: page });
    setPage(newPage);
    updateURL(selectedCategory, sortBy, showOffers, newPage);
    // React Query will automatically refetch when page state changes
    // Force scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle search results from ProductSearch component
  const handleSearchProductsChange = (searchResults) => {
    setSearchProducts(searchResults);
  };


  const handleSearchLoadingChange = (isLoading) => {
    setSearchLoading(isLoading);
  };

  const handleSearchErrorChange = (searchErr) => {
    setSearchError(searchErr);
  };

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

  // Sort products function
  const sortProducts = (productsList, sortType) => {
    if (!productsList || productsList.length === 0) return productsList;

    const sortedProducts = [...productsList];
    
    switch (sortType) {
      case 'price-low-high':
        return sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
      
      case 'price-high-low':
        return sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
      
      default:
        return sortedProducts;
    }
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

  // Track previous page for breadcrumb
  useEffect(() => {
    // Save current page as previous page for breadcrumb
    sessionStorage.setItem('previousPage', location.pathname + location.search);
  }, [location]);

  // Function to retry loading products
  const handleRetry = () => {
    // Invalidate and refetch the products query
    queryClient.invalidateQueries(['products']);
    refetchProducts();
  };

  // If search query exists, render ProductSearch component
  if (searchQuery) {
    return (
      <ProductSearch
        searchQuery={searchQuery}
        onProductsChange={handleSearchProductsChange}
        onLoadingChange={handleSearchLoadingChange}
        onErrorChange={handleSearchErrorChange}
      />
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="px-4 py-8 max-w-7xl mx-auto">
        {/* Main Header */}
        <div className="flex items-center justify-between pt-8 pb-4 px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold  font-inter text-black">
              Browser Our Products
            </h1>
          </div>
          
          
          {/* Navigation Arrows */}
            <div className="flex gap-2">
              <button 
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  page === 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => handlePageChange(page + 1)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
        </div>

        {/* All Filters */}
          <ProductFiltersContainer
            categories={categoriesData || []}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            productsCount={products.length}
            showOffers={showOffers}
            onOffersChange={handleOffersChange}
          />
    
      {/* Products Grid */}
      <div className="px-4 pb-4">
        {loading && <ProductListSkeleton />}
        
        {error && (
          <ProductsErrorState
            title="Failed to Load Products"
            message="We couldn't load the products. This might be due to a network issue or server problem."
            onRetry={handleRetry}
            showRetry={true}
          />
        )}
        
        {!loading && !error && products.length === 0 && (
          selectedCategory !== 'all' ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products in this category</h3>
              <p className="text-gray-500 mb-4">We couldn't find any products in the "{selectedCategory}" category</p>
              <p className="text-sm text-gray-400">Try selecting a different category or browse all products</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Show All Products
              </button>
            </div>
          ) : (
            <EmptyProducts />
          )
        )}
        
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ">
            {products.map((product, index) => (
            <Link key={product.id} to={`/products/${product.id}`} className="bg-white rounded-lg p-1 relative group w-[75%] mx-auto block hover:shadow-lg transition-shadow">
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
                
                {/* Add to Cart Button - Inside Image */}
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
                
                {/* Offers Badge */}
                {product.hasOffer && (
                  <div className="absolute top-2 left-2 bg-[#DB4444] text-white px-2 py-1 rounded text-xs font-poppins font-sm">
                    -{product.discountPercent}%
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
              </div>

              {/* Product Info */}
              <div className="space-y-0.5">
                <h3 className=" text-black font-poppins  font-medium text-[10px]  leading-tight">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2">
                  {product.hasOffer ? (
                    <>
                      <p className="text-[#DB4444] font-poppins font-medium text-[12px]">
                        ${product.discountedPrice}
                      </p>
                      <p className="text-gray-500 font-poppins text-[12px] line-through">
                        ${product.originalPrice}
                      </p>
                    </>
                  ) : (
                    <p className="text-[#DB4444] font-poppins font-medium text-[12px]">
                      ${product.price || 'N/A'}
                    </p>
                  )}
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => {
                      const rating = (index % 5) + 1; // 1, 2, 3, 4, 5
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
        )}
      </div>
      
      {/* Pagination - Always show when there are products */}
      {!loading && !error && products.length > 0 && (
        <div className="px-4 py-8 max-w-7xl mx-auto border-t border-gray-200">
          <div className="flex flex-col items-center space-y-4">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              hasMorePages={hasMorePages}
              className="w-full"
            />
            
            {/* Page Info */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Showing page <span className="font-medium text-gray-900">{page}</span> of <span className="font-medium text-gray-900">{totalPages}</span>
                {totalProducts > 0 && (
                  <span> • {totalProducts} products total</span>
                )}
                {hasMorePages ? ' (more pages available)' : ' (last page)'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}