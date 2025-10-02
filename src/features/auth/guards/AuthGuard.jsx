import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store';

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  // If user is authenticated, render the protected component
  if (isAuthenticated) {
    return children;
  }

  // If user is not authenticated, redirect to login with next parameter
  const currentPath = location.pathname;
  const searchParams = location.search;
  
  // Preserve existing query parameters and add next parameter
  const nextUrl = searchParams ? `${currentPath}${searchParams}` : currentPath;
  
  return <Navigate to={`/login?next=${encodeURIComponent(nextUrl)}`} replace />;
};

export default AuthGuard;