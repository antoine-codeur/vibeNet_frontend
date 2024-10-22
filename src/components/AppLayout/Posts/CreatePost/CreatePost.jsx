import React, { useState } from 'react';
import apiFetch from '../../../../utils/apiFetch';
import './CreatePost.css';

const CreatePost = ({ blogId, onCreate }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({});

    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    formData.append('type', 'image'); // Ensure type is sent

    try {
      const response = await apiFetch(`/blogs/${blogId}/posts`, 'POST', formData, true);

      if (response.success) {
        setMessage('Post created successfully');
        onCreate(response.data.data); // Add the new post to the post list
        setContent(''); // Reset the form
        setImage(null);
      } else {
        setErrors(response.data || {});
      }
    } catch (error) {
      console.error("Post creation failed:", error);
      setErrors({ general: ["An unexpected error occurred. Please try again later."] });
    }
  };

  return (
    <div className="createPost">
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {errors && Object.keys(errors).map((key) => (
        <p key={key} style={{ color: 'red' }}>{errors[key].join(', ')}</p>
      ))}

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder='Add your content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
