import React from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import styles from './NavBarStyles.module.css';
import { NavLink } from 'react-router-dom';


export default function NavBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink
                        to='/'
                        exact
                        activeClassName={styles.activeLink}
                        className={`${styles.link} text-decoration-none mr-4 ml-4 mr-4 ml-4`}
                    >
                        Home
                        </NavLink>
                    <NavLink
                        to='/about'
                        exact
                        activeClassName={styles.activeLink}
                        className={`${styles.link} text-decoration-none mr-4 ml-4 mr-4 ml-4`}
                    >
                        About
                        </NavLink>
                    <NavLink
                        to='/contact'
                        exact
                        activeClassName={styles.activeLink}
                        className={`${styles.link} text-decoration-none mr-4 ml-4 mr-4 ml-4`}
                    >
                        Contact
                        </NavLink>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}