import React, { memo } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import styles from './NavBarStyles.module.css';
import { NavLink } from 'react-router-dom';

function NavBar() {

    const pages = [
        {
            lable: 'Home',
            to: '/'
        },
        {
            lable: 'About',
            to: '/about'
        },
        {
            lable: 'Contact',
            to: '/contact'
        }
    ];

    return (
        <Navbar
            bg="light"
            variant="light"
            expand="lg"
        >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {
                    pages.map((item, index) => {
                        return (
                            <Nav className="mr-2" key={index}>
                                <NavLink
                                    to={item.to}
                                    exact
                                    activeClassName={styles.activeLink}
                                    className={`${styles.link} text-decoration-none mr-4 ml-4`}
                                >
                                    {item.lable}
                                </NavLink>
                            </ Nav>
                        )
                    })
                }
            </Navbar.Collapse>
        </Navbar>
    );
};

export default memo(NavBar);