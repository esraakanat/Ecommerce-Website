import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../lib/axios';

// Helper function to add offers to products (deterministic)
const addOffersToProducts = (productsList) => {
  if (!productsList || productsList.length === 0) return [];
  
  return productsList.map((product, index) => {
    // Use deterministic logic instead of Math.random() for consistent offers
    const shouldHaveOffer = (index * 3) % 10 < 3; // 30% chance but deterministic
    
    if (shouldHaveOffer) {
      const discountPercent = [40, 35, 30, 25][index % 4];
      const originalPrice = product.price;
      const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
      
      return {
        ...product,
        hasOffer: true,
        originalPrice,
        offerPrice: discountedPrice,
        discountPercent
      };
    }
    
    return {
      ...product,
      hasOffer: false,
      originalPrice: product.price,
      offerPrice: product.price
    };
  });
};

// Hook for product search with React Query
export const useProductSearch = (searchQuery, limit = 16) => {
  return useQuery({
    queryKey: ['productSearch', searchQuery, limit],
    queryFn: async () => {
      if (!searchQuery || searchQuery.trim() === '') {
        return {
          products: [],
          totalCount: 0,
          success: false,
          message: 'No search query provided'
        };
      }

      try {
        
        const response = await httpClient.get(`/products`, {
          params: { 
            title: searchQuery,
            limit: limit * 2, // Get more products for search
            mix_categories: true
          },
        });
        
        if (response.data && response.data.length > 0) {
          
          // Filter products with valid images
          const productsWithImages = response.data.filter(product => 
            product.images && 
            product.images.length > 0 && 
            product.images[0] && 
            product.images[0] !== '' &&
            !product.images[0].includes('placeholder') &&
            !product.images[0].includes('600') &&
            !product.images[0].includes('400')
          );
          
          
          // Add offers to search results
          const productsWithOffers = addOffersToProducts(productsWithImages);
          
          return {
            products: productsWithOffers,
            totalCount: productsWithImages.length,
            success: true,
            message: `Found ${productsWithImages.length} products for "${searchQuery}"`
          };
        }
        
        return {
          products: [],
          totalCount: 0,
          success: false,
          message: `No products found for "${searchQuery}"`
        };
        
      } catch (error) {
        console.error("Error searching products:", error);
        throw error;
      }
    },
    enabled: !!searchQuery && searchQuery.trim() !== '', // Only run when searchQuery is provided
    staleTime: 2 * 60 * 1000, // 2 minutes - search results can change
    cacheTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, // Retry 2 times on failure
    retryDelay: 1000, // 1 second delay between retries
  });
};
