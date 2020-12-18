import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './styles.module.css';

export default function () {
    return (
        <div className={styles.spiner}>
            <Spinner
                animation="border"
            />
        </div>
    );
}