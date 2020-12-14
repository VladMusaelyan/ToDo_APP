import React from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import styles from './ContactStyles.module.css';

export default function Contact() {
    return (
        <div className={styles.componentBody}>
            <Container>
                <h1 className={styles.fontStyle}>Contact Us</h1>
                <p className='d-flex justify-content-center text-center'>
                    Got a question? We'd love to hear from you. Send us a message and wi'll response as soon as posible.
                </p>
                <Form className='m-auto w-50'>
                    <Form.Group className='mt-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5} />
                    </Form.Group>
                    <Button className='w-100'>Send Message</Button>
                </Form>
            </Container>
        </div>
    )
}