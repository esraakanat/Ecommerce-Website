
import {lazy} from 'react';

const Contact = lazy(() => import('../pages/contact'))

 export const contactRoutes = [
  {
    path: '/contact',
    element: <Contact />
  },
];

export default contactRoutes;


