import React from 'react';
import './BlogInfo.css';

const BlogInfo = ({ blog }) => {
  // Vérification si 'blog' existe avant de tenter d'y accéder
  if (!blog) {
    return <div>Blog data not available</div>;
  }

  return (
    <div className="BlogInfoContainer">
      <h1>{blog.name}</h1>
      {blog.image && (
        <img
          src={`http://127.0.0.1:8000/storage/${blog.image}`}
          alt={blog.name}
          className="blogImage"
        />
      )}
      <p>
        {blog.description} lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit am
      </p>
      <div className="blogOwner">
        <h3>
          {blog.owner.name}
          <span>'s Blog</span>
        </h3>
        {blog.owner?.profile_picture && (
          <div className="profilePictureContainer">
            <img
              src={`http://127.0.0.1:8000/storage/${blog.owner.profile_picture}`}
              alt={blog.owner.name}
              className="ownerProfilePicture"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogInfo;
