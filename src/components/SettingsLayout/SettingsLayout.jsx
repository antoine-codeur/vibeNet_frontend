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
        <Link to="/home" className="close-icon">
          <i className="fas fa-times"></i>
        </Link>
      </div>
    </div>
  );
};

export default SettingsLayout;
