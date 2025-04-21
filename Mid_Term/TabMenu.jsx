import {useState} from 'react';

function TabMenu() {
    const [activeTab, setActiveTab] = useState('React');

    const tabContent = {
        'React': '리액트는 사용자 인터페이스를 만들기 위한 JavaScript 라이브러리입니다.',
        'Hook': 'Hook은 함수형 컴포넌트에서 State와 생명주기 기능을 연동할 수 있도록 지원하는 함수입니다.'
    };

    return (
        <div>
            <button onClick={() => setActiveTab('React')}>React</button>
            <button onClick={() => setActiveTab('Hook')}>Hook</button>

            <div>
                {tabContent[activeTab]}
            </div>

        </div>
    );
}

export default TabMenu;