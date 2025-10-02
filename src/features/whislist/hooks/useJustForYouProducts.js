import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../lib/axios';

// Hook for fetching "Just For You" products - OPTIMIZED VERSION
export const useJustForYouProducts = () => {
  return useQuery({
    queryKey: ['justForYouProducts'],
    queryFn: async () => {
      try {
        console.log('Fetching Just For You products (optimized)...');
        
        // OPTIMIZATION: Fetch multiple products in fewer API calls
        const productsWithImages = [];
        let attempts = 0;
        const maxAttempts = 8; // Reduced from 20 to 8
        
        while (productsWithImages.length < 4 && attempts < maxAttempts) {
          try {
            // OPTIMIZATION: Fetch 2 products at once instead of 1
            const response = await httpClient.get(`/products`, {
              params: { 
                offset: attempts * 2, // Sequential offset instead of random
                limit: 2,
                mix_categories: true,
                randomize: true
              },
            });
            
            if (response.data && response.data.length > 0) {
              // Process all products from this response
              for (const product of response.data) {
                if (productsWithImages.length >= 4) break;
                
                // Check if product has valid image and not already in our list
                if (product.images && 
                    product.images.length > 0 && 
                    product.images[0] && 
                    product.images[0] !== '' &&
                    !product.images[0].includes('placeholder') &&
                    !product.images[0].includes('600') &&
                    !product.images[0].includes('400') &&
                    !productsWithImages.some(p => p.id === product.id)) {
                  productsWithImages.push(product);
                }
              }
            }
            
            attempts++;
          } catch (productErr) {
            console.warn(`Failed to fetch products at attempt ${attempts}:`, productErr);
            attempts++;
          }
        }
        
        console.log('Just For You products fetched (optimized):', productsWithImages.length);
        
        return {
          products: productsWithImages,
          success: true,
          message: `Found ${productsWithImages.length} products for you`
        };
        
      } catch (error) {
        console.error("Error fetching Just For You products:", error);
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - increased cache time
    cacheTime: 30 * 60 * 1000, // 30 minutes - longer cache
    retry: 1, // Reduced retries from 2 to 1
    retryDelay: 500, // Faster retry
    refetchOnWindowFocus: false, // Don't refetch when window gains focus
  });
};
