import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../lib/axios';
import { ensureProductImage } from '../../../shared/utils/imageUtils';

export const useQueryFlash = () => {
  return useQuery({
    queryKey: ['flashProducts'],
    queryFn: async () => {
      try {
        const allProducts = [];
        let attempts = 0;
        const maxAttempts = 15; 
        
        while (allProducts.length < 12 && attempts < maxAttempts) {
          try {
            const response = await httpClient.get(`/products`, {
              params: { 
                offset: attempts * 3, 
                limit: 3,
                mix_categories: true,
                randomize: true
              },
            });
            
            if (response.data && response.data.length > 0) {
              for (const product of response.data) {
                if (allProducts.length >= 12) break;
                
                const productWithImage = ensureProductImage(product);
                 
                const discountPercent = [40, 35, 30, 25][allProducts.length % 4];
                const originalPrice = productWithImage.price;
                const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
                
                const flashProduct = {
                  ...productWithImage,
                  hasOffer: true,
                  originalPrice,
                  discountedPrice,
                  discountPercent,
                  isFlashSale: true
                };
                
                allProducts.push(flashProduct);
              }
            }
            
            attempts++;
          } catch (productErr) {
            console.warn(`Failed to fetch products at attempt ${attempts}:`, productErr);
            attempts++;
          }
        }
        
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
    staleTime: 10 * 60 * 1000,
    cacheTime: 30 * 60 * 1000, 
    retry: 1, 
    retryDelay: 500, 
  });
};
