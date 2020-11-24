/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import './App.css';
import ToDo from './toDo/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Block from './Example/Block'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ToDo />
        {/* <Block /> */}
      </header>
    </div>
  );
}

export default App;
