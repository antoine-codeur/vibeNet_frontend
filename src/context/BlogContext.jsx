import React, { createContext, useState, useEffect, useContext } from 'react';
import apiFetch from '../utils/apiFetch';
import { AuthContext } from './AuthContext';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [hasBlog, setHasBlog] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [ownerBlogId, setOwnerBlogId] = useState(null); // Store the user's blog ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setHasBlog(false);
      setBlogData(null);
      setOwnerBlogId(null); // Clear blog ID when not authenticated
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        const response = await apiFetch('/owner/blog', 'GET');
        if (response.success) {
          const blog = response.data.data;
          setBlogData(blog);
          setOwnerBlogId(blog.id); // Store the blog ID for ownership checks
          setHasBlog(true);
        } else {
          setHasBlog(false);
        }
      } catch (err) {
        setError('Failed to fetch blog information');
        setHasBlog(false);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [isAuthenticated]);

  return (
    <BlogContext.Provider value={{ hasBlog, blogData, ownerBlogId, loading, error }}>
      {children}
    </BlogContext.Provider>
  );
};
