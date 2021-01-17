import React, { memo, useRef } from 'react';
import { Nav, Navbar, Form, FormControl, Button } from 'react-bootstrap';
import styles from './NavBarStyles.module.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchTask, getTasks } from '../../ReduxStore/actions';
import { useHistory } from 'react-router-dom';


function NavBar(props) {

    const searchInputRef = useRef(null);

    const history = useHistory();

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            props.searchTask(searchInputRef.current.value, 'search');
            if (history.location.pathname !== '/') {
                history.push('/');
            };
            searchInputRef.current.value = '';
        };
    };

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
                                    onClick={() => {
                                        if (item.lable === 'Home' && history.location.pathname === '/') props.getTasks()
                                    }}
                                >
                                    {item.lable}
                                </NavLink>
                            </ Nav>
                        )
                    })
                }
                <Form inline className='ml-auto'>
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
                            props.searchTask(searchInputRef.current.value, 'search')
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
    searchTask,
    getTasks
};

export default connect(null, mapDispatchToProps)(memo(NavBar));