
import { lazy } from 'react';

const Products = lazy(() => import('../pages/products.jsx'))
const ProductDetails = lazy(() => import('../pages/product-details.jsx'))

 const productsRoutes = [
  {
    path: '/products',
    element: <Products />
  },
  {
    path: '/products/:id',
    element: <ProductDetails />
  }
];

export default productsRoutes;


