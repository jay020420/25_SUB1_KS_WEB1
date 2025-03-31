import React from 'react';

function ProfileImage({ src, alt }) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className="profile-image" 
    />
  );
}

export default ProfileImage;