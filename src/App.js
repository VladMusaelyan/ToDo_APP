/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import './App.css';
import ToDo from './Project/Pages/ToDo/ToDo';
import About from './Project/Pages/About/About';
import Contact from './Project/Pages/Contact/Contact';
import NotFound from './Project/Pages/NotFound/NotFound';
import NavBar from './Project/NavBar/NavBar';
import TaskPage from './Project/Pages/TaskPage/TaskPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar />

      <Switch>
        <Route path='/' exact component={ToDo} />
        <Route path='/about' exact component={About} />
        <Route path='/contact' exact component={Contact} />
        <Route path='/task/:id' exact component={TaskPage} />
        <Route path='/404' exact component={NotFound} />
        <Redirect to={'/404'} />
      </Switch>
    </>
  );
}

export default App;
