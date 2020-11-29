import React from 'react';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class EditTask extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ...props.data
        }
    }
    handleChage = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    handleSave = () => {
        if (!this.state.text) {
            return;
        }
        return this.props.onSave(this.state)
    }
    // handleKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //         this.handleSave()
    //     }
    // }
    render() {
        const { props } = this;
        return (
            <Modal show={true} onHide={props.onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className='mb-3'>
                        <FormControl
                            placeholder="Edit task"
                            aria-describedby="basic-addon2"
                            onChange={this.handleChage}
                            // onKeyDown={this.handleKeyDown}
                            value={this.state.text}
                        />
                        <InputGroup.Append>
                        </InputGroup.Append>
                    </InputGroup>
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