import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../lib/axios';

export const useQueryJustForYouProducts = () => {
  return useQuery({
    queryKey: ['justForYouProducts'],
    queryFn: async () => {
      try {
        const productsWithImages = [];
        let attempts = 0;
        const maxAttempts = 8; 
        
        while (productsWithImages.length < 4 && attempts < maxAttempts) {
          try {
            const response = await httpClient.get(`/products`, {
              params: { 
                offset: attempts * 2,
                limit: 2,
                mix_categories: true,
                randomize: true
              },
            });
            
            if (response.data && response.data.length > 0) {
              for (const product of response.data) {
                if (productsWithImages.length >= 4) break;
                
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
    staleTime: 10 * 60 * 1000, 
    cacheTime: 30 * 60 * 1000, 
    retry: 1,
    retryDelay: 500, 
    refetchOnWindowFocus: false, 
  });
};
