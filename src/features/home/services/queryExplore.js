import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../lib/axios';
import { ensureProductImage } from '../../../shared/utils/imageUtils';

export const useQueryExplore = (page = 0) => {
  return useQuery({
    queryKey: ['exploreProducts', { page }],
    queryFn: async () => {
      try {
        const allProducts = [];
        let attempts = 0;
        const maxAttempts = 30;
        const startOffset = page * 10;
        
        while (allProducts.length < 10 && attempts < maxAttempts) {
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
              
              const productWithImage = ensureProductImage(product);
             
              const shouldHaveOffer = Math.random() < 0.5; 
              let exploreProduct;
              
              if (shouldHaveOffer) {
                const discountPercent = [40, 35, 30, 25][allProducts.length % 4];
                const originalPrice = productWithImage.price;
                const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
                
                exploreProduct = {
                  ...productWithImage,
                  isExploreProduct: true,
                  page: page,
                  index: allProducts.length,
                  hasOffer: true,
                  originalPrice,
                  discountedPrice,
                  discountPercent
                };
              } else {
                exploreProduct = {
                  ...productWithImage,
                  isExploreProduct: true,
                  page: page,
                  index: allProducts.length,
                  hasOffer: false,
                  originalPrice: productWithImage.price,
                  discountedPrice: productWithImage.price
                };
              }
                
              allProducts.push(exploreProduct);
            }
            
            attempts++;
          } catch (productErr) {
            console.warn(`Failed to fetch product at offset ${startOffset + attempts}:`, productErr);
            attempts++;
          }
        }
        
        if (allProducts.length === 0) {
          throw new Error("No explore products found. Please try again later.");
        }
        
        return {
          products: allProducts,
          totalCount: allProducts.length,
          page: page,
          hasMore: allProducts.length === 10 
        };
        
      } catch (error) {
        console.error("Error fetching explore products:", error);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000, 
    cacheTime: 15 * 60 * 1000, 
    retry: 2, 
    retryDelay: 1000, 
    keepPreviousData: true, 
  });
};
