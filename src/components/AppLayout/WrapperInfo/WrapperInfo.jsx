import React, { useEffect, useState, useContext } from 'react';
import './WrapperInfo.css';
import ProfileCard from './ProfileCard/ProfileCard';
import BlogDetail from './BlogDetail/BlogDetail';
import apiFetch from '../../../utils/apiFetch';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext'; // Get the Auth context

const WrapperInfo = () => {
  const [profileData, setProfileData] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to control burger menu
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

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the sidebar visibility
  };

  return (
    <>
      <button className="burger" onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
          <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 4c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm3 14h-6v-2h2v-4h-2v-2h4v6h2v2z"/>
        </svg>
      </button>
      <div className={`wrapperInfo ${isOpen ? 'open' : 'close'}`}>
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
    </>
  );
};

export default WrapperInfo;
