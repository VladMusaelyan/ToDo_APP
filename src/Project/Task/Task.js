import React from 'react';
import styles from './TaskStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Task extends React.PureComponent {
    state = {
        checked: false
    };

    handleCheck = () => {
        this.setState({
            checked: !this.state.checked
        });
        this.props.selectedTask(this.props.data._id);
    };
    render() {
        const element = this.props.data;
        const { disabled } = this.props;
        return (
            <Card className={this.state.checked && 'border border-danger'}>
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
                                type='checkbox'
                                onClick={this.handleCheck}
                                className={styles.checkbox}
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
                            onClick={() => this.props.onEdit(element)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => this.props.onRemoveTask(element._id)}
                            disabled={disabled}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div>
                </Card.Body >
            </Card >
        );
    }
}

export default Task;

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onRemoveTask: PropTypes.func.isRequired,
    selectedTask: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};