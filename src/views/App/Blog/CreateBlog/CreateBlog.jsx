import React, { useState, useContext } from 'react';
import apiFetch from '../../../../utils/apiFetch';
import { BlogContext } from '../../../../context/BlogContext'; // Import the BlogContext
import './CreateBlog.css';
import { useNavigate } from 'react-router-dom'; // For navigation after creation

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    logo: null,
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const { fetchBlog } = useContext(BlogContext); // Destructure fetchBlog from BlogContext
  const navigate = useNavigate(); // For navigating to update after creation

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    const response = await apiFetch('/blogs', 'POST', formDataToSend, true);

    if (response.success) {
      setMessage('Blog created successfully!');
      await fetchBlog(); // Refresh the blog data after creation
      navigate('/settings/blog/update'); // Redirect to the update page after creation
    } else {
      setErrors(response.data || {});
    }
  };

  return (
    <>
      <h2>Create a New Blog</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {errors && Object.keys(errors).map((key) => (
        <p key={key} style={{ color: 'red' }}>{errors[key].join(', ')}</p>
      ))}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleChange} />
        </div>
        <div>
          <label>Logo:</label>
          <input type="file" name="logo" onChange={handleChange} />
        </div>
        <button type="submit">Create Blog</button>
      </form>
    </>
  );
};

export default CreateBlog;
