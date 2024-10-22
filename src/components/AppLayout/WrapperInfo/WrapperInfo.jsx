import React, { useEffect, useState } from 'react';
import './WrapperInfo.css';
import ProfileCard from './ProfileCard/ProfileCard';  // Import ProfileCard
import apiFetch from '../../../utils/apiFetch';

const WrapperInfo = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await apiFetch('/profile', 'GET');
      if (response.success) {
        setProfileData(response.data);
      } else {
        console.error('Failed to fetch profile data:', response.error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="wrapperInfo">
      <h1>Welcome to Mon Application!</h1>
      {profileData ? (
        // Pass the profile data as props to ProfileCard
        <ProfileCard
          image={`${import.meta.env.VITE_BACKEND_URL_UPLOAD}/${profileData.profile_picture}`}
          name={profileData.name}
          bio={profileData.bio || 'No bio available'}
        />
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default WrapperInfo;
