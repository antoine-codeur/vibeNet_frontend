import React from 'react';
import './OwnerCard.css';
import DefaultProfilePicture from '../../../../../assets/images/DefaultProfilePicture.jpg';

const OwnerCard = ({ image, name }) => {
  return (
    <div className="ownerCard">
      <img 
        src={image ? image : DefaultProfilePicture}
        alt={`${name}'s profile`} 
        className="ownerImage" 
      />
      <div className="ownerInfo">
        <h3 className="ownerName">{name}<span>'s blog</span></h3>
      </div>
    </div>
  );
};

export default OwnerCard;
