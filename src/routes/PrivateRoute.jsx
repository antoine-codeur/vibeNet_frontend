import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Optional: Add loading logic if token validation is asynchronous
  // const { isLoading, isAuthenticated } = useContext(AuthContext);

  // if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
