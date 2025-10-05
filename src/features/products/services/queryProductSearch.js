import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../lib/axios';
import { ensureProductImage } from '../../../shared/utils/imageUtils';

const addOffersToProducts = (productsList) => {
  if (!productsList || productsList.length === 0) return [];
  
  return productsList.map((product, index) => {
    const shouldHaveOffer = (index * 3) % 10 < 3; 
    
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

export const useQueryProductSearch = (searchQuery, limit = 16) => {
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
            limit: limit * 2, 
            mix_categories: true
          },
        });
        
        if (response.data && response.data.length > 0) {
          const productsWithValidImages = response.data.map(product => 
            ensureProductImage(product)
          );
          const productsWithOffers = addOffersToProducts(productsWithValidImages);
          
          return {
            products: productsWithOffers,
            totalCount: productsWithValidImages.length,
            success: true,
            message: `Found ${productsWithValidImages.length} products for "${searchQuery}"`
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
    enabled: !!searchQuery && searchQuery.trim() !== '', 
    staleTime: 2 * 60 * 1000, 
    cacheTime: 5 * 60 * 1000, 
    retry: 2, 
    retryDelay: 1000, 
  });
};
