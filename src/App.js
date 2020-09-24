/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import './App.css';
import Date from './demo/index'

function Person(props) {
  return (
    <div>
      <h3>Name: {props.name}</h3>
      <h3>Lastname: {props.lastname}</h3>
      <h3>Occupation: {props.occupation}</h3>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Person name='Elias'
          lastname='Ashmole'
          occupation='Alchemyst'
        />
        <Person name='Mark'
          lastname='Zuckerberg'
          occupation='Devoloper'
        />
        <Date />
      </header>
    </div>
  );
}

export default App;
