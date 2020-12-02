import React from 'react';
import { InputGroup, FormControl, Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './inputstyles.module.css';


class Input extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            date: new Date()
        }
    }
    handleChange = (event, type) => {
        this.setState({
            [type]: event.target.value
        });
    }
    handleKeyDown = (e) => {
        e.key === 'Enter' & this.state.inputValue !== '' && this.props.addTask(this.state);
    }
    handleDateChange = (date) => {
        this.setState({
            date
        });
    };
    render() {
        const { onClose, show, addTask } = this.props;
        return (
            <Modal
                show={show}
                onHide={onClose}
                centered
                size={"lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className='mb-3'>
                        <FormControl
                            placeholder="Title"
                            onChange={(e) => this.handleChange(e, 'title')}
                            onKeyDown={this.handleKeyDown}
                        />
                    </InputGroup>
                    <textarea
                        rows="5"
                        className={styles.textArea}
                        onChange={(e) => this.handleChange(e, 'description')}
                        placeholder='Description'
                    >

                    </textarea>

                    <DatePicker
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                        minDate={new Date()}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        onClick={() => addTask(this.state)}
                        disabled={!this.state.title}
                    >
                        Add
                        </Button>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                        </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Input;

Input.propTypes = {
    onClose: PropTypes.func,
    addTask: PropTypes.func,
    show: PropTypes.bool
}

