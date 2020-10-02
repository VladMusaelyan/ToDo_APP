/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import './App.css';
import Product from './product/Product';
import Link from './demo/Example';



function App() {
  return (
    <div className="App">
      <header className="App-header">

        <h1 className='header'>Understanding Class Components</h1>
        <Product price='3$'
          name='Potatoes'
          description='Potatoes from Martuni'
        />
        <Product price='2$'
          name='Banana'
          description='Fresh bananas from Afrika'
        />
        <Link />

      </header>
    </div>
  );
}

export default App;
