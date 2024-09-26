import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token not found');
      setUserData(null); // Clear user data on logout
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/profile', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data on component mount
  }, []);

  return (
    <UserContext.Provider value={{ userData, error, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};
