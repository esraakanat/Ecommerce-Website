import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../lib/axios';
import { ensureProductImage } from '../../../shared/utils/imageUtils';

export const useQueryBestSelling = () => {
  return useQuery({
    queryKey: ['bestSellingProducts'],
    queryFn: async () => {
      try {
        const allProducts = [];
        let attempts = 0;
        const maxAttempts = 16;
        
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
              
              const productWithImage = ensureProductImage(product);
                
              const shouldHaveOffer = Math.random() < 0.6; 
              let bestSellingProduct;
              
              if (shouldHaveOffer) {
                const discountPercent = [40, 35, 30, 25][allProducts.length % 4];
                const originalPrice = productWithImage.price;
                const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
                
                bestSellingProduct = {
                  ...productWithImage,
                  isBestSelling: true,
                  salesCount: Math.floor(Math.random() * 1000) + 100, 
                  rating: (Math.random() * 2) + 3,
                  hasOffer: true,
                  originalPrice,
                  discountedPrice,
                  discountPercent
                };
              } else {
                bestSellingProduct = {
                  ...productWithImage,
                  isBestSelling: true,
                  salesCount: Math.floor(Math.random() * 1000) + 100, 
                  rating: (Math.random() * 2) + 3,
                  hasOffer: false,
                  originalPrice: productWithImage.price,
                  discountedPrice: productWithImage.price
                };
              }
              
              allProducts.push(bestSellingProduct);
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
    staleTime: 10 * 60 * 1000, 
    cacheTime: 30 * 60 * 1000, 
    retry: 2, 
    retryDelay: 1000, 
  });
};
