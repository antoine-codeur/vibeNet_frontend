import React, { createContext, useState, useEffect, useContext } from 'react';
import apiFetch from '../utils/apiFetch';
import { AuthContext } from './AuthContext';

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);  // Get authentication status
  const [subscribedBlogs, setSubscribedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Move fetchSubscribedBlogs outside so it can be reused
  const fetchSubscribedBlogs = async () => {
    try {
      const response = await apiFetch('/subscriptions', 'GET');
      if (response.success) {
        setSubscribedBlogs(response.data.data);
      } else {
        setError('Failed to fetch subscribed blogs');
      }
    } catch (err) {
      setError('Error fetching subscriptions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false); // Don't load if user isn't authenticated
      return;
    }

    fetchSubscribedBlogs();  // Call the function inside useEffect
  }, [isAuthenticated]); // Wait for authentication before fetching

  const subscribeToBlog = async (blogId) => {
    const response = await apiFetch(`/subscriptions/${blogId}`, 'POST');
    if (response.success) {
      fetchSubscribedBlogs(); // Refresh subscriptions after subscribing
    }
  };

  const unsubscribeFromBlog = async (blogId) => {
    const response = await apiFetch(`/subscriptions/${blogId}`, 'DELETE');
    if (response.success) {
      fetchSubscribedBlogs(); // Refresh subscriptions after unsubscribing
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscribedBlogs,
        loading,
        error,
        subscribeToBlog,
        unsubscribeFromBlog,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
