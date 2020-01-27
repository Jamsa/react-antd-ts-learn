import React from 'react';
import logo from './logo.svg';
import './App.css';
import Example from './Example';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Example name="hello"></Example>
      <Link to="/hello">Hello</Link><br/>
      <Link to="/demo">Demo</Link><br/>
    </div>
  );
}

export default App;
