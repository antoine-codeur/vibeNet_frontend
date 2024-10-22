import React, { useEffect, useState } from 'react';
import apiFetch from '../../../utils/apiFetch';
import './Explore.css';
import BlogCard from '../../../components/AppLayout/BlogCard/BlogCard';

const Explore = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await apiFetch('/explore', 'GET');
      if (response.success && Array.isArray(response.data.data)) {
        setBlogs(response.data.data);
      } else {
        setError('Failed to fetch blogs');
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;

  if (error) return <p>{error}</p>;

  if (blogs.length === 0) {
    return <p>No blogs available to explore</p>;
  }

  return (
    <div className="explore-page">
      <h1>Explore Blogs</h1>
      <div className="blogs-list">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
