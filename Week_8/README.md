# React Event Handler 정리

## 1. Event Handler란?

**Event Handler(이벤트 핸들러)**는 사용자 인터페이스에서 발생하는 이벤트(예: 클릭, 입력 등)에 대한 응답으로 실행되는 함수입니다.

- **Event(이벤트)**: 사용자가 버튼을 클릭한 사건 → 버튼 클릭 이벤트
- **Event Handler(Event listener)**: 사용자가 웹 페이지와 상호작용할 때 발생하는 다양한 이벤트에 반응하여 특정 동작을 수행하는 함수

### DOM vs React 이벤트 비교

| 항목 | DOM 이벤트 | React 이벤트 |
|------|------------|--------------|
| 문법 | `onclick="activate()"` | `onClick={activate}` |
| 네이밍 | 소문자 (click, change) | 카멜케이스 (onClick, onChange) |

```html
<!-- DOM 이벤트 -->
<button onclick="activate()">Activate</button>

<!-- React 이벤트 -->
<button onClick={activate}>Activate</button>
```

## 2. 기본 이벤트 핸들러 사용법

React에서 이벤트 핸들러는 JSX에서 camelCase로 작성되며, 함수로 전달됩니다.

```jsx
function ButtonComponent() {
  function handleClick() {
    alert("버튼이 클릭되었습니다!");
  }
  
  return <button onClick={handleClick}>클릭</button>;
}
```

## 3. 이벤트 객체 사용 (SyntheticEvent)

React에서는 이벤트 핸들러 함수의 첫 번째 매개변수로 SyntheticEvent 객체가 전달됩니다.

```jsx
function InputComponent() {
  function handleChange(event) {
    console.log("입력값:", event.target.value);
  }
  
  return <input type="text" onChange={handleChange} />;
}
```

## 4. 클래스 컴포넌트에서 이벤트 핸들러

### 방법 1: bind 사용

```jsx
class ButtonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "켜짐" : "꺼짐"}
      </button>
    );
  }
}
```

### 방법 2: Class Field Syntax (화살표 함수)

```jsx
class ButtonComponent extends React.Component {
  handleClick = () => {
    alert("클래스 컴포넌트 버튼 클릭!");
  };
  
  render() {
    return <button onClick={this.handleClick}>클릭</button>;
  }
}
```

### 방법 3: Arrow Function 사용

```jsx
class ButtonComponent extends React.Component {
  handleClick() {
    console.log('this is :', this);
  }
  
  render() {
    return (
      <button onClick={() => this.handleClick()}>
        클릭
      </button>
    );
  }
}
```

## 5. 함수 컴포넌트에서 이벤트 핸들러

```jsx
function Toggle(props) {
  const [isToggleOn, setIsToggleOn] = useState(true);
  
  // 방법 1: 함수 안에 함수로 정의
  function handleClick() {
    setIsToggleOn(isToggleOn => !isToggleOn);
  }
  
  // 방법 2: arrow function을 사용하여 정의
  const handleClick = () => {
    setIsToggleOn(isToggleOn => !isToggleOn);
  };
  
  return (
    <button onClick={handleClick}>
      {isToggleOn ? "켜짐" : "꺼짐"}
    </button>
  );
}
```

## 6. 인자 전달

이벤트 핸들러에 추가적인 인자를 전달하려면 화살표 함수를 사용하거나 bind를 활용할 수 있습니다.

### 함수 컴포넌트에서 인자 전달

```jsx
function MyButton(props) {
  const handleDelete = (id, event) => {
    console.log(id, event.target);
  };
  
  return (
    <button onClick={(event) => handleDelete(1, event)}>
      삭제하기
    </button>
  );
}
```

### 클래스 컴포넌트에서 인자 전달

```jsx
class ButtonComponent extends React.Component {
  handleClick(name) {
    alert(`${name}님, 버튼을 클릭했습니다!`);
  }
  
  render() {
    return (
      <button onClick={this.handleClick.bind(this, "홍길동")}>
        클릭
      </button>
    );
  }
}
```

## 7. 이벤트 핸들러에서 상태 변경

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  
  function handleClick() {
    setCount(count + 1);
  }
  
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={handleClick}>증가</button>
    </div>
  );
}
```

## 8. 기본 이벤트 동작 방지 (preventDefault)

이벤트의 기본 동작(예: 폼 제출, 링크 이동)을 막을 때 `event.preventDefault()`를 사용합니다.

```jsx
function FormComponent() {
  function handleSubmit(event) {
    event.preventDefault();
    alert("폼 제출이 방지되었습니다.");
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">제출</button>
    </form>
  );
}
```

## 9. 이벤트 전파 중지 (stopPropagation)

이벤트가 부모 요소로 전파되지 않도록 `event.stopPropagation()`을 사용할 수 있습니다.

```jsx
function Parent() {
  function handleParentClick() {
    alert("부모 요소 클릭!");
  }
  
  function handleChildClick(event) {
    event.stopPropagation();
    alert("자식 요소 클릭!");
  }
  
  return (
    <div onClick={handleParentClick} style={{ padding: "20px", background: "#ddd" }}>
      <button onClick={handleChildClick}>클릭</button>
    </div>
  );
}
```

## 10. 이벤트 핸들러 최적화 (useCallback)

이벤트 핸들러가 불필요하게 재생성되는 것을 방지하려면 useCallback을 사용할 수 있습니다.

```jsx
import { useState, useCallback } from "react";

function OptimizedComponent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  return (
    <div>
      <p>카운트: {count}</p>
      <button onClick={handleClick}>증가</button>
    </div>
  );
}
```

## 11. DOM Event vs React Event 상세 비교

### 이벤트 처리 방식

| 비교 항목 | DOM 이벤트 | React 이벤트 |
|-----------|------------|--------------|
| 이벤트 등록 방식 | addEventListener 사용 | JSX에서 onEvent 속성 사용 |
| 이벤트 제거 방식 | removeEventListener 필요 | 컴포넌트 언마운트 시 자동 제거 |
| 이벤트 네이밍 방식 | 소문자 (click, change) | 카멜케이스 (onClick, onChange) |
| this 바인딩 필요 여부 | 필요할 수도 있음 | 함수형 컴포넌트에서는 필요 없음 |

### 이벤트 객체

| 비교 항목 | DOM 이벤트 | React 이벤트 |
|-----------|------------|--------------|
| 이벤트 객체 | Event 객체 (MouseEvent, KeyboardEvent 등) | SyntheticEvent 객체 |
| 이벤트 속성 | event.target, event.clientX 등 | event.target, event.nativeEvent 등 |
| 이벤트가 사라지는 시점 | 지속됨 | SyntheticEvent는 자동으로 풀(pool) 처리 |

### 이벤트 전파 방식

| 비교 항목 | DOM 이벤트 | React 이벤트 |
|-----------|------------|--------------|
| 이벤트 전파 | 기본적으로 버블링 (Bubbling) | 기본적으로 버블링 (Bubbling) |
| 캡처링 지원 | { capture: true } 옵션 사용 | onClickCapture 등 Capture 접미사 사용 |
| 이벤트 중지 | event.stopPropagation() 사용 | event.stopPropagation() 사용 |

### 이벤트 성능 및 관리

| 비교 항목 | DOM 이벤트 | React 이벤트 |
|-----------|------------|--------------|
| 이벤트 위임 | 수동으로 설정 필요 | 자동으로 위임 (document에서 관리) |
| 메모리 관리 | 이벤트 제거 필요 | 자동으로 정리됨 (컴포넌트 언마운트 시) |
| 최적화 기능 | 없음 | useCallback으로 최적화 가능 |

## 12. SyntheticEvent 특징

- React는 자체적으로 SyntheticEvent를 제공하여 모든 브라우저에서 동일한 인터페이스를 제공합니다.
- SyntheticEvent는 이벤트 풀링(Event Pooling)을 사용하여 성능을 최적화합니다.
- 비동기 코드에서는 `event.persist()`를 호출해야 합니다.

```jsx
function ButtonComponent() {
  function handleClick(event) {
    event.persist(); // SyntheticEvent의 풀링 방지
    setTimeout(() => {
      console.log(event.target); // 정상 동작
    }, 1000);
  }
  
  return <button onClick={handleClick}>클릭</button>;
}
```

## 13. 실습 예제

### 클래스 컴포넌트 예제

```jsx
import React from "react";

class ConfirmButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfirmed: false,
    };
    this.handleConfirm = this.handleConfirm.bind(this);
  }
  
  handleConfirm() {
    this.setState(prevState => ({
      isConfirmed: !prevState.isConfirmed
    }));
  }
  
  render() {
    return (
      <button
        onClick={this.handleConfirm}
        disabled={this.state.isConfirmed}
      >
        {this.state.isConfirmed ? "확인됨" : "확인하기"}
      </button>
    );
  }
}

export default ConfirmButton;
```

### 함수 컴포넌트 예제

```jsx
import React, { useState } from "react";

function ConfirmButton(props) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  const handleConfirm = () => {
    setIsConfirmed(prevIsConfirmed => !prevIsConfirmed);
  };
  
  return (
    <button onClick={handleConfirm} disabled={isConfirmed}>
      {isConfirmed ? "확인됨" : "확인하기"}
    </button>
  );
}

export default ConfirmButton;
```

## 14. 결론

React 이벤트 시스템의 주요 특징:

✅ **코드 작성이 간결함**  
✅ **이벤트 위임을 활용해 성능 최적화**  
✅ **자동 메모리 관리 지원**  
✅ **SyntheticEvent로 브라우저 호환성 보장**  