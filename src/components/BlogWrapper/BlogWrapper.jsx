import React, { useEffect, useState } from 'react';
import './BlogWrapper.css';
import { Link } from 'react-router-dom'; // Import Link

const BlogWrapper = ({ limit }) => {
  const [blogWrapper, setBlogWrapper] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/explore');
        const data = await response.json();
        if (data.success) {
          setBlogWrapper(data.data.slice(0, limit));
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [limit]);

  return (
    <div className="BlogWrapperContainer">
      {/* Logo linking to home */}
      <Link to="/" className="logo"> {/* Link to home */}
        <svg className="vibenet_logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342.9 311.94">
          <path d="M57.55.94c23.96-1.65-1.81.88-6.05,18.79-2.31,9.76-.16,20.12,3.15,29.36.05.15.11.29.18.44,19,38.64,91.2,221.74,103.22,240.43,6.09,9.47,18.61,21,30.27,21.99h0c-19.62-2.17-44.09.74-56.1-17.99-6.7-10.44-75.85-186.06-94.23-222.66-.88-1.75-.44-3.86,1.05-5.13,2.62-2.24,6.48-5.01,3.58-13.65-7.23-21.55-35.41-9.09-12.64,15.43.34.37.63.8.82,1.26l92.54,221.55c1.22,2.59,2.8,4.86,4.68,6.87,3.75,4.01-1.94,9.91-5.93,6.13-1.76-1.67-3.24-3.59-4.4-5.8-2.83-5.39-21.68-56.32-28.25-71.95C79.25,201.77,11.54,48.98,10.32,38.92,6.91,10.72,35.17,2.48,57.55.94Z"/>
          <path d="M298.51.54c-8.35,4.03-16.49,9.05-21.8,16.79-7.69,11.22-56.68,135.8-74.41,176.49-1.41,3.23-5.91,3.45-7.63.37-4.41-7.9-11.12-19.91-13.73-24.59-.68-1.22-.72-2.69-.11-3.94,13.79-28.25,56.55-140.1,62.79-149.93,5.25-8.27,16.52-14.47,26.24-15.59,1.35-.16,28.63-.34,28.66.4"/>
          <path d="M44.63.14c9.01.37-9.75,2.06-11.3,2.4C21.64,5.04,8.89,11.61,5.48,23.73c-1.55,5.49,1.52,9.97-1.61,7.2C.25,27.72-3.75,14.08,6.69,6.54,14.09,1.18,35.44-.24,44.63.14Z"/>
          <path d="M34.94,47.31c5.04-1.51,3.08,10.36,2.42,10.39-3.5.18-7.95-8.73-2.42-10.39Z"/>
          <path d="M313.48,1.74c20.6-2.84,35.4,16.46,27.04,35.58l-112.09,260.36c-.08.18-.17.36-.27.53-17.7,29.93-53.7,3.78-66.04-24.24L62.83,39.71C49.87,5.81,86.48-10.4,104.81,15.73c6.3,8.97,67.05,163.16,88.25,208.56,1.57,3.36,6.37,3.26,7.8-.16L281.6,30.92c4.44-10.62,20.09-27.56,31.89-29.18Z"/>
        </svg>
      </Link>

      {loading ? (
        <div className="loading">
          <i className="fa fa-spinner"></i>
        </div>
      ) : (
        blogWrapper.map(blog => 
          blog.logo ? (
            <Link to={`/blog/${blog.id}`} key={blog.id}> {/* Link to individual blog */}
              <div
                className="BlogWrapper"
                style={{ backgroundImage: `url(http://127.0.0.1:8000/storage/${blog.logo})` }}
              ></div>
            </Link>
          ) : (
            <Link to={`/blog/${blog.id}`} key={blog.id}> {/* Link to individual blog */}
              <div className="BlogWrapper">
                <i className="fa fa-user-circle default-icon"></i>
              </div>
            </Link>
          )
        )
      )}
    </div>
  );
};

export default BlogWrapper;
