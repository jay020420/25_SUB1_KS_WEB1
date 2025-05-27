# React Router

## 🔍 라우팅이란?

라우팅은 사용자가 요청한 URL에 따라 알맞는 페이지를 보여주는 것을 의미합니다. 웹 애플리케이션을 여러 페이지로 구성할 때 페이지별로 컴포넌트들을 분리하여 프로젝트를 관리하기 위해 필요한 시스템입니다.

예를 들어 블로그를 만든다면:
- 글쓰기 페이지: 새로운 포스트를 작성하는 페이지
- 포스트 목록 페이지: 여러 포스트들의 목록을 보여주는 페이지  
- 포스트 읽기 페이지: 하나의 포스트를 보여주는 페이지

## 🌐 SPA (Single Page Application)

### SPA의 특징
- **한 개의 페이지로 이루어진 애플리케이션**
- HTML을 한번만 받아와서 웹 애플리케이션을 실행시킨 후, 필요한 데이터만 받아와서 화면을 업데이트
- 사용자 경험상 여러 페이지가 존재하는 것처럼 느껴짐

### SPA vs MPA
- **MPA**: 사용자 인터랙션이 별로 없는 정적인 페이지들에 적합
- **SPA**: 사용자 인터랙션이 많고 다양한 정보를 제공하는 모던 웹 애플리케이션에 적합

### SPA 라우팅 동작 원리
1. 브라우저의 **History API**를 사용하여 주소창의 값만 변경
2. 서버에 새로운 HTML을 요청하지 않음
3. 기존 웹 애플리케이션을 유지하면서 라우팅 설정에 따라 다른 페이지 표시

## 🚀 React Router 시작하기

### 1. 프로젝트 생성 및 라이브러리 설치
```bash
npx create-react-app router-tutorial
cd router-tutorial
yarn add react-router-dom
```

### 2. 프로젝트에 라우터 적용
`src/index.js`에서 BrowserRouter로 App 컴포넌트를 감싸줍니다.

```jsx
import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### 3. 페이지 컴포넌트 만들기
`src/pages` 디렉터리를 만들고 페이지 컴포넌트들을 생성합니다.

#### Home.js
```jsx
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>홈</h1>
      <p>가장 먼저 보여지는 페이지입니다.</p>
    </div>
  );
};

export default Home;
```

#### About.js
```jsx
import React from 'react';

const About = () => {
  return (
    <>
      <h1>소개</h1>
      <p>리액트 라우터를 사용해 보는 프로젝트입니다.</p>
    </>
  );
};

export default About;
```

## 🛣️ Route 컴포넌트로 라우트 설정

### 기본 라우트 설정
```jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default App;
```

### Route 컴포넌트 사용법
- `<Route path="주소규칙" element={보여줄 컴포넌트 JSX} />`
- Route 컴포넌트는 Routes 컴포넌트 내부에서 사용

## 🔗 Link 컴포넌트로 페이지 이동

### Link vs a 태그
- **a 태그**: 페이지를 새로 불러옴 (SPA 장점 상실)
- **Link 태그**: History API를 통해 브라우저 주소의 경로만 바꿈

### Link 사용 예시
```jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>홈</h1>
      <p>가장 먼저 보여지는 페이지입니다.</p>
      <Link to="/about">소개</Link>
    </div>
  );
};

export default Home;
```

## 📝 URL 파라미터와 쿼리스트링

### URL 파라미터
주소의 경로에 유동적인 값을 넣는 형태입니다.

#### 예시: `/profile/velopert`

```jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const data = {
  tealighting: {
    name: '김다빈',
    description: '보안에 관심있는 학생',
  },
  dew: {
    name: '이이슬',
    description: 'DB에 관심있는 학생',
  }
};

const Profile = () => {
  const params = useParams();
  const profile = data[params.username];

  return (
    <div>
      <h1>사용자 프로필</h1>
      {profile ? (
        <div>
          <h2>{profile.name}</h2>
          <p>{profile.description}</p>
        </div>
      ) : (
        <p>존재하지 않는 프로필입니다.</p>
      )}
    </div>
  );
};

export default Profile;
```

#### 라우트 설정
```jsx
<Route path="/profiles/:username" element={<Profile />} />
```

### 쿼리스트링
주소의 뒷부분에 ?문자열 이후에 key=value로 값을 정의하는 형태입니다.

#### 예시: `/articles?page=1&keyword=react`

#### useLocation 사용
```jsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const About = () => {
  const location = useLocation();

  return (
    <div>
      <h1>소개</h1>
      <p>리액트 라우터를 사용해 보는 프로젝트입니다.</p>
      <p>쿼리스트링: {location.search}</p>
    </div>
  );
};

export default About;
```

#### useSearchParams 사용 (권장)
```jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';

const About = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const detail = searchParams.get('detail');
  const mode = searchParams.get('mode');

  const onToggleDetail = () => {
    setSearchParams({ mode, detail: detail === 'true' ? false : true });
  };

  const onIncreaseMode = () => {
    const nextMode = mode === null ? 1 : parseInt(mode) + 1;
    setSearchParams({ mode: nextMode, detail });
  };

  return (
    <div>
      <h1>소개</h1>
      <p>리액트 라우터를 사용해 보는 프로젝트입니다.</p>
      <p>detail: {detail}</p>
      <p>mode: {mode}</p>
      <button onClick={onToggleDetail}>Toggle detail</button>
      <button onClick={onIncreaseMode}>mode + 1</button>
    </div>
  );
};

export default About;
```

### URL 파라미터 vs 쿼리스트링 사용 시점
- **URL 파라미터**: ID 또는 이름을 사용하여 특정 데이터를 조회할 때
- **쿼리스트링**: 키워드 검색, 페이지네이션, 정렬 방식 등 데이터 조회 옵션을 전달할 때

## 🏗️ 중첩된 라우트 (Nested Routes)

### 중첩된 라우트란?
라우트 내부에 또 다른 라우트를 정의하는 것입니다.

### 기본 설정
```jsx
<Routes>
  <Route path="/articles" element={<Articles />}>
    <Route path=":id" element={<Article />} />
  </Route>
</Routes>
```

### Outlet 컴포넌트
부모 라우트에서 자식 라우트를 렌더링할 위치를 지정합니다.

```jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Articles = () => {
  return (
    <div>
      <Outlet />
      <ul>
        <li>
          <Link to="/articles/1">게시글 1</Link>
        </li>
        <li>
          <Link to="/articles/2">게시글 2</Link>
        </li>
        <li>
          <Link to="/articles/3">게시글 3</Link>
        </li>
      </ul>
    </div>
  );
};

export default Articles;
```

## 🎨 공통 레이아웃 컴포넌트

중첩된 라우트를 활용하여 공통 레이아웃을 구현할 수 있습니다.

### Layout 컴포넌트
```jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header style={{ background: 'lightgray', padding: 16, fontSize: 24 }}>
        Header
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
```

### 라우트 적용
```jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/profiles/:username" element={<Profile />} />
  </Route>
</Routes>
```

### index props
`index` props는 `path="/"`와 동일한 의미를 갖습니다.

```jsx
<Route index element={<Home />} />
// 위 코드는 아래와 같음
<Route path="/" element={<Home />} />
```

## 🧭 useNavigate Hook

Link 컴포넌트를 사용하지 않고 다른 페이지로 이동할 때 사용합니다.

```jsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();

  const goBack = () => {
    // 이전 페이지로 이동
    navigate(-1);
  };

  const goArticles = () => {
    // articles 경로로 이동
    navigate('/articles');
  };

  const goArticlesReplace = () => {
    // 현재 페이지를 페이지 기록에 남기지 않고 이동
    navigate('/articles', { replace: true });
  };

  return (
    <div>
      <header style={{ background: 'lightgray', padding: 16, fontSize: 24 }}>
        <button onClick={goBack}>뒤로가기</button>
        <button onClick={goArticles}>게시글 목록</button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
```

### navigate 함수 옵션
- **숫자**: `navigate(-1)` (뒤로 가기), `navigate(1)` (앞으로 가기)
- **replace**: `{ replace: true }` 현재 페이지를 기록에 남기지 않음

## 🎯 NavLink 컴포넌트

현재 경로와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일 또는 CSS 클래스를 적용할 수 있는 컴포넌트입니다.

```jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Articles = () => {
  const activeStyle = {
    color: 'green',
    fontSize: 21,
  };

  return (
    <div>
      <Outlet />
      <ul>
        <ArticleItem id={1} />
        <ArticleItem id={2} />
        <ArticleItem id={3} />
      </ul>
    </div>
  );
};

const ArticleItem = ({ id }) => {
  const activeStyle = {
    color: 'green',
    fontSize: 21,
  };

  return (
    <li>
      <NavLink
        to={`/articles/${id}`}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        게시글 {id}
      </NavLink>
    </li>
  );
};

export default Articles;
```

## ❌ NotFound 페이지

사전에 정의되지 않은 경로에 사용자가 진입했을 때 보여주는 페이지입니다.

### NotFound 컴포넌트
```jsx
const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 64,
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    >
      404
    </div>
  );
};

export default NotFound;
```

### 와일드카드 라우트 설정
```jsx
<Routes>
  {/* 다른 라우트들 */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

- `*`는 와일드카드 문자로 아무 텍스트나 매칭
- 상단의 라우트들과 일치하지 않으면 이 라우트가 화면에 표시

## 🔄 Navigate 컴포넌트

컴포넌트를 화면에 보여주는 순간 다른 페이지로 리다이렉트하고 싶을 때 사용합니다.

### 사용 예시
```jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const MyPage = () => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }

  return <div>마이 페이지</div>;
};

export default MyPage;
```

### Login 페이지
```jsx
import React from 'react';

const Login = () => {
  return <div>로그인 페이지</div>;
};

export default Login;
```

## 📋 종합 예제

### 완전한 App.js
```jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Article from './pages/Article';
import Articles from './pages/Articles';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import MyPage from './pages/MyPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profiles/:username" element={<Profile />} />
      </Route>
      <Route path="/articles" element={<Articles />}>
        <Route path=":id" element={<Article />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
```

## 🎯 주요 Hook 정리

| Hook | 용도 | 반환값 |
|------|------|--------|
| `useParams` | URL 파라미터 조회 | 파라미터 객체 |
| `useLocation` | 현재 위치 정보 조회 | location 객체 |
| `useSearchParams` | 쿼리스트링 조회/수정 | [searchParams, setSearchParams] |
| `useNavigate` | 프로그래밍 방식 페이지 이동 | navigate 함수 |
