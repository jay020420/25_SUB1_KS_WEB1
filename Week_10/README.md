# React TODO List 앱 제작 가이드

## 📋 개요
React와 styled-components를 사용하여 완전한 기능을 갖춘 TODO List 앱을 제작하는 방법

## 🚀 프로젝트 설정

### 1. 프로젝트 생성 및 의존성 설치
```bash
npx create-react-app mashup-todolist
cd mashup-todolist
yarn add react-icons styled-components
```

### 2. 필요한 컴포넌트 구조 파악
- **TodoTemplate**: 투두리스트의 레이아웃을 설정하는 컴포넌트
- **TodoHead**: 오늘의 날짜와 남은 할 일 개수를 표시
- **TodoList**: todos 배열을 map으로 렌더링
- **TodoItem**: 개별 할 일 항목 (토글/삭제 기능)
- **TodoCreate**: 새로운 할 일 등록 컴포넌트

## 🎨 스타일링 설정

### 전역 스타일 적용
```jsx
import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <div>안녕하세요</div>
    </>
  );
}

export default App;
```

## 🏗️ 컴포넌트 제작

### 1. TodoTemplate 컴포넌트
중앙에 정렬된 흰색 박스를 제공하는 레이아웃 컴포넌트입니다.

```jsx
import React from 'react';
import styled from 'styled-components';

const TodoTemplateBlock = styled.div`
  width: 512px;
  height: 768px;
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: 0 auto;
  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

function TodoTemplate({ children }) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;
```

### 2. TodoHead 컴포넌트
현재 날짜와 남은 할 일 개수를 표시합니다.

```jsx
import React from 'react';
import styled from 'styled-components';

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

function TodoHead() {
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일 2개 남음</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
```

### 3. TodoList 컴포넌트
할 일 목록을 표시하는 컨테이너입니다.

```jsx
import React from 'react';
import styled from 'styled-components';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  return <TodoListBlock>TodoList</TodoListBlock>;
}

export default TodoList;
```

### 4. TodoItem 컴포넌트
개별 할 일 항목을 렌더링하며, 완료 토글과 삭제 기능을 제공합니다.

```jsx
import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

function TodoItem({ id, done, text }) {
  return (
    <TodoItemBlock>
      <CheckCircle done={done}>{done && <MdDone />}</CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;
```

### 5. TodoCreate 컴포넌트
새로운 할 일을 추가하는 기능을 제공합니다.

```jsx
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';

const CircleButton = styled.button`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }
  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding: 32px;
  padding-bottom: 72px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoCreate() {
  const [open, setOpen] = useState(false);

  const onToggle = () => setOpen(!open);

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm>
            <Input autoFocus placeholder="할 일을 입력 후, Enter 를 누르세요" />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default TodoCreate;
```

## 🔄 Context API를 활용한 상태 관리

### TodoContext 생성
```jsx
import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false
  }
];

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}
```

### App 컴포넌트에서 TodoProvider 적용
```jsx
import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { TodoProvider } from './TodoContext';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;
```

## ⚡ 기능 구현

### TodoHead 완성
```jsx
function TodoHead() {
  const todos = useTodoState();
  const undoneTasks = todos.filter(todo => !todo.done);

  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-left">할 일 {undoneTasks.length}개 남음</div>
    </TodoHeadBlock>
  );
}
```

### TodoList 완성
```jsx
function TodoList() {
  const todos = useTodoState();
  
  return (
    <TodoListBlock>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
        />
      ))}
    </TodoListBlock>
  );
}
```

### TodoItem 완성
```jsx
function TodoItem({ id, done, text }) {
  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onRemove = () => dispatch({ type: 'REMOVE', id });

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
```

### TodoCreate 완성
```jsx
function TodoCreate() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  
  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  const onToggle = () => setOpen(!open);
  const onChange = e => setValue(e.target.value);
  
  const onSubmit = e => {
    e.preventDefault();
    dispatch({
      type: 'CREATE',
      todo: {
        id: nextId.current,
        text: value,
        done: false
      }
    });
    setValue('');
    setOpen(false);
    nextId.current += 1;
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              autoFocus
              placeholder="할 일을 입력 후, Enter 를 누르세요"
              onChange={onChange}
              value={value}
            />
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <MdAdd />
      </CircleButton>
    </>
  );
}

export default React.memo(TodoCreate);
```

## 🎯 주요 특징

- **React Hooks**: useState, useReducer, useContext 활용
- **styled-components**: CSS-in-JS 스타일링
- **Context API**: 전역 상태 관리
- **성능 최적화**: React.memo를 통한 불필요한 리렌더링 방지
- **반응형 UI**: 호버 효과와 애니메이션 적용