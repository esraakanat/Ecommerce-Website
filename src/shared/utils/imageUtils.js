
export const ensureProductImage = (product) => {
  if (!product) return product;
  
  
  const hasValidImage = product.images && 
    product.images.length > 0 && 
    product.images[0] && 
    product.images[0] !== '' &&
    !product.images[0].includes('placeholder') &&
    !product.images[0].includes('600') &&
    !product.images[0].includes('400');
  
 
  if (!hasValidImage) {
    return {
      ...product,
      images: ['/images/default-product.svg']
    };
  }
  
  return product;
};


export const getProductImage = (product, index = 0) => {
  if (!product || !product.images || product.images.length === 0) {
    return '/images/default-product.svg';
  }
  
  const image = product.images[index];
  if (!image || image === '' || image.includes('placeholder') || image.includes('600') || image.includes('400')) {
    return '/images/default-product.svg';
  }
  
  return image;
};

export const handleImageError = (event) => {
  event.target.src = '/images/default-product.svg';
};
