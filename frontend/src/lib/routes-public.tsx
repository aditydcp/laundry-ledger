import React from 'react';
import { Navigate } from 'react-router-dom';
import { RouteProps } from '@/types/RouteProps';
import { useAuth } from '@/hooks/useAuth';

const PublicRoute: React.FC<RouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export default PublicRoute;