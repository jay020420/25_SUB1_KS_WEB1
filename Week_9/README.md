# React Conditional Rendering 정리

## 1. Conditional Rendering이란?

**Conditional Rendering(조건부 렌더링)**은 특정 조건에 따라 UI를 변경하는 방식입니다.

- 어떠한 조건에 따라서 렌더링이 달라지는 것
- 특정 조건에 따라 컴포넌트의 일부 또는 전체를 렌더링하는 방법
- 특정 조건에 따라 다른 UI 요소를 보여주는 것
- 사용자의 입력, 데이터 상태, 또는 애플리케이션의 다른 조건에 따라 동적으로 콘텐츠를 변경하는 데 필수적

## 2. Truthy와 Falsy

JavaScript에서는 Boolean이 아닌 값도 조건문에서 true 또는 false처럼 동작할 수 있습니다.

### Truthy 값 (True로 여겨지는 값)
```javascript
"hello"        // 문자열
" "            // 공백이 있는 문자열도 truthy
3.14          // 숫자 (0 제외)
-100          // 음수도 truthy
Infinity      // 무한대도 truthy
[]            // 빈 배열도 truthy
{}            // 빈 객체도 truthy
function(){}  // 함수도 truthy
```

### Falsy 값 (False로 여겨지는 값)
```javascript
false         // false 자체
0             // 숫자 0
-0            // 음수 0
0n            // BigInt 0
""            // 빈 문자열
null          // null 값
undefined     // undefined 값
NaN           // Not-A-Number (숫자가 아님)
```

### 활용 예제
```javascript
// truthy 예제
if ("hello") {
  console.log("참입니다!"); // 실행됨
} else {
  console.log("거짓입니다!");
}

// falsy 예제
if (0) {
  console.log("참입니다!");
} else {
  console.log("거짓입니다!"); // 실행됨
}
```

## 3. Truthy, Falsy 활용

### 1. ||(OR 연산자)
```javascript
console.log(false || "안녕");        // "안녕"
console.log(0 || 100);              // 100
console.log("" || "기본값");         // "기본값"
console.log(null || "대체값");       // "대체값"

let name = "" || "홍길동";
console.log(name);                   // "홍길동"
```

### 2. &&(AND 연산자)
```javascript
console.log(true && "안녕");         // "안녕"
console.log(1 && 100);              // 100
console.log("hello" && 0);          // 0 (Falsy 만나서 종료)
console.log("" && "무시됨");         // "" (Falsy 만나서 종료)
```

### 3. ??(Null 병합 연산자)
```javascript
let user;
console.log(user ?? "기본 사용자");  // "기본 사용자"

let age = 0;
console.log(age ?? 20);             // 0 (Falsy이지만 null이 아니므로 유지)
```

## 4. Element Variables (엘리먼트 변수)

JSX 코드를 변수에 할당하여 재사용하거나 조건에 따라 렌더링을 제어하는 데 사용됩니다.

### 엘리먼트 변수 사용 방법
1. **변수 선언**: const, let 또는 var 키워드를 사용하여 변수를 선언
2. **JSX 할당**: 변수에 JSX 코드를 할당
3. **렌더링**: 변수를 JSX 코드 내에서 중괄호 {}로 감싸서 렌더링

### 기본 사용법
```jsx
import React from 'react';

function App() {
  const isLoggedIn = true; // 로그인 상태를 나타내는 변수
  
  // 엘리먼트를 변수에 저장
  const greeting = isLoggedIn ? <h1>환영합니다!</h1> : <h1>로그인 해주세요.</h1>;
  
  return (
    <div>
      {greeting} {/* 변수로 저장한 엘리먼트를 렌더링 */}
    </div>
  );
}

export default App;
```

### 여러 엘리먼트 변수 사용하기
```jsx
import React from 'react';

function App() {
  const isLoggedIn = true;
  const greeting = <h1>환영합니다!</h1>;
  const logoutButton = <button>로그아웃</button>;
  const loginButton = <button>로그인</button>;
  
  return (
    <div>
      {isLoggedIn ? (
        <>
          {greeting}
          {logoutButton}
        </>
      ) : (
        <>
          {loginButton}
        </>
      )}
    </div>
  );
}

export default App;
```

### 배열로 엘리먼트 렌더링하기
```jsx
import React from 'react';

function App() {
  const items = ['사과', '바나나', '체리'];
  const itemList = items.map((item, index) => <li key={index}>{item}</li>);
  
  return (
    <div>
      <h1>과일 목록</h1>
      <ul>{itemList}</ul>
    </div>
  );
}

export default App;
```

## 5. Inline Condition (인라인 조건)

프로그래밍에서 조건문을 한 줄로 표현하는 방법입니다.

### 1. 기본적인 인라인 조건 (삼항 연산자)
```javascript
// 일반적인 if 문
let message;
if (isLoggedIn) {
  message = "환영합니다!";
} else {
  message = "로그인이 필요합니다.";
}

// 인라인 조건으로 줄이기
let message = isLoggedIn ? "환영합니다!" : "로그인이 필요합니다.";
```

### 2. && 연산자를 활용한 인라인 조건
조건이 참(true)일 때만 실행하고 싶을 때 사용:
```javascript
isLoggedIn && console.log("로그인 성공!");

let message = isAdmin && "관리자 계정입니다.";
// isAdmin이 true면 "관리자 계정입니다."가 출력되고, 
// false면 undefined가 되며 아무것도 출력되지 않음
```

### 3. || 연산자를 활용한 기본값 설정
Falsy 값이 주어지면 기본값을 설정:
```javascript
let username = inputName || "Guest";
// inputName이 null, undefined, ""이면 "Guest"가 저장
// inputName이 "John"이면 "John"이 저장

console.log("" || "기본값");          // 출력: "기본값"
console.log(null || "기본값");        // 출력: "기본값"
console.log("사용자" || "기본값");     // 출력: "사용자"
```

## 6. Conditional Rendering 방법들

### 1. 삼항 연산자
```jsx
function Greeting({ isLoggedIn }) {
  return (
    <h1>{isLoggedIn ? "환영합니다!" : "로그인이 필요합니다."}</h1>
  );
}
// isLoggedIn이 true이면 "환영합니다!", 아니면 "로그인이 필요합니다."가 표시
```

### 2. 논리 연산자 (&&)
```jsx
function Notification({ hasMessage }) {
  return (
    <div>
      <h1>안녕하세요!</h1>
      {hasMessage && <p>새로운 메시지가 도착했습니다.</p>}
    </div>
  );
}
// hasMessage가 true일 때만 "새로운 메시지가 도착했습니다."가 표시
```

### 3. if문 사용 (return 내부에서 조건 분기)
```jsx
function UserStatus({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>환영합니다!</h1>;
  }
  return <h1>로그인이 필요합니다.</h1>;
}
// isLoggedIn이 true이면 "환영합니다!", 아니면 "로그인이 필요합니다."가 표시
```

### 4. 컴포넌트를 활용한 조건부 렌더링
```jsx
function Welcome() {
  return <h1>환영합니다!</h1>;
}

function PleaseLogin() {
  return <h1>로그인이 필요합니다.</h1>;
}

function Greeting({ isLoggedIn }) {
  return isLoggedIn ? <Welcome /> : <PleaseLogin />;
}
// isLoggedIn 값에 따라 Welcome 또는 PleaseLogin 컴포넌트가 렌더링
```

### 5. 즉시 실행 함수 (IIFE) 활용
```jsx
function UserProfile({ user }) {
  return (
    <div>
      {(() => {
        if (!user) return <p>사용자 정보 없음</p>;
        return <p>사용자: {user.name}</p>;
      })()}
    </div>
  );
}
// user가 존재하면 이름을 표시하고, 없으면 "사용자 정보 없음"이 출력
```

### 6. switch 문을 활용한 조건부 렌더링
```jsx
function StatusMessage({ status }) {
  switch (status) {
    case "success":
      return <p>성공적으로 처리되었습니다!</p>;
    case "error":
      return <p>오류가 발생했습니다.</p>;
    case "loading":
      return <p>로딩 중...</p>;
    default:
      return <p>상태를 확인할 수 없습니다.</p>;
  }
}
```

### 7. 조건부 렌더링 + 버튼 이벤트
```jsx
import { useState } from "react";

function ToggleMessage() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "숨기기" : "보이기"}
      </button>
      {isVisible && <p>이 메시지가 보입니다!</p>}
    </div>
  );
}
// 버튼 클릭 시 isVisible 상태가 변경되며, 메시지가 나타나거나 사라짐
```

## 7. Conditional Rendering 방법 비교

| 방법 | 사용 방식 | 특징 |
|------|-----------|------|
| 삼항 연산자 (? :) | `{condition ? A : B}` | 간결한 표현 |
| 논리 연산자 (&&) | `{condition && A}` | 특정 조건에서만 렌더링 |
| if 문 | `if (condition) return A;` | 명확한 조건 처리 |
| 별도 컴포넌트 분리 | `<ComponentA />` or `<ComponentB />` | 재사용성 증가 |
| 즉시 실행 함수 (IIFE) | `{(() => { return A; })()}` | 유연한 표현 가능 |
| switch 문 | `switch (value) { case A: return B; }` | 여러 조건 처리에 유용 |
| 상태 변경 이벤트 | `useState`와 함께 조건부 렌더링 | 동적 UI 구현 |

## 8. 실습 예제

### 삼항 연산자와 && 연산자 사용
```jsx
// 삼항 연산자 예제
import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div>
      {isLoggedIn ? (
        <h1>환영합니다!</h1>
      ) : (
        <h1>로그인 해주세요.</h1>
      )}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? '로그아웃' : '로그인'}
      </button>
    </div>
  );
}

export default App;
```

```jsx
// && 연산자 예제
import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div>
      <h1>안녕하세요!</h1>
      {isLoggedIn && <p>로그인 상태입니다.</p>}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? '로그아웃' : '로그인'}
      </button>
    </div>
  );
}

export default App;
```

### 함수로 조건부 렌더링
```jsx
import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const renderContent = () => {
    if (isLoggedIn) {
      return <h1>환영합니다!</h1>;
    } else {
      return <h1>로그인 해주세요.</h1>;
    }
  };
  
  return (
    <div>
      {renderContent()}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? '로그아웃' : '로그인'}
      </button>
    </div>
  );
}

export default App;
```

## 9. 실습 프로젝트: 로그인 툴바 만들기

### Toolbar.jsx
```jsx
import React from "react";

const styles = {
  wrapper: {
    padding: 16,
    display: "flex",
    flexDirection: "row",
    borderBottom: "1px solid grey",
  },
  greeting: {
    marginRight: 8,
  },
};

function Toolbar(props) {
  const { isLoggedIn, onClickLogin, onClickLogout } = props;
  
  return (
    <div style={styles.wrapper}>
      {isLoggedIn && <span style={styles.greeting}>환영합니다!</span>}
      {isLoggedIn ? (
        <button onClick={onClickLogout}>로그아웃</button>
      ) : (
        <button onClick={onClickLogin}>로그인</button>
      )}
    </div>
  );
}

export default Toolbar;
```

### LandingPage.jsx
```jsx
import React, { useState } from "react";
import Toolbar from "./Toolbar";

function LandingPage(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const onClickLogin = () => {
    setIsLoggedIn(true);
  };
  
  const onClickLogout = () => {
    setIsLoggedIn(false);
  };
  
  return (
    <div>
      <Toolbar
        isLoggedIn={isLoggedIn}
        onClickLogin={onClickLogin}
        onClickLogout={onClickLogout}
      />
      <div style={{ padding: 16 }}>소플과 함께하는 리액트 공부!</div>
    </div>
  );
}

export default LandingPage;
```

## 10. 주요 개념 정리

✅ **Conditional Rendering은 조건에 따라 다른 UI를 보여주는 React의 핵심 기능**  
✅ **Truthy/Falsy 값을 이해하고 활용하면 더 간결한 코드 작성 가능**  
✅ **Element Variables로 JSX를 변수에 저장하여 재사용성 증대**  
✅ **다양한 조건부 렌더링 방법 중 상황에 맞는 방법 선택**  
✅ **useState와 함께 사용하여 동적인 UI 구현 가능**