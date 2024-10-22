import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LandingLayout.css';
import VibeNetLogo from '../../assets/VibeNet.svg';

const LandingLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000); // Track mobile view

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Update mobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
      if (window.innerWidth > 1000) {
        setIsOpen(true); // Always show the nav on larger screens
      } else {
        setIsOpen(false); // Use toggle state for mobile
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='bodyLanding'>
      <header>
        <div className='logoContainer'>
          <img src={VibeNetLogo} alt="VibeNet Logo" className='logo' />
          <Link to="/">VibeNet</Link>
        </div>
        {isMobile && (
          <button className="burger" onClick={toggleMenu}>
            &#9776;
          </button>
        )}
        <nav className={isOpen || !isMobile ? 'open' : 'close'}>
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
