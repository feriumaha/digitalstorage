import React from 'react';
import { useAuth } from "./authprovider";
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  //console.log('AuthRoute isAuthenticated:', isAuthenticated);
  //console.log('AuthRoute loading:', loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthRoute;