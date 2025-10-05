import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store';
import { createRedirectUrl } from '../../../shared/utils/authRedirect';

const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (isAuthenticated) {
    return children;
  }
  const redirectUrl = createRedirectUrl(location.pathname, location.search, redirectTo);
  
  return <Navigate to={redirectUrl} replace />;
};

export default ProtectedRoute;
