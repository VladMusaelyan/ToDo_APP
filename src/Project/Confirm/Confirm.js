import React, { memo } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeTasks, toggle } from '../../ReduxStore/actions';
import { TOGGLE_CONFIRM } from '../../ReduxStore/types';

function Confirm(props) {

    const requestBody = {
        tasks: [...props.selectedTasks]
    };

    return (
        <Modal
            show={props.show}
            onHide={() => props.toggle(TOGGLE_CONFIRM)}
            size='lg'
            centered>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure that you want to delete these {props.count} {props.count === 1 ? 'task' : 'tasks'}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button
                    variant="danger"
                    onClick={() => props.removeTasks(requestBody)}
                >
                    Delete
          </Button>
                <Button variant="secondary" onClick={() => props.toggle(TOGGLE_CONFIRM)}>
                    Cancle
          </Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        count: state.selectedTasks.length,
        selectedTasks: state.selectedTasks,
        show: state.showConfirm
    };
};

const mapDispatchToProps = {
    removeTasks,
    toggle
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Confirm));