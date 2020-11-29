import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Confirm(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onClose}
            size={"lg"}
            centered>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure that you want to delete these {props.count} {props.count === 1 ? 'task' : 'tasks'}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onSubmit}>
                    Delete
                        </Button>
                <Button variant="secondary" onClick={props.onClose}>
                    Close
                        </Button>
            </Modal.Footer>
        </Modal>
    )
}

Confirm.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired
}