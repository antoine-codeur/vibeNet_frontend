import React from 'react';
import 'Links.css';
const DiscoverLink = () => {
  return (
    <a href="/discover" target="_blank" rel="noopener noreferrer" aria-label="Discover" role="button">
      <div className="iconWrapper" role="button" tabIndex="0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          {/* Your SVG icon for Discover */}
        </svg>
      </div>
    </a>
  );
};

export default DiscoverLink;
