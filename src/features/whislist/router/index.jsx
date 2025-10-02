
import { lazy } from 'react';
const Whislist = lazy(() => import('../pages/whislist'))

 export const WhislistRoutes = [
  {
    path: '/wishlist',
    element: <Whislist />
  },
];

export default WhislistRoutes;









