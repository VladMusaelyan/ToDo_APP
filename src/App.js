/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import './App.css';
import ToDo from './demo/toDo/ToDo';
import Product from './product/Product'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Product
          price='1$'
          name='Potatos'
          description='Potatos from Martuni'
        />
        <ToDo />
      </header>
    </div>
  );
}

export default App;
