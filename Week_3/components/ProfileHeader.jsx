import React from 'react';

function ProfileHeader({ name }) {
  return (
    <h1 className="profile-name">{name}</h1>
  );
}

export default ProfileHeader;