import React, { memo, useRef } from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import styles from './NavBarStyles.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTasks, searchTask } from '../../ReduxStore/actions';
import { useHistory } from 'react-router-dom';


function NavBar(props) {

    const searchInputRef = useRef(null);

    const history = useHistory();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            props.searchTask(searchInputRef.current.value)
            if (history.location.pathname !== '/') {
                history.push('/')
            };
            searchInputRef.current.value = '';
        };
    };

    return (
        <Navbar
            bg="light"
            variant="light"
            expand="lg"
        >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink
                        to='/'
                        exact
                        activeClassName={styles.activeLink}
                        className={`${styles.link} text-decoration-none mr-4 ml-4 mr-4 ml-4`}
                        onClick={() => props.getTasks()}
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
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                        ref={searchInputRef}
                        onKeyPress={handleKeyPress}
                    />
                    <Button
                        variant="outline-primary"
                        onClick={() => {
                            props.searchTask(searchInputRef.current.value)
                            if (history.location.pathname !== '/') {
                                history.push('/')
                            };
                            searchInputRef.current.value = '';
                        }}
                    >
                        Search
                        </Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
};

const mapDispatchToProps = {
    getTasks,
    searchTask
};

export default connect(null, mapDispatchToProps)(memo(NavBar));