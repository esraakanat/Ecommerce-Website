import { lazy } from 'react';

const About = lazy(() => import('../pages/about'))

export const aboutRoutes = [  
  {
    path: '/about',
    element: <About />
  },

];

export default aboutRoutes;
