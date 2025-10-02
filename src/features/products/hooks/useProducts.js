import { useQuery } from '@tanstack/react-query';
import httpClient from '../../../lib/axios';

// Hook for fetching products with filters
export const useProducts = ({ 
  category = 'all', 
  sortBy = 'default', 
  showOffers = false, 
  page = 1, 
  limit = 8,
  categories = []
}) => {
  return useQuery({
    queryKey: ['products', { category, sortBy, showOffers, page, limit }],
    queryFn: async () => {
      try {
        const params = { 
          offset: (page - 1) * limit,
          limit: limit,
          mix_categories: true,
          allowedCategories: ['Clothes', 'Electronics', 'Shoes', 'Miscellaneous', 'Furniture']
        };
      
      // Add category filter if not 'all'
      if (category !== 'all') {
        const categoryId = categories.find(cat => 
          cat.mappedName && cat.mappedName.toLowerCase() === category.toLowerCase()
        )?.id;
        
        if (categoryId) {
          params.categoryId = categoryId;
          delete params.mix_categories;
        }
      }
      
      // Add sorting to API params
      if (sortBy !== 'default') {
        if (sortBy === 'price-low-high') {
          params.sortBy = 'price';
          params.sortOrder = 'asc';
        } else if (sortBy === 'price-high-low') {
          params.sortBy = 'price';
          params.sortOrder = 'desc';
        }
      }
      
      console.log('API Request Debug:', { params, url: '/products' });
      
      const response = await httpClient.get('/products', { params });
      
      console.log('API Response Debug:', {
        data: response.data,
        dataLength: response.data?.length,
        headers: response.headers,
        status: response.status,
        params
      });
      
      if (response.data && response.data.length > 0) {
        // Filter products with valid images
        const productsWithImages = response.data.filter(product => 
          product.images && 
          product.images.length > 0 && 
          product.images[0] && 
          product.images[0] !== '' &&
          !product.images[0].includes('placeholder') &&
          !product.images[0].includes('600') &&
          !product.images[0].includes('400')
        );
        
        // Add offers to products
        const productsWithOffers = addOffersToProducts(productsWithImages);
        
        // Sort products locally
        const sortedProducts = sortProducts(productsWithOffers, sortBy);
        
        // Filter by offers if needed
        const productsWithOffersFiltered = sortedProducts.filter(product => product.hasOffer);
        const finalProducts = showOffers ? productsWithOffersFiltered : sortedProducts;
        
        console.log('Sale Filter Debug:', {
          showOffers,
          totalProducts: sortedProducts.length,
          productsWithOffers: productsWithOffersFiltered.length,
          finalProducts: finalProducts.length
        });
        
        // Calculate pagination correctly
        // Get real total count by making a separate API call if needed
        let totalCount = response.headers['x-total-count'];
        
        if (!totalCount) {
          // If no total count header, estimate based on current response
          if (response.data.length === limit) {
            // If we got full limit, assume there are many more products
            // Make a conservative estimate: at least 3-4 pages worth
            totalCount = Math.max(50, (page * limit) + 20);
          } else {
            // If we got less than limit, this is probably the last page
            totalCount = (page - 1) * limit + response.data.length;
          }
        }
        
        const totalPages = Math.max(1, Math.ceil(totalCount / limit));
        const hasMoreData = response.data.length === limit; // If we got full limit, there might be more
        
        // Ensure we always have at least 2 pages if we got full limit
        const finalTotalPages = response.data.length === limit ? Math.max(2, totalPages) : totalPages;
        
        console.log('Pagination Calculation:', {
          responseDataLength: response.data.length,
          limit,
          page,
          totalCount,
          totalPages,
          hasMoreData,
          hasTotalCountHeader: !!response.headers['x-total-count']
        });
        
        
        
        return {
          products: finalProducts,
          totalCount,
          hasMoreData,
          totalPages: finalTotalPages
        };
      }
      
      return {
        products: [],
        totalCount: 0,
        hasMoreData: false
      };
      } catch (error) {
        console.error('API Error:', error);
        throw error;
      }
    },
    enabled: categories.length > 0 || category === 'all', // Only run when categories are loaded
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for fetching categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await httpClient.get('/categories');
      
      if (response.data && response.data.length > 0) {
        // Map all categories to standardized names
        const mappedCategories = response.data.map(category => ({
          ...category,
          mappedName: mapCategoryName(category.name),
          originalName: category.name
        }));
        
        // Filter to only include the 5 main categories we want
        const validCategories = mappedCategories.filter(category => 
          category && 
          category.mappedName && 
          ['Clothes', 'Electronics', 'Furniture', 'Shoes', 'Miscellaneous'].includes(category.mappedName)
        );
        
        return validCategories;
      }
      
      return [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - categories don't change often
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Helper function to map category names
const mapCategoryName = (categoryName) => {
  if (!categoryName) return null;
  
  const name = categoryName.toLowerCase();
  
  if (name.includes('cloth') || name.includes('clothing') || name.includes('apparel')) {
    return 'Clothes';
  } else if (name.includes('electronic') || name.includes('tech')) {
    return 'Electronics';
  } else if (name.includes('furniture') || name.includes('home')) {
    return 'Furniture';
  } else if (name.includes('shoe') || name.includes('footwear')) {
    return 'Shoes';
  } else if (name.includes('misc') || name.includes('other') || name.includes('general')) {
    return 'Miscellaneous';
  }
  
  return categoryName;
};

// Helper function to add offers to products
const addOffersToProducts = (productsList) => {
  if (!productsList || productsList.length === 0) return productsList;
  
  const productsWithOffers = [...productsList];
  const offersCount = Math.floor(productsList.length / 4) * 2; // 2 offers every 4 products (more offers)
  
  // Add offers to specific products based on their ID to ensure consistency
  for (let i = 0; i < offersCount; i++) {
    const productIndex = (i * 2) % productsList.length; // Use deterministic index instead of random
    const product = productsWithOffers[productIndex];
    
    if (product && !product.hasOffer) {
      const discountPercent = [40, 35, 30, 25][i % 4];
      const originalPrice = product.price;
      const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));
      
      productsWithOffers[productIndex] = {
        ...product,
        hasOffer: true,
        originalPrice,
        discountedPrice,
        discountPercent
      };
    }
  }
  
  console.log('Offers added:', productsWithOffers.filter(p => p.hasOffer).length, 'out of', productsList.length);
  
  return productsWithOffers;
};

// Helper function to sort products
const sortProducts = (productsList, sortType) => {
  if (!productsList || productsList.length === 0) return productsList;

  const sortedProducts = [...productsList];
  
  switch (sortType) {
    case 'price-low-high':
      return sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
    
    case 'price-high-low':
      return sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
    
    default:
      return sortedProducts;
  }
};
