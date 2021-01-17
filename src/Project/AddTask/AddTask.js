import React, { useState, useRef, useEffect } from 'react';
import { FormControl, Button, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './inputstyles.module.css';
import { connect } from 'react-redux';
import { addTask, toggle } from '../../ReduxStore/actions';
import { TOGGLE_ADD_TASK } from '../../ReduxStore/types';

function AddTask(props) {

    const [date, setDate] = useState(new Date());

    const titleRef = useRef(null);

    const descriptionRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    const handleDateChange = (date) => {
        setDate(date);
    };

    const addTask = () => {
        if (!titleRef.current.value) {
            return;
        };
        const task = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            date: date.toISOString().slice(0, 10)
        };
        props.addTask(task);
    };

    return (
        <Modal
            show={true}
            onHide={() => props.toggle(TOGGLE_ADD_TASK)}
            size='lg'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Add new task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    placeholder="Title"
                    className='mb-3'
                    ref={titleRef}
                    onKeyPress={(e) => e.key === 'Enter' && descriptionRef.current.focus()}
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
                    onClick={() => props.toggle(TOGGLE_ADD_TASK)}
                >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapDispatchToProps = {
    addTask,
    toggle
};

export default connect(null, mapDispatchToProps)(AddTask);