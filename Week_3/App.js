import React from 'react';
import StudentProfile from './components/StudentProfile.jsx';
import './App.css';

function App() {
  // 학생 데이터
  const studentData = {
    name: '최지훈',
    studentId: '2021660049',
    department: '컴퓨터공학과',
    description: '안녕하세요! 저는 컴퓨터공학과에 재학 중인 최지훈입니다.',
    profileImage: 'profile.jpg'
  };

  return (
    <div className="app-container">
      <StudentProfile studentInfo={studentData} />
    </div>
  );
}

export default App;