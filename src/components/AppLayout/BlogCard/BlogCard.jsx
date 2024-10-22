import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
  return (
    <div className="blog-card">
      <img
        src={`${import.meta.env.VITE_BACKEND_URL_UPLOAD}/${blog.image}`}
        alt={`${blog.name}'s image`}
        className="blog-image"
      />
      <div className="blog-info">
        <h2>{blog.name}</h2>
        <p>{blog.description}</p>
        <div className="blog-owner">
          {blog.owner?.profile_picture && (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL_UPLOAD}/${blog.owner.profile_picture}`}
              alt={`${blog.owner.name}'s profile`}
              className="owner-image"
            />
          )}
          <span>{blog.owner?.name}</span>
        </div>
        {/* Add a link to the individual blog page */}
        <Link to={`/blogs/${blog.id}`} className="view-blog-link">
          View Blog
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
