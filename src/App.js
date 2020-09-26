/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import './App.css';
import Person from './demo/Person';
import Animal from './demo/Animal';
import JavaScript from './demo/JavaScript'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Person name='Alias'
          lastName='Ashmole'
          occupation='Alchemyst'
        />
        <Animal type='Dog'
          color='Black'
          name='Oggy'
        />
        <JavaScript name='JavaScript'
          typingDiscipline='Dynamic'
          firstAppeared='December 4, 1995'
        />
      </header>
    </div>
  );
}

export default App;
