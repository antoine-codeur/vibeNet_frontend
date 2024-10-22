import React, { useState, useEffect, useContext } from 'react';
import { BlogContext } from '../../../../context/BlogContext';
import PenIcon from '../../../../assets/icons/Pen.svg';
import { useNavigate } from 'react-router-dom';
import apiFetch from '../../../../utils/apiFetch';
import './UpdateBlog.css';

const UpdateBlog = () => {
  const { blogData, hasBlog, loading, error, fetchBlog } = useContext(BlogContext); // Use blogData and fetchBlog from BlogContext
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    logo: null,
  });
  const [tempImage, setTempImage] = useState(null); // Temporary preview for image
  const [tempLogo, setTempLogo] = useState(null);  // Temporary preview for logo
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [editableFields, setEditableFields] = useState({
    name: false,
    description: false,
    image: false,
    logo: false,
  });
  const navigate = useNavigate();

  // Redirect to create blog page if the user doesn't have a blog
  useEffect(() => {
    if (!loading && !hasBlog) {
      navigate('/settings/blog/create');
    }
  }, [hasBlog, loading, navigate]);

  // Populate the form with existing blog data
  useEffect(() => {
    if (blogData) {
      setFormData({
        name: blogData.name || '',
        description: blogData.description || '',
        image: null,
        logo: null,
      });
    }
  }, [blogData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      if (name === 'image') {
        setFormData({ ...formData, [name]: files[0] });
        setTempImage(URL.createObjectURL(files[0]));
      } else if (name === 'logo') {
        setFormData({ ...formData, [name]: files[0] });
        setTempLogo(URL.createObjectURL(files[0]));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const toggleEdit = (field) => {
    setEditableFields({ ...editableFields, [field]: !editableFields[field] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    const response = await apiFetch(`/blogs/${blogData.id}`, 'POST', formDataToSend, true);

    if (response.success) {
      setMessage('Blog updated successfully');
    } else {
      setErrors(response.data || {});
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog? This action is irreversible.')) {
      const response = await apiFetch(`/blogs/${blogData.id}`, 'DELETE');
      if (response.success) {
        await fetchBlog(); // Refetch the blog data after deletion
        navigate('/settings/blog/create'); // Redirect to create page
      } else {
        setErrors(response.data || {});
      }
    }
  };

  if (loading) return <p>Loading blog data...</p>;
  if (!blogData || error) return <p>{error || 'No blog data available'}</p>; // Handle missing blog data

  return (
    <>
      <h2>Update Blog</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {errors && Object.keys(errors).map((key) => (
        <p key={key} style={{ color: 'red' }}>{errors[key].join(', ')}</p>
      ))}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          {editableFields.name ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          ) : (
            <span>{blogData.name} 
              <img src={PenIcon} alt="Edit" onClick={() => toggleEdit('name')} style={{ cursor: 'pointer', width: '16px', height: '16px' }} />
            </span>
          )}
        </div>
        <div>
          <label>Description:</label>
          {editableFields.description ? (
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          ) : (
            <span>{blogData.description} 
              <img src={PenIcon} alt="Edit" onClick={() => toggleEdit('description')} style={{ cursor: 'pointer', width: '16px', height: '16px' }} />
            </span>
          )}
        </div>
        <div>
          <label>Image:</label>
          {editableFields.image ? (
            <input type="file" name="image" onChange={handleChange} />
          ) : (
            <div className="image-wrapper">
              <img
                src={tempImage || `${import.meta.env.VITE_BACKEND_URL_UPLOAD}/${blogData.image}`}
                alt="Blog"
                className="blog-image"
                onClick={() => toggleEdit('image')}
                style={{ cursor: 'pointer' }}
              />
                <img src={PenIcon} alt="Edit" style={{ cursor: 'pointer', width: '16px', height: '16px' }} onClick={() => toggleEdit('image')} />
            </div>
          )}
        </div>
        <div>
          <label>Logo:</label>
          {editableFields.logo ? (
            <input type="file" name="logo" onChange={handleChange} />
          ) : (
            <div className="logo-wrapper">
              <img
                src={tempLogo || `${import.meta.env.VITE_BACKEND_URL_UPLOAD}/${blogData.logo}`}
                alt="Logo"
                className="blog-logo"
                onClick={() => toggleEdit('logo')}
                style={{ cursor: 'pointer' }}
              />
                <img src={PenIcon} alt="Edit" style={{ cursor: 'pointer', width: '16px', height: '16px' }} onClick={() => toggleEdit('logo')} />
            </div>
          )}
        </div>
        <button type="submit">Update Blog</button>
        <button type="button" onClick={handleDelete} className="delete">Delete Blog</button>
      </form>
    </>
  );
};

export default UpdateBlog;
