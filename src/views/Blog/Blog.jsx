import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Blog.css';

const Blog = ({ setBlogData }) => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token'); // Fetch token from localStorage

      if (!token) {
        setError('Token not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/blogs/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Use token from localStorage
            'Accept': 'application/json',
          },
        });
        const data = await response.json();
        if (data.success) {
          setBlog(data.data); // Set the blog data
          setBlogData(data.data); // Pass blog data to InfoWrapper through the setBlogData prop
        } else {
          setError('Failed to load blog data.');
        }
      } catch (error) {
        setError('Failed to fetch blog.'); // Handle fetch error
        console.error('Failed to fetch blog:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchBlog();
  }, [id, setBlogData]); // Ensure setBlogData is a dependency

  if (loading) {
    return <div>Loading blog...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Display any errors
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <div className="blogPageContent">
      <div className="contentWrapper">
        {blog.image && (
          <div className="blog-image">
            <img
              src={`http://127.0.0.1:8000/storage/${blog.image}`}
              alt={blog.name}
              className="blog-main-image"
            />
          </div>
        )}
        <p>{blog.content}</p> {/* Display blog content */}
      </div>
    </div>
  );
};

export default Blog;
