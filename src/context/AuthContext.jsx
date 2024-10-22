import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);  // Vérifie si le token existe
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);  // Stocke le token dans le localStorage
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');  // Supprime le token lors de la déconnexion
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
