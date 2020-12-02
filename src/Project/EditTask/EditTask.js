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
            title: e.target.value
        })
    }
    handleSave = () => {
        fetch(`http://localhost:3001/task/${this.state._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: this.state.title
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw res.error;
                }
                if (!this.state.title) {
                    return;
                }
                return this.props.onSave(this.state);
            })
            .catch(err => console.log(err))

    }
    handleKeyUp = (e) => {
        e.key === 'Enter' && this.handleSave();
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
                            onChange={this.handleChage}
                            onKeyUp={this.handleKeyUp}
                            value={this.state.title}
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