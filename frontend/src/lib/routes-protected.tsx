import React from 'react';
import { Navigate } from 'react-router-dom';
import { RouteProps } from '@/types/RouteProps';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;