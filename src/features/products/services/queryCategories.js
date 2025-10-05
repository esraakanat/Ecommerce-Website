import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../lib/axios';

export const useQueryCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const response = await httpClient.get("/categories");
        
        if (response.data && response.data.length > 0) {
          const allowedCategories = ['Shoes', 'Electronics', 'Furniture', 'Clothes', 'Miscellaneous'];
          const filteredCategories = response.data.filter(category => 
            allowedCategories.some(allowed => 
              category.name.toLowerCase().includes(allowed.toLowerCase())
            )
          );
          
          return {
            categories: filteredCategories,
            totalCount: filteredCategories.length,
            success: true
          };
        }
        
        return {
          categories: [],
          totalCount: 0,
          success: false
        };
        
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000, 
    cacheTime: 30 * 60 * 1000, 
    retry: 2, 
    retryDelay: 1000, 
  });
};
