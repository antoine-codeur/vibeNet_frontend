import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    profile_picture: null,
  });
  const [tempProfilePicture, setTempProfilePicture] = useState(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [editableFields, setEditableFields] = useState({
    name: false,
    email: false,
    password: false,
    bio: false,
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/v1/profile', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUserData(data);
        setFormData({
          name: data.name,
          email: data.email,
          password: '',
          bio: data.bio || '',
          profile_picture: null,
        });
        setTempProfilePicture(null); // Reset temporaire
      } else {
        setErrors(data.data);
      }
    };

    fetchProfile();
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
      setTempProfilePicture(URL.createObjectURL(files[0])); // Crée une URL temporaire
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

    const token = localStorage.getItem('token');
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    const response = await fetch('http://127.0.0.1:8000/api/v1/profile', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formDataToSend,
    });

    const data = await response.json();
    if (!response.ok) {
      setErrors(data.data);
    } else {
      setMessage(data.message);
      setUserData(data);
      setEditableFields({ name: false, email: false, password: false, bio: false });
      setTempProfilePicture(null); // Réinitialise l'image temporaire
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
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
            <span>{userData.name} <i className="fa fa-pencil" onClick={() => toggleEdit('name')}></i></span>
          )}
        </div>
        <div>
          <label>Email:</label>
          {editableFields.email ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          ) : (
            <span>{userData.email} <i className="fa fa-pencil" onClick={() => toggleEdit('email')}></i></span>
          )}
        </div>
        <div>
          <label>Password:</label>
          {editableFields.password ? (
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          ) : (
            <span>******** <i className="fa fa-pencil" onClick={() => toggleEdit('password')}></i></span>
          )}
        </div>
        <div>
          <label>Bio:</label>
          {editableFields.bio ? (
            <textarea
              name="bio"
              value={formData.bio || ''}
              onChange={handleChange}
            />
          ) : (
            <span>{userData.bio} <i className="fa fa-pencil" onClick={() => toggleEdit('bio')}></i></span>
          )}
        </div>
        <div className="profile-picture-container">
          <label>Profile Picture:</label>
          <div className="profile-picture-wrapper">
            <img
              src={tempProfilePicture || `http://127.0.0.1:8000/storage/${userData.profile_picture}`}
              alt="Profile"
              className={`profile-picture ${isUploading ? 'uploading' : ''}`}
              onMouseEnter={() => setIsUploading(true)}
              onMouseLeave={() => setIsUploading(false)}
              onClick={() => document.getElementById('profile-picture-input').click()}
            />
            <input
              type="file"
              name="profile_picture"
              id="profile-picture-input"
              onChange={handleChange}
              style={{ display: 'none' }}
            />
            {isUploading && <i className="fa fa-pencil edit-icon"></i>}
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
