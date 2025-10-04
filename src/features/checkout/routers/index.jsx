
import { lazy } from 'react';
import ProtectedRoute from '../../auth/guards/ProtectedRoute';

const Checkout = lazy(() => import('../pages/checkout'))

export const checkoutRoutes = [
  {
    path: '/checkout',
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    )
  }
];

export default checkoutRoutes;
