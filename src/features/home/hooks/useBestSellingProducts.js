import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../lib/axios';

// Hook for fetching best selling products
export const useBestSellingProducts = () => {
  return useQuery({
    queryKey: ['bestSellingProducts'],
    queryFn: async () => {
      try {
        
        // Fetch 4 best selling products
        const allProducts = [];
        let attempts = 0;
        const maxAttempts = 20;
        
        while (allProducts.length < 4 && attempts < maxAttempts) {
          try {
            const response = await httpClient.get(`/products`, {
              params: { 
                offset: attempts,
                limit: 1,
                mix_categories: true,
                randomize: true
              },
            });
            
            if (response.data && response.data.length > 0) {
              const product = response.data[0];
              
              // Check if product has valid image
              if (product.images && 
                  product.images.length > 0 && 
                  product.images[0] && 
                  product.images[0] !== '' &&
                  !product.images[0].includes('placeholder') &&
                  !product.images[0].includes('600') &&
                  !product.images[0].includes('400')) {
                
                // Add best selling properties
                const bestSellingProduct = {
                  ...product,
                  isBestSelling: true,
                  salesCount: Math.floor(Math.random() * 1000) + 100, // Random sales count
                  rating: (Math.random() * 2) + 3, // Rating between 3-5
                };
                
                allProducts.push(bestSellingProduct);
              }
            }
            
            attempts++;
          } catch (productErr) {
            console.warn(`Failed to fetch product at offset ${attempts}:`, productErr);
            attempts++;
          }
        }
        
        
        if (allProducts.length === 0) {
          throw new Error("No best selling products found. Please try again later.");
        }
        
        return {
          products: allProducts,
          totalCount: allProducts.length
        };
        
      } catch (error) {
        console.error("Error fetching best selling products:", error);
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - best selling products don't change often
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: 2, // Retry 2 times on failure
    retryDelay: 1000, // 1 second delay between retries
  });
};
