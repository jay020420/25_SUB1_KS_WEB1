import logo from './logo.svg';
import './App.css';
import React from "react";

function App() {
    return React.createElement(
        "div",
        null,
        React.createElement("h1", null, "Hello, JSX!"),
        React.createElement("p", null, "This is a JSX example.")
    );
}

export default App;
