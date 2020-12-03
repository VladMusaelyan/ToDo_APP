import React from 'react';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default class EditTask extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...props.data,
            date: props.data.date ? new Date(props.data.date) : new Date()
        }
    }
    handleChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    }
    handleSave = () => {
        if (!this.state.title) {
            return;
        }
        const editedTask = {
            ...this.state,
            date: this.state.date.toISOString().slice(0, 10)
        };
        this.props.onSave(editedTask);
    }
    handleKeyUp = (e) => {
        e.key === 'Enter' && this.handleSave();
    }
    handleDateChange = (date) => {
        this.setState({
            date
        })
    }
    render() {
        const { props } = this;
        return (
            <Modal
                show={true}
                onHide={props.onClose}
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className='mb-3'>
                        <FormControl
                            placeholder="Edit task"
                            aria-describedby="basic-addon2"
                            onChange={(e) => this.handleChange(e, 'title')}
                            onKeyUp={this.handleKeyUp}
                            value={this.state.title}
                        />
                        <InputGroup.Append>
                        </InputGroup.Append>
                    </InputGroup>
                    <textarea
                        rows="5"
                        className='w-100'
                        onChange={(e) => this.handleChange(e, 'description')}
                        placeholder='Description'
                        value={this.state.description}
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
                        onClick={this.handleSave}
                    >
                        Save
                        </Button>
                    <Button variant="secondary" onClick={props.onClose}>
                        Close
                        </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

EditTask.propTypes = {
    data: PropTypes.object,
    onClose: PropTypes.func,
    onSave: PropTypes.func
}