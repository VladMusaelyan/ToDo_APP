import React, { useState, useRef, useEffect } from 'react';
import { FormControl, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './inputstyles.module.css';

export default function AddTask(props) {

    const [date, setDate] = useState(new Date());

    const titleRef = useRef(null);

    const descriptionRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    const handleKeyDown = (e) => {
        e.key === 'Enter' & titleRef.current.value !== '' && addTask();
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    const addTask = () => {
        if (!titleRef.current.value) {
            return;
        }
        const task = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            date: date.toISOString().slice(0, 10)
        };
        props.onAdd(task);
    };

    const { onClose } = props;
    return (
        <Modal
            show={true}
            onHide={onClose}
            size='lg'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Add new task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    placeholder="Title"
                    onKeyDown={handleKeyDown}
                    className='mb-3'
                    ref={titleRef}
                />
                <textarea
                    rows="5"
                    className={styles.textArea}
                    placeholder="Description"
                    ref={descriptionRef}
                />
                <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    minDate={new Date()}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="success"
                    onClick={addTask}
                >
                    Add
                </Button>
                <Button
                    variant="secondary"
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

AddTask.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
};