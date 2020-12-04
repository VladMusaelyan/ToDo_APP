import React from 'react';
import { Button, Modal, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditTask extends React.PureComponent {
    constructor(props) {
        super(props);
        const { date } = props.data;

        this.state = {
            ...props.data,
            date: date ? new Date(date) : new Date()
        };
    }
    handleChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        });
    };
    handleSave = () => {
        const { title, date } = this.state;
        if (!title) {
            return;
        }
        const editedTask = {
            ...this.state,
            date: date.toISOString().slice(0, 10)
        };
        this.props.onSave(editedTask);
    }
    handleKeyUp = (e) => {
        e.key === 'Enter' && this.handleSave();
    }
    handleDateChange = (date) => {
        this.setState({
            date
        });
    };

    render() {
        const { onClose } = this.props;
        const { title, description, date } = this.state;
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
                        onChange={(e) => this.handleChange(e, 'title')}
                        onKeyUp={this.handleKeyUp}
                        value={title}
                        className='mb-1'
                    />
                    <textarea
                        rows="5"
                        className='w-100'
                        placeholder="Description"
                        value={description}
                        onChange={(e) => this.handleChange(e, 'description')}
                        onKeyUp={this.handleKeyUp}
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
                        onClick={this.handleSave}
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
}

EditTask.propTypes = {
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
};