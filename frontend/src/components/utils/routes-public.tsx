import React from 'react';
import { Navigate } from 'react-router-dom';
import { RouteProps } from '../interfaces/route-props';

const PublicRoute: React.FC<RouteProps> = ({ isAuthenticated, children }) => {
    return isAuthenticated ? <Navigate to="/" /> : children
}

export default PublicRoute;