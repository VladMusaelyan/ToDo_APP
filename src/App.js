/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import './App.css';
import ToDo from './Project/ToDo/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ToDo from './Example/ToDo'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ToDo />
      </header>
    </div>
  );
}

export default App;
