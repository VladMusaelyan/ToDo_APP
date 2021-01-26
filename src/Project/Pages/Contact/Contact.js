import React, { useRef, memo, useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import styles from './ContactStyles.module.css';
import { contactSubmit } from '../../../ReduxStore/actions';
import { connect } from 'react-redux';

function Contact(props) {

    const nameRef = useRef(null);
    const [nameStyle, setNameStyle] = useState({ borderColor: '#ced4da' });

    const emailRef = useRef(null);
    const [emailStyle, setEmailStyle] = useState({ borderColor: '#ced4da' });

    const messageRef = useRef(null);
    const [messageStyle, setMessageStyle] = useState({ borderColor: '#ced4da' });

    const handleSubmit = () => {

        const emailReg = /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/;

        const emailRegBool = emailReg.test(emailRef.current.value);

        if (nameRef.current.value === '') {
            setNameStyle({ borderColor: 'red' });
        } else {
            setNameStyle({ borderColor: '#ced4da' });
        };

        if (emailRegBool) {
            setEmailStyle({ borderColor: '#ced4da' });
        } else {
            setEmailStyle({ borderColor: 'red' });
        };

        if (messageRef.current.value === '') {
            setMessageStyle({ borderColor: 'red' });
        } else {
            setMessageStyle({ borderColor: '#ced4da' });
        };

        if (!!nameRef.current.value && emailRegBool && !!messageRef.current.value) {

            const body = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                message: messageRef.current.value
            };

            props.contactSubmit(body);

            nameRef.current.value = '';
            emailRef.current.value = '';
            messageRef.current.value = '';
        };
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
                            pattern='[A-Za-z]{3}'
                            type="text"
                            ref={nameRef}
                            style={nameStyle}
                        />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            ref={emailRef}
                            style={emailStyle}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            ref={messageRef}
                            style={messageStyle}
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