import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../lib/axios';


export const usequeryHeroSection = () => {
  return useQuery({
    queryKey: ['heroSection'],
    queryFn: async () => {
      try {
        console.log('Fetching hero section data...');
        
        const response = await httpClient.get("/categories");
        
        if (response.data && response.data.length > 0) {
          console.log('All categories from API:', response.data.map(cat => cat.name));
          
          
          const allowedCategories = ['Shoes', 'Electronics', 'Furniture', 'Clothes', 'Miscellaneous'];
          const filteredCategories = response.data.filter(category => 
            allowedCategories.some(allowed => 
              category.name.toLowerCase().includes(allowed.toLowerCase())
            )
          );
          
          console.log('Filtered categories for hero section:', filteredCategories.map(cat => cat.name));
          
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
        console.error("Error fetching hero section data:", error);
        throw error;
      }
    },
    staleTime: 10 * 60 * 1000, 
    cacheTime: 30 * 60 * 1000, 
    retry: 2, 
    retryDelay: 1000, 
  });
};
