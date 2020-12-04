import React from 'react';
import { FormControl, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './inputstyles.module.css';

export default class AddTask extends React.PureComponent {

    state = {
        title: '',
        description: '',
        date: new Date()
    };
    handleChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        });
    };
    handleKeyDown = (e) => {
        e.key === 'Enter' & this.state.title !== '' && this.addTask();
    };
    handleDateChange = (date) => {
        this.setState({
            date
        });
    };
    addTask = () => {
        const { title, description, date } = this.state;
        if (!title) {
            return;
        }
        const task = {
            title,
            description,
            date: date.toISOString().slice(0, 10)
        };
        this.props.onAdd(task);
    };
    render() {
        const { title, date } = this.state;
        const { show, onClose } = this.props;
        return (
            <Modal
                show={show}
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
                        onChange={(e) => this.handleChange(e, 'title')}
                        onKeyDown={this.handleKeyDown}
                        className='mb-3'
                    />
                    <textarea
                        rows="5"
                        className={styles.textArea}
                        placeholder="Description"
                        onChange={(e) => this.handleChange(e, 'description')}
                    >
                    </textarea>
                    <DatePicker
                        selected={date}
                        onChange={this.handleDateChange}
                        minDate={new Date()}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        onClick={this.addTask}
                        disabled={!title}
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
}

AddTask.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    show: PropTypes.bool
};