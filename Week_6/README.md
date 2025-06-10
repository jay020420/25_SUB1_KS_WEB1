📚 Hooks 개요
Hooks란?

특정 위치에 원하는 함수가 실행되도록 갈고리를 걸어두는 것
함수형 컴포넌트에서 state와 생명주기 기능을 사용할 수 있게 해주는 기능
클래스형 컴포넌트 없이도 React의 모든 기능을 활용 가능
모든 Hook의 이름은 use로 시작

Hooks의 장점

코드 간결성과 재사용성 향상
테스트 용이성 증대
클래스형 컴포넌트와 동등한 기능 제공


🎯 주요 Hooks
1. useState
상태 관리를 위한 Hook
javascriptconst [state, setState] = useState(initialValue);
기본 사용법:
javascriptimport React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>총 {count}번 클릭했습니다.</p>
      <button onClick={() => setCount(count + 1)}>
        클릭
      </button>
    </div>
  );
}
주요 특징:

state: 현재 상태 값
setState: 상태를 변경하는 함수
initialValue: 상태의 초기 값
함수형 업데이트: setState(prev => prev + 1)


2. useEffect
생명주기와 부수효과 처리를 위한 Hook
javascriptuseEffect(setup, dependencies?)
사용 패턴:
패턴코드설명처음 한 번만 실행useEffect(() => {...}, [])마운트 시 실행, 언마운트 시 정리특정 상태 변경시 실행useEffect(() => {...}, [state])state 값이 바뀔 때 실행매 렌더링마다 실행useEffect(() => {...})의존성 배열이 없으면 렌더링마다 실행언마운트 시 실행useEffect(() => { return () => {...}; }, [])컴포넌트가 제거될 때 실행
예제:
javascript// 컴포넌트 마운트 시 한 번만 실행
useEffect(() => {
  console.log("컴포넌트가 마운트됨!");
}, []);

// count 상태가 변경될 때마다 실행
useEffect(() => {
  console.log(`카운트 값이 변경됨: ${count}`);
}, [count]);

// 정리 작업 (타이머, 이벤트 리스너 등)
useEffect(() => {
  const interval = setInterval(() => {
    console.log("1초마다 실행");
  }, 1000);
  
  return () => {
    clearInterval(interval);
  };
}, []);

3. useMemo
값의 메모이제이션을 위한 Hook
javascriptconst memoizedValue = useMemo(() => {
  return 계산할 값;
}, [의존성 배열]);
사용해야 하는 경우:

연산 비용이 큰 계산을 반복할 때
객체 또는 배열이 불필요하게 재생성될 때
의존성이 변경되지 않는 한 동일한 값을 유지해야 할 때

예제:
javascriptimport React, { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(1);
  
  const expensiveResult = useMemo(() => {
    console.log("계산 중...");
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += number;
    }
    return result;
  }, [number]); // number가 바뀔 때만 실행됨
  
  return (
    <div>
      <h1>useMemo를 사용하여 최적화</h1>
      <button onClick={() => setCount(count + 1)}>클릭: {count}</button>
      <h2>결과: {expensiveResult}</h2>
    </div>
  );
}

4. useCallback
함수 메모이제이션을 위한 Hook
javascriptconst memoizedCallback = useCallback(
  () => {
    // 콜백 로직
  },
  [dependencyArray], // 의존성 배열
);
사용해야 하는 경우:

자식 컴포넌트에 함수(props)를 전달할 때
이벤트 핸들러 함수가 불필요하게 재생성될 때
의존성이 자주 바뀌지 않는 경우

예제:
javascriptimport React, { useState, useCallback } from "react";

function Child({ onClick }) {
  console.log("Child 컴포넌트 렌더링됨");
  return <button onClick={onClick}>버튼 클릭</button>;
}

function App() {
  const [count, setCount] = useState(0);
  
  // useCallback을 사용하여 함수 메모이제이션
  const handleClick = useCallback(() => {
    console.log("버튼 클릭됨");
  }, []); // 의존성 배열이 비어 있으므로 처음 생성된 함수를 재사용
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>카운트 증가</button>
      <Child onClick={handleClick} />
    </div>
  );
}

5. useRef
DOM 참조와 값 저장을 위한 Hook
javascriptconst ref = useRef(initialValue);
주요 용도:

DOM 요소에 직접 접근
리렌더링 없이 값 저장
이전 값 저장

예제:
javascript// DOM 요소에 접근하기
import { useRef, useEffect } from "react";

function InputFocus() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  return <input ref={inputRef} type="text" />;
}

// 리렌더링 없이 값 저장하기
import { useRef, useState } from "react";

function Counter() {
  const countRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0);
  
  const increment = () => {
    countRef.current += 1;
    console.log("Ref 값:", countRef.current);
  };
  
  return (
    <div>
      <p>렌더링 횟수: {renderCount}</p>
      <button onClick={() => setRenderCount(renderCount + 1)}>렌더 트리거</button>
      <button onClick={increment}>Ref 증가</button>
    </div>
  );
}

📋 Hook의 규칙
1. 최상위 레벨에서만 호출

Hook은 컴포넌트가 렌더링될 때마다 매번 같은 순서로 호출되어야 함
조건문, 반복문, 중첩 함수 내에서 Hook 호출 금지

2. React 함수 컴포넌트에서만 호출

일반 JavaScript 함수에서는 Hook 사용 불가
Custom Hook에서는 사용 가능

잘못된 예:
javascriptfunction MyComponent(props) {
  const [name, setName] = useState('Inje');
  
  if(name !== '') {  // ❌ 조건문 내에서 Hook 호출
    useEffect(() => {
      // ...
    });
  }
}

🔧 Custom Hook
Custom Hook이란?

이름이 use로 시작하고 내부에서 다른 Hook을 호출하는 JavaScript 함수
여러 컴포넌트에서 공통적으로 필요한 로직을 재사용 가능하게 추출
React의 기본 Hook들을 조합하여 새로운 기능을 만들 수 있음

예제 1: 카운터 관리 Custom Hook
javascript// useCounter.js
import { useState } from "react";

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}

export default useCounter;

// 사용하는 컴포넌트
import useCounter from "./useCounter";

function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(10);
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
예제 2: API 호출 Custom Hook
javascript// useFetch.js
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading, error };
}

export default useFetch;

// 사용하는 컴포넌트
function Users() {
  const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

🛠️ 개발 도구 및 라이브러리
필수 확장 프로그램

ES7+ React/Redux/React-Native snippets
React Developer Tools (Chrome 확장)
ESLint, Prettier
JavaScript (ES6) Code Snippets

추천 라이브러리

상태 관리: Redux, MobX, Recoil, Zustand
라우팅: React Router
폼 관리: Formik, React Hook Form
스타일링: Styled Components, Emotion
데이터 Fetching: Axios, React Query (TanStack Query)
UI: Material-UI, Ant Design, Chakra UI
애니메이션: Framer Motion, React Spring
테스트: Jest, React Testing Library


💡 Hook 사용 팁
성능 최적화

useMemo: 계산 비용이 큰 값의 메모이제이션
useCallback: 함수의 메모이제이션 (자식 컴포넌트에 props로 전달할 때)
useRef: 리렌더링을 유발하지 않는 값 저장

주의사항

과도한 최적화는 오히려 성능 저하를 유발할 수 있음
의존성 배열을 올바르게 지정해야 함
Hook은 순수 함수여야 하며, 외부 값을 변경하면 안 됨