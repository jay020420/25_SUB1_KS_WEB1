import React from 'react';
import ProfileImage from './ProfileImage.jsx';
import ProfileHeader from './ProfileHeader.jsx';
import StudentInfo from './StudentInfo.jsx';
import ProfileDescription from './ProfileDescription.jsx';
import Card from './Card.jsx';

function StudentProfile({ studentInfo }) {
  return (
    <Card>
      <ProfileImage src={studentInfo.profileImage} alt="프로필 사진" />
      <ProfileHeader name={studentInfo.name} />
      <StudentInfo studentId={studentInfo.studentId} department={studentInfo.department} />
      <ProfileDescription text={studentInfo.description} />
    </Card>
  );
}

export default StudentProfile;