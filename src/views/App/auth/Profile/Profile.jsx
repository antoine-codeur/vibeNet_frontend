import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import apiFetch from '../../../../utils/apiFetch';
import './Profile.css';
import PenIcon from '../../../../assets/icons/Pen.svg';

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
      const response = await apiFetch('/profile', 'GET');

      if (response.success) {
        const data = response.data;
        setUserData(data);
        setFormData({
          name: data.name,
          email: data.email,
          password: '',
          bio: data.bio || '',
          profile_picture: null,
        });
        setTempProfilePicture(null);
      } else {
        setErrors(response.data || {});
      }
    };

    fetchProfile();
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
      setTempProfilePicture(URL.createObjectURL(files[0]));
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

    const response = await apiFetch('/profile', 'POST', formDataToSend, true);

    if (response.success) {
      setMessage('Profile updated successfully');
      setUserData(response.data);
      setEditableFields({ name: false, email: false, password: false, bio: false });
      setTempProfilePicture(null);
    } else {
      setErrors(response.data || {});
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
            <span>{userData.name} 
              <img src={PenIcon} alt="Edit" onClick={() => toggleEdit('name')} style={{ cursor: 'pointer', width: '16px', height: '16px' }} />
            </span>
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
            <span>{userData.email} 
              <img src={PenIcon} alt="Edit" onClick={() => toggleEdit('email')} style={{ cursor: 'pointer', width: '16px', height: '16px' }} />
            </span>
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
            <span>******** 
              <img src={PenIcon} alt="Edit" onClick={() => toggleEdit('password')} style={{ cursor: 'pointer', width: '16px', height: '16px' }} />
            </span>
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
            <span>{userData.bio} 
              <img src={PenIcon} alt="Edit" onClick={() => toggleEdit('bio')} style={{ cursor: 'pointer', width: '16px', height: '16px' }} />
            </span>
          )}
        </div>
        <div className="profile-picture-container">
          <label>Profile Picture:</label>
          <div className="profile-picture-wrapper">
            <img
              src={tempProfilePicture || `${import.meta.env.VITE_BACKEND_URL_UPLOAD}/${userData.profile_picture}`}
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
            {isUploading && <img src={PenIcon} alt="Edit" className="edit-icon" />}
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
