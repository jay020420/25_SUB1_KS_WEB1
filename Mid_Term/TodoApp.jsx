import {useState} from 'react';

function TodoApp() {
    const [todo, setTodo] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const addTodo = () => {
        setTodo([...todo, inputValue]);
        setInputValue('');
    };

    return (
        <div>
            <p>Todo List</p>
            <input type="text"
            value = {inputValue}
            onChange = {(e) => setInputValue(e.target.value)}></input>
            <button onClick={addTodo}>추가</button>
            <ul>
                {todo.map((todos, index) => (
                    <li key={index}>{todos}</li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;