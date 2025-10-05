import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../lib/axios';
import { ensureProductImage } from '../../../shared/utils/imageUtils';

export const useQueryProducts = ({ 
  category = 'all', 
  sortBy = 'default', 
  showOffers = false, 
  page = 1, 
  limit = 8,
  categories = []
}) => {
  return useQuery({
    queryKey: ['products', { category, sortBy, showOffers, page, limit }],
    queryFn: async () => {
      try {
      // For sorting to work properly, we need to fetch all products first, then sort, then paginate
      const params = { 
        offset: 0, // Always start from 0
        limit: 1000, // Fetch more products to enable proper sorting
        mix_categories: true,
        allowedCategories: ['Clothes', 'Electronics', 'Shoes', 'Miscellaneous', 'Furniture']
      };
      
      // Add category filter if not 'all'
      if (category !== 'all') {
        const categoryId = categories.find(cat => 
          cat.mappedName && cat.mappedName.toLowerCase() === category.toLowerCase()
        )?.id;
        
        if (categoryId) {
          params.categoryId = categoryId;
          delete params.mix_categories;
        }
      }
      
      // Note: API doesn't support sorting, so we'll sort locally after fetching
      const response = await httpClient.get('/products', { params });
      
      if (response.data && response.data.length > 0) {
        // Add default image for products without images
        const productsWithDefaultImages = response.data.map(ensureProductImage);
        
        // Now filter products (all should have images now)
        const productsWithImages = productsWithDefaultImages;
        
        // Add offers to products
        const productsWithOffers = addOffersToProducts(productsWithImages);
        
        // Sort products locally
        const sortedProducts = sortProducts(productsWithOffers, sortBy);
        
        // Filter by offers if needed
        const filteredProducts = showOffers ? sortedProducts.filter(product => product.hasOffer) : sortedProducts;
        
        // Apply pagination after sorting
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const finalProducts = filteredProducts.slice(startIndex, endIndex);
        
        // Calculate pagination correctly
        const totalCount = filteredProducts.length;
        const totalPages = Math.max(1, Math.ceil(totalCount / limit));
        const hasMoreData = endIndex < filteredProducts.length;
        
        return {
          products: finalProducts,
          totalCount,
          hasMoreData,
          totalPages
        };
      }
      
      return {
        products: [],
        totalCount: 0,
        hasMoreData: false
      };
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    enabled: categories.length > 0 || category === 'all', // Only run when categories are loaded
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Helper function to map category names
const mapCategoryName = (categoryName) => {
  if (!categoryName) return null;
  
  const name = categoryName.toLowerCase();
  
  if (name.includes('cloth') || name.includes('clothing') || name.includes('apparel')) {
    return 'Clothes';
  } else if (name.includes('electronic') || name.includes('tech')) {
    return 'Electronics';
  } else if (name.includes('furniture') || name.includes('home')) {
    return 'Furniture';
  } else if (name.includes('shoe') || name.includes('footwear')) {
    return 'Shoes';
  } else if (name.includes('misc') || name.includes('other') || name.includes('general')) {
    return 'Miscellaneous';
  }
  
  return categoryName;
};

// Helper function to add offers to products
const addOffersToProducts = (productsList) => {
  if (!productsList || productsList.length === 0) return productsList;
  
  const productsWithOffers = [...productsList];
  const offersCount = Math.floor(productsList.length / 4) * 2; // 2 offers every 4 products (more offers)
  
  // Add offers to specific products based on their ID to ensure consistency
  for (let i = 0; i < offersCount; i++) {
    const productIndex = (i * 2) % productsList.length; // Use deterministic index instead of random
    const product = productsWithOffers[productIndex];
    
    if (product && !product.hasOffer) {
      const discountPercent = [40, 35, 30, 25][i % 4];
      const originalPrice = product.price;
      const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
      
      productsWithOffers[productIndex] = {
        ...product,
        hasOffer: true,
        originalPrice,
        discountedPrice,
        discountPercent
      };
    }
  }
  
  return productsWithOffers;
};

// Helper function to sort products
const sortProducts = (productsList, sortType) => {
  if (!productsList || productsList.length === 0) return productsList;

  const sortedProducts = [...productsList];
  
  switch (sortType) {
    case 'price-low-high':
      return sortedProducts.sort((a, b) => {
        const priceA = a.hasOffer ? a.discountedPrice : a.price;
        const priceB = b.hasOffer ? b.discountedPrice : b.price;
        return (priceA || 0) - (priceB || 0);
      });
    
    case 'price-high-low':
      return sortedProducts.sort((a, b) => {
        const priceA = a.hasOffer ? a.discountedPrice : a.price;
        const priceB = b.hasOffer ? b.discountedPrice : b.price;
        return (priceB || 0) - (priceA || 0);
      });
    
    default:
      return sortedProducts;
  }
};
