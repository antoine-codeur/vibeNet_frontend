import React from 'react';

const LegalsLink = () => {
  return (
    <a href="/legals" target="_blank" rel="noopener noreferrer" aria-label="Legals" role="button">
      <div className="iconWrapper" role="button" tabIndex="0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          {/* Your SVG icon for Legals */}
        </svg>
      </div>
    </a>
  );
};

export default LegalsLink;
