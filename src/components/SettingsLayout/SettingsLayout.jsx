import React from 'react';
import { Link } from 'react-router-dom';
import './SettingsLayout.css';
import SideBar from './SideBar/SideBar';

const SettingsLayout = ({ children }) => {
  return (
    <div className='bodySettings'>
      <div className='settingsBG1'>
        <SideBar />
      </div>
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
