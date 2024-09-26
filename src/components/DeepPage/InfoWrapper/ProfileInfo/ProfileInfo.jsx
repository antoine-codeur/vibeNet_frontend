import React from 'react';
import './ProfileInfo.css';

const ProfileInfo = ({ userData }) => {
  return (
    <div className="profile-info-container">
      <div className="profile-image">
        <img 
          src={`http://127.0.0.1:8000/storage/${userData.profile_picture}`} 
          alt={`${userData.name}'s Profile`} 
          className="profile-picture"
        />
      </div>
      <div className="profile-details">
        <h2 className="profile-name">{userData.name}</h2>
        <p className="profile-bio">{userData.bio || 'No bio available.'}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
