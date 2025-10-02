import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../lib/axios';

// Hook for fetching explore our products
export const useExploreProducts = (page = 0) => {
  return useQuery({
    queryKey: ['exploreProducts', { page }],
    queryFn: async () => {
      try {
        console.log('Fetching explore products for page:', page);
        
        // Fetch 8 products for the current page
        const allProducts = [];
        let attempts = 0;
        const maxAttempts = 30;
        const startOffset = page * 8;
        
        while (allProducts.length < 8 && attempts < maxAttempts) {
          try {
            const response = await httpClient.get(`/products`, {
              params: { 
                offset: startOffset + attempts,
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
                
                // Add explore product properties
                const exploreProduct = {
                  ...product,
                  isExploreProduct: true,
                  page: page,
                  index: allProducts.length
                };
                
                allProducts.push(exploreProduct);
                console.log(`Added explore product ${allProducts.length} for page ${page}: ${product.title}`);
              }
            }
            
            attempts++;
          } catch (productErr) {
            console.warn(`Failed to fetch product at offset ${startOffset + attempts}:`, productErr);
            attempts++;
          }
        }
        
        console.log('Explore products fetched for page', page, ':', allProducts.length);
        
        if (allProducts.length === 0) {
          throw new Error("No explore products found. Please try again later.");
        }
        
        return {
          products: allProducts,
          totalCount: allProducts.length,
          page: page,
          hasMore: allProducts.length === 8 // If we got full 8, there might be more
        };
        
      } catch (error) {
        console.error("Error fetching explore products:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - explore products change moderately
    cacheTime: 15 * 60 * 1000, // 15 minutes
    retry: 2, // Retry 2 times on failure
    retryDelay: 1000, // 1 second delay between retries
    keepPreviousData: true, // Keep previous page data while loading new page
  });
};
