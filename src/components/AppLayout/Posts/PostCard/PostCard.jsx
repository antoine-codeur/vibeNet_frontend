import React from 'react';
import './PostCard.css';

const PostCard = ({ post, isOwner, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post.id);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <p>{new Date(post.created_at).toLocaleDateString()}</p>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
        {post.image_url && (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL_UPLOAD}/${post.image_url}`}
            alt="Post Visual"
            className="post-image"
          />
        )}
      </div>

      <div className="post-actions">
        {isOwner && (
          <button className="delete-button delete" onClick={handleDelete}>
            Delete
          </button>
        )}
        <button className="like-button">Like</button>
        <button className="comment-button">Comment</button>
      </div>
    </div>
  );
};

export default PostCard;
