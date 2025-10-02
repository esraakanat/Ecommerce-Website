import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { appRoutes } from './routeDefinitions';

// استيراد مسارات الميزات
import homeRoutes from '../features/home/routes';
import productsRoutes from '../features/products/routes';
import cartRoutes from '../features/cart/routes';
import authRoutes from '../features/auth/routes';
import contactRoutes from '../features/contact/routes';
import aboutRoutes from '../features/about/routes';
import { WhislistRoutes } from '../features/whislist/router';
import checkoutRoutes from '../features/checkout/routers';
// استيراد مكون 404
import NotFoundPage from '../shared/components/error/NotFoundPage';

// تعريف المسارات الرئيسية
const routes = [
  {
    path: '/',
    element: <Outlet />,
    children: [
      ...homeRoutes,
      ...productsRoutes,
      ...contactRoutes,
      ...cartRoutes,
      ...authRoutes,
      ...aboutRoutes,
      ...WhislistRoutes,
      ...checkoutRoutes,
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
];

// إنشاء الراوتر
const router = createBrowserRouter(routes);

// مكون مقدم الراوتر
export function AppRouterProvider() {
  return <RouterProvider router={router} />;
}

// تصدير المسارات للاستخدام في المكونات الأخرى
export { appRoutes };
