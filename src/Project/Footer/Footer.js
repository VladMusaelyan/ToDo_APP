import React from 'react';
import styles from './footerStyles.module.css';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function () {
    return (
        <div className={styles.footer}>
            <a
                href="https://github.com/VladMusaelyan/"
                className='mr-3'
                rel="noopener noreferrer"
                target='_blank'
            >
                <FontAwesomeIcon icon={faGithub} color='black' />
            </a>
            <a
                href="https://www.linkedin.com/in/vlad-musaelyan-b6035b202/"
                rel="noopener noreferrer"
                target='_blank'
            >
                <FontAwesomeIcon icon={faLinkedin} color='#007BFF' />
            </a>
            |
            <a
                href="https://www.facebook.com/profile.php?id=100046693954570"
                rel="noopener noreferrer"
                target='_blank'
                className='text-decoration-none'
            >
                &#xa9; VM
                 </a>
        </div>
    );
};