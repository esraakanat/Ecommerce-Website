import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../lib/axios';

// Hook for fetching product details
export const useProductDetails = (productId) => {
  return useQuery({
    queryKey: ['productDetails', { productId }],
    queryFn: async () => {
      try {
        console.log('Fetching product details for ID:', productId);
        
        if (!productId) {
          throw new Error('Product ID is required');
        }
        
        const response = await httpClient.get(`/products/${productId}`);
        
        console.log('Product details fetched:', response.data);
        
        if (!response.data) {
          throw new Error('Product not found');
        }
        
        // Add offer to product (same logic as ProductList)
        const addOfferToProduct = (product) => {
          if (!product) return product;
          
          // 30% chance of having an offer
          const hasOffer = Math.random() < 0.3;
          
          if (hasOffer) {
            const discountPercent = [40, 35, 30, 25][Math.floor(Math.random() * 4)];
            const originalPrice = product.price;
            const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
            
            return {
              ...product,
              hasOffer: true,
              originalPrice,
              discountedPrice,
              discountPercent
            };
          }
          
          return product;
        };
        
        const productWithOffer = addOfferToProduct(response.data);
        
        return {
          product: productWithOffer,
          category: response.data.category,
          success: true
        };
        
      } catch (error) {
        console.error("Error fetching product details:", error);
        throw error;
      }
    },
    enabled: !!productId, // Only run if productId exists
    staleTime: 5 * 60 * 1000, // 5 minutes - product details don't change often
    cacheTime: 15 * 60 * 1000, // 15 minutes
    retry: 2, // Retry 2 times on failure
    retryDelay: 1000, // 1 second delay between retries
    retryOnMount: true, // Retry when component mounts
  });
};
