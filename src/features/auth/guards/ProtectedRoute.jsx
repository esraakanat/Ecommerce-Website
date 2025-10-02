import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store';
import { createRedirectUrl } from '../../../shared/utilities/authRedirect';

const ProtectedRoute = ({ children, redirectTo = '/login' }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // If user is authenticated, render the protected component
  if (isAuthenticated) {
    return children;
  }

  // If user is not authenticated, redirect to login with next parameter
  const redirectUrl = createRedirectUrl(location.pathname, location.search, redirectTo);
  
  return <Navigate to={redirectUrl} replace />;
};

export default ProtectedRoute;
