import React from 'react';
import img from '../../../assets/images/about.png';
import { Row, Col, Button } from 'react-bootstrap';
import styles from './About.module.css';
import { useHistory } from 'react-router-dom';

export default function About() {

    const history = useHistory();

    const goHome = () => {
        history.push('/');
    };

    return (
        <Row>
            <Col className={styles.description}>
                <h1>The all-in-one to-do list for web.</h1>
                <p>Don’t get left behind. Get rid of overpriced project management tools and get your work
                done with an all-in-one web app that makes other apps look dull.</p>
                <Button onClick={goHome}>Get Started</Button>
            </Col>
            <Col>
                <img src={img} alt='' className={styles.img} />
            </Col>
        </Row>
    );
};