import React, { useRef, useState, useEffect } from 'react';
import { Button, Modal, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditTask(props) {

    const [state, setState] = useState({
        ...props.data,
        date: props.date ? new Date(props.date) : new Date()
    });

    const titleRef = useRef(null);

    const descriptionRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    const handleChange = (e, type) => {
        setState({
            ...state,
            [type]: e.target.value
        });
    };

    const handleSave = () => {
        const { title, date } = state;
        if (!title) {
            return;
        }
        const editedTask = {
            ...state,
            date: date.toISOString().slice(0, 10)
        };
        props.onSave(editedTask);
    };

    const handleKeyUp = (e) => {
        e.key === 'Enter' && handleSave();
    };

    const handleDateChange = (date) => {
        setState({
            ...state,
            date: date
        });
    };

    const { onClose } = props;
    const { title, description, date } = state;
    return (
        <Modal
            show={true}
            onHide={onClose}
            size='lg'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    placeholder="Title"
                    onChange={(e) => handleChange(e, 'title')}
                    onKeyUp={handleKeyUp}
                    value={title}
                    className='mb-1'
                    ref={titleRef}
                />
                <textarea
                    rows="5"
                    className='w-100'
                    placeholder="Description"
                    value={description}
                    onChange={(e) => handleChange(e, 'description')}
                    onKeyUp={handleKeyUp}
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
                    onClick={handleSave}
                >
                    Save
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

EditTask.propTypes = {
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};