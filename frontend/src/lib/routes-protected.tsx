import React from 'react';
import { Navigate } from 'react-router-dom';
import { RouteProps } from '../types/RouteProps';

const ProtectedRoute: React.FC<RouteProps> = ({ isAuthenticated, children }) => {
  return !isAuthenticated ? <Navigate to="/login" replace /> : children;
};

export default ProtectedRoute;