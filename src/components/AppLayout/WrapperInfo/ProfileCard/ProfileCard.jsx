import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileCard.css';

const ProfileCard = ({ image, name, bio }) => {
  return (
    <div className="profile-card">
      <img src={image} alt={`${name}'s profile`} className="profile-image" />
      <div className="profile-info">
        <h2 className="profile-name">{name}</h2>
        <p className="profile-bio">{bio}</p>
      </div>
      {/* Link to the settings page */}
      <Link to="/settings/profile" className="settings-icon">
        <i className="fas fa-cog"></i>
      </Link>
    </div>
  );
};

export default ProfileCard;
