import React, { useState } from 'react';
import styles from './TaskStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Task(props) {

    const [checked, setChecked] = useState(false);

    const handleCheck = (e) => {

        e.stopPropagation();

        setChecked(!checked);

        props.selectedTask(props.data._id);
    };

    const element = props.data;
    const { disabled } = props;
    return (
        <Card className={checked && 'border border-danger'}>
            <Link
                to={`/task/${element._id}`}
                className={styles.link}
                onClick={(e) => { disabled && e.preventDefault() }}
            >
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
                                onClick={handleCheck}
                                className={styles.checkbox}
                            />
                        </Col>
                    </Row>
                    <Card.Text>Description: {element.description}</Card.Text>
                    <Card.Text>Date: {element.date.slice(0, 10)}</Card.Text>
                    <Card.Text>Created at: {element.created_at.slice(0, 10)}</Card.Text>
                </Card.Body >
            </Link>
            <Card.Footer>
                <div className='d-flex flex-row-reverse'>
                    <Button
                        variant="warning"
                        disabled={disabled}
                        className='ml-3'
                        onClick={() => props.onEdit(element)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => props.onRemoveTask(element._id)}
                        disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            </Card.Footer>
        </Card >
    );
}


Task.propTypes = {
    data: PropTypes.object.isRequired,
    onRemoveTask: PropTypes.func.isRequired,
    selectedTask: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};