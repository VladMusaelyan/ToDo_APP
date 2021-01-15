import React from 'react';
import ToDo from '../Pages/ToDo/ToDo';
import About from '../Pages/About/About';
import Contact from '../Pages/Contact/Contact';
import NotFound from '../Pages/NotFound/NotFound';
import NavBar from '../NavBar/NavBar';
import TaskPage from '../Pages/TaskPage/TaskPage';
import Footer from '../Footer/Footer';
import { Route, Switch, Redirect } from 'react-router';

export default function Routes() {
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

            <Footer />
        </>
    );
};