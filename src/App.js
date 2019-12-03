import React from 'react';
import logo from './logo.svg';
import './App.css';
import { version, Button } from "antd";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
     
      <h1>antd version: {version}</h1>
      <p>
        <Button type="primary">Button</Button>
        Please <b>fork</b> this sandbox to reproduce your issue.
      </p>
    </div>
  );
}

export default App;