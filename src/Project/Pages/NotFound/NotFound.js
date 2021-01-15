import React from 'react';
import styles from './NotFound.module.css';
import { faFrownOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

export default function NotFound() {
    return (
        <>
            <h1 className={styles.title}>Oops! That page can’t be found.<FontAwesomeIcon icon={faFrownOpen} /></h1>
            <p className={styles.text}>It looks like nothing was found at this location. Try searching or go to
            <NavLink
                    to='/'
                    className='text-decoration-none ml-1'
                >
                    Home
                </NavLink>
                .</p>
        </>
    )
}