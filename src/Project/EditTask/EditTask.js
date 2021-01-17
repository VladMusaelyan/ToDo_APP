import React, { useRef, useState, useEffect, memo } from 'react';
import { Button, Modal, FormControl } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import { toggle, saveEditedTask } from '../../ReduxStore/actions';
import { TOGGLE_EDIT_TASK } from '../../ReduxStore/types';

function EditTask(props) {

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
        };
        const editedTask = {
            ...state,
            date: date.toISOString().slice(0, 10)
        };
        props.saveEditedTask(editedTask);
    };

    const handleDateChange = (date) => {
        setState({
            ...state,
            date: date
        });
    };

    const { title, description, date } = state;
    return (
        <Modal
            show={true}
            onHide={() => props.toggle(TOGGLE_EDIT_TASK)}
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
                    value={title}
                    className='mb-1'
                    ref={titleRef}
                    onKeyPress={(e) => e.key === 'Enter' && descriptionRef.current.focus()}
                />
                <textarea
                    rows="5"
                    className='w-100'
                    placeholder="Description"
                    onChange={(e) => handleChange(e, 'description')}
                    value={description}
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
                    variant="primary"
                    onClick={handleSave}
                >
                    Save
            </Button>
                <Button
                    variant="secondary"
                    onClick={() => props.toggle(TOGGLE_EDIT_TASK)}
                >
                    Cancel
            </Button>
            </Modal.Footer>
        </Modal>

    );
};

const mapStateToProps = (state) => {
    return {
        data: state.editedTask
    };
};

const mapDispatchToProps = {
    toggle,
    saveEditedTask
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(EditTask));