import React, { Suspense, useContext } from 'react';
import './InfoWrapper.css';
import { UserContext } from '../../../context/UserContext'; // Use the UserContext
import ProfileInfo from './ProfileInfo/ProfileInfo';

// Lazy load components based on the page
const componentsMap = {
  blogInfo: React.lazy(() => import('./BlogInfo/BlogInfo')),
  // Add more components as needed
};

const InfoWrapper = ({ paramettre, blog }) => {
  const { userData, error } = useContext(UserContext); // Get userData from context

  if (!paramettre) {
    return null; // Don't render InfoWrapper if paramettre is null
  }

  const ComponentToRender = componentsMap[paramettre];

  if (!ComponentToRender) {
    return <div>Component not found for the parameter: {paramettre}</div>;
  }

  return (
    <div className="infoWrapper">
      <Suspense fallback={<div>Loading component...</div>}>
        <ComponentToRender blog={blog} /> {/* Pass the blog data to BlogInfo */}
      </Suspense>
      {error && <div className="error-message">Error: {error}</div>}
      {userData && <ProfileInfo userData={userData} />} {/* Always display user profile info */}
    </div>
  );
};

export default InfoWrapper;
