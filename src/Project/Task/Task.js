import React from 'react';
import styles from './TaskStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Row, Col, Card } from 'react-bootstrap';
import Proptypes from 'prop-types';

class Task extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            elementId: null
        }
    }
    // setState for updateing component
    handleselectedTask = () => {
        const { selectedTask, element } = this.props;
        this.setState({
            elementId: selectedTask(element._id)
        });
    }
    render() {
        const { element, disabled, toogleEdit, onRemoveTask } = this.props
        return (
            <>
                <Card className={element.checked && 'border border-danger'}>
                    <Card.Body>
                        <Row>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                <Card.Title>
                                    {element.title.slice(0, 10)}
                                    {element.title.length > 10 && '...'}
                                </Card.Title>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    onClick={() => this.handleselectedTask(element._id)}
                                />
                            </Col>
                        </Row>
                        <Card.Text>Description: {element.description}</Card.Text>
                        <Card.Text>Date: {element.date.slice(0, 10)}</Card.Text>
                        <Card.Text>Created at: {element.created_at.slice(0, 10)}</Card.Text>
                        <div className='d-flex flex-row-reverse'>
                            <Button
                                variant="warning"
                                disabled={disabled}
                                className='ml-3'
                                onClick={() => toogleEdit(element)}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => onRemoveTask(element._id)}
                                disabled={this.props.disabled}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

export default Task;

Task.propTypes = {
    selectedTask: Proptypes.func.isRequired,
    element: Proptypes.object.isRequired,
    onRemoveTask: Proptypes.func.isRequired,
    toogleEdit: Proptypes.func.isRequired,
    disabled: Proptypes.bool
}