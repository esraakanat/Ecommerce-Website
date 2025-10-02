
import { lazy } from 'react';

const Cart = lazy(() => import('../pages/cart'))

export const cartRoutes = [
  {
    path: '/cart',
    element: <Cart />
  }
];

export default cartRoutes;
