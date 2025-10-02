import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../lib/axios';

// Hook for fetching flash sale products - OPTIMIZED VERSION
export const useFlashProducts = () => {
  return useQuery({
    queryKey: ['flashProducts'],
    queryFn: async () => {
      try {
        console.log('Fetching flash products (optimized)...');
        
        // OPTIMIZATION: Fetch multiple products in fewer API calls
        const allProducts = [];
        let attempts = 0;
        const maxAttempts = 15; // Reduced from 50 to 15
        
        while (allProducts.length < 12 && attempts < maxAttempts) {
          try {
            // OPTIMIZATION: Fetch 3 products at once instead of 1
            const response = await httpClient.get(`/products`, {
              params: { 
                offset: attempts * 3, // Get 3 products per request
                limit: 3,
                mix_categories: true,
                randomize: true
              },
            });
            
            if (response.data && response.data.length > 0) {
              // Process all products from this response
              for (const product of response.data) {
                if (allProducts.length >= 12) break;
                
                // Check if product has valid image
                if (product.images && 
                    product.images.length > 0 && 
                    product.images[0] && 
                    product.images[0] !== '' &&
                    !product.images[0].includes('placeholder') &&
                    !product.images[0].includes('600') &&
                    !product.images[0].includes('400')) {
                  
                  // Add flash sale properties
                  const discountPercent = [40, 35, 30, 25][allProducts.length % 4];
                  const originalPrice = product.price;
                  const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
                  
                  const flashProduct = {
                    ...product,
                    hasOffer: true,
                    originalPrice,
                    discountedPrice,
                    discountPercent,
                    isFlashSale: true
                  };
                  
                  allProducts.push(flashProduct);
                  console.log(`Added flash product ${allProducts.length}: ${product.title}`);
                }
              }
            }
            
            attempts++;
          } catch (productErr) {
            console.warn(`Failed to fetch products at attempt ${attempts}:`, productErr);
            attempts++;
          }
        }
        
        console.log('Flash products fetched (optimized):', allProducts.length);
        
        if (allProducts.length === 0) {
          throw new Error("No flash sale products found. Please try again later.");
        }
        
        return {
          products: allProducts,
          totalCount: allProducts.length
        };
        
      } catch (error) {
        console.error("Error fetching flash products:", error);
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - increased cache time
    cacheTime: 30 * 60 * 1000, // 30 minutes - longer cache
    retry: 1, // Reduced retries from 2 to 1
    retryDelay: 500, // Faster retry
  });
};
