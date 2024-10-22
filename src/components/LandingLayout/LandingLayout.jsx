import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingLayout.css';
import VibeNetLogo from '../../assets/VibeNet.svg';

const LandingLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='bodyLanding'>
      <header>
        <div className='logoContainer'>
          <img src={VibeNetLogo} alt="VibeNet Logo" className='logo' />
          <Link to="/">VibeNet</Link>
        </div>
        <button className="burger" onClick={toggleMenu}>
          &#9776;
        </button>
        <nav className={isOpen ? 'open' : 'close'}>
          <Link to="/discover">Discover</Link>
          <Link to="/support">Support</Link>
          <Link to="/legals">Legals</Link>
          <Link to="/login" className='login'>Login</Link>
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>&copy; 2024 Your App</p>
      </footer>
    </div>
  );
};

export default LandingLayout;
