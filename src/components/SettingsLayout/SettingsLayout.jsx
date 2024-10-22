import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SettingsLayout.css';
import SideBar from './SideBar/SideBar';

const SettingsLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // Control sidebar visibility
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000); // Track if it's a mobile view

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle sidebar open/close
  };

  // Update mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
      if (window.innerWidth > 1000) {
        setIsOpen(true); // Always show the sidebar on larger screens
      }
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='bodySettings'>
      <div className={`settingsBG1 ${isMobile && !isOpen ? 'close' : 'open'}`}>
        <SideBar />
      </div>
      {isMobile && (
        <button className="burger" onClick={toggleMenu}>
          &#9776;
        </button>
      )}
      <div className='settingsBG2'>
        {children}
      </div>
      <div className='settingsBG3'>
        <Link to="/home" className="closeIcon">
          <svg role="img" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path className='icon' d="M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default SettingsLayout;
