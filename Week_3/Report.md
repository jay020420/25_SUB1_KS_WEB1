5개 이상 컴포넌트로 구성. 2개 이상 props 전달하는 컴포넌트를 1개 이상 포함하여 작성하기

StudentProfile 컴포넌트가 2개 이상의 props를 전달하는 컴포넌트입니다.

<StudentInfo studentId={studentInfo.studentId} department={studentInfo.department} />

여기서
studentId prop으로 학번 정보를 전달
department prop으로 학과 정보를 전달
이 StudentInfo 컴포넌트는 이 두 props를 받아서 화면에 표시합니다.

function StudentInfo({ studentId, department }) {
  return (
    <div className="student-info">
      <p>학번: {studentId}</p>
      <p>학과: {department}</p>
    </div>
  );
}

그 외의 컴포넌트는 src의 components에 위치하고 있습니다.



