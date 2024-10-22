import React from 'react';

const HomeLink = () => {
  return (
    <a href="/" target="_blank" rel="noopener noreferrer" aria-label="Home" role="button">
      <div className="iconWrapper" role="button" tabIndex="0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          {/* Your SVG icon for Home */}
          <circle cx="12" cy="12" r="10" fill="transparent"></circle>
          <path fill="currentColor" d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Z" />
        </svg>
      </div>
    </a>
  );
};

export default HomeLink;
