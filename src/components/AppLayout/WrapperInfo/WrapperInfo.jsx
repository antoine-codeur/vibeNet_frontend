import React, { useEffect, useState, useContext } from 'react';
import './WrapperInfo.css';
import ProfileCard from './ProfileCard/ProfileCard';
import BlogDetail from './BlogDetail/BlogDetail';
import apiFetch from '../../../utils/apiFetch';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext'; // Get the Auth context

const WrapperInfo = () => {
  const [profileData, setProfileData] = useState(null);
  const { isAuthenticated } = useContext(AuthContext); // Check if the user is authenticated
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) return; // Don't fetch if the user is not logged in

    const fetchProfile = async () => {
      const response = await apiFetch('/profile', 'GET');
      if (response.success) {
        setProfileData(response.data);
      } else {
        console.error('Failed to fetch profile data:', response.error);
      }
    };

    fetchProfile();
  }, [isAuthenticated]); // Only fetch profile if authenticated

  const isBlogPage = location.pathname.includes('/blogs/');

  return (
    <div className="wrapperInfo">
      {profileData ? (
        <ProfileCard
          image={`${import.meta.env.VITE_BACKEND_URL_UPLOAD}/${profileData.profile_picture}`}
          name={profileData.name}
          bio={profileData.bio || 'No bio available'}
        />
      ) : (
        <p>Loading profile...</p>
      )}

      {isBlogPage && <BlogDetail />} 
    </div>
  );
};

export default WrapperInfo;
