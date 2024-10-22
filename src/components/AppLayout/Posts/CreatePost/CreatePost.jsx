import React, { useState, useRef } from 'react';
import apiFetch from '../../../../utils/apiFetch';
import './CreatePost.css';
import paperclipIcon from '../../../../assets/icons/paperclip-solid.svg'; // Import paperclip icon
import sendIcon from '../../../../assets/icons/paper-plane-solid.svg'; // Import paper-plane icon

const CreatePost = ({ blogId, onCreate }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null); // Create a ref for file input

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrors({});

    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }
    formData.append('type', 'image');

    try {
      const response = await apiFetch(`/blogs/${blogId}/posts`, 'POST', formData, true);

      if (response.success) {
        setMessage('Post created successfully');
        onCreate(response.data.data); 
        setContent(''); 
        setImage(null);
      } else {
        setErrors(response.data || {});
      }
    } catch (error) {
      console.error("Post creation failed:", error);
      setErrors({ general: ["An unexpected error occurred. Please try again later."] });
    }
  };

  const handleFileClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
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
          ref={fileInputRef}
          style={{ display: 'none' }} // Hide the file input
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={paperclipIcon}
          alt="Attach File"
          className="icon paperclip-icon"
          onClick={handleFileClick} // Trigger file input
        />
        <button type="submit" className="icon-button">
          <img src={sendIcon} alt="Send Post" className="icon send-icon" />
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
