
import { lazy } from 'react';
const Login = lazy(() => import('../pages/login'))
const Signup = lazy(() => import('../pages/sign-up'))

export const authRoutes = [

  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
];

export default authRoutes;
