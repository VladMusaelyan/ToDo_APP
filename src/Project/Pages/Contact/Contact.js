import React, { useRef, memo } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import styles from './ContactStyles.module.css';
import { contactSubmit } from '../../../ReduxStore/actions';
import { connect } from 'react-redux';

function Contact(props) {

    const nameRef = useRef(null);

    const emailRef = useRef(null);

    const messageRef = useRef(null);

    if (!!props.contactMessage) {
        nameRef.current.value = '';
        emailRef.current.value = '';
        messageRef.current.value = '';
    };

    const handleSubmit = () => {

        const body = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            message: messageRef.current.value
        };

        props.contactSubmit(body);
    };

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
                        <Form.Control
                            type="text"
                            ref={nameRef}
                        />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            ref={emailRef}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            ref={messageRef}
                        />
                    </Form.Group>
                    <Button
                        className='w-100'
                        onClick={handleSubmit}
                    >
                        Send Message
                        </Button>
                </Form>
            </Container>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        contactMessage: state.contactMessage
    };
};

const mapDispatchToProps = {
    contactSubmit
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Contact));