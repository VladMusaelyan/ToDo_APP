import React, { useState, memo } from 'react';
import styles from './TaskStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheckCircle, faHistory, faStar } from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeTask, selectedTask, editTask, changeStatus, changeSelectedStatus } from '../../ReduxStore/actions';
import { useHistory } from 'react-router-dom';

function Task(props) {

    let from = '';

    const history = useHistory();

    const [checked, setChecked] = useState(false);

    const regex = /\/task\/.{24}/;

    const pageLocation = () => {
        return regex.test(history.location.pathname);
    };

    if (pageLocation()) {
        from = 'singleTask';
    };

    const handleCheck = (e) => {
        e.stopPropagation();
        setChecked(!checked);
        props.selectedTask(props.data._id);
    };

    const redirect = () => {
        history.push('/');
    };

    const handleChangeStatus = () => {
        const status = props.data.status === 'active' ? 'done' : 'active';
        const task = {
            ...props.data,
            date: new Date(props.data.date).toISOString().slice(0, 10),
            status
        };
        props.changeStatus(task, from);
    };

    const handleChangeSelectedStatus = () => {
        if (props.disabled) return;
        const selected = props.data.selected === 'true' ? 'false' : 'true';
        const task = {
            ...props.data,
            date: new Date(props.data.date).toISOString().slice(0, 10),
            selected
        };
        props.changeSelectedStatus(task, from);
    };

    const task = props.data;
    const { disabled } = props;
    return (
        <Card className={checked && 'border border-danger'}>
            <Card.Header>
                <Row>
                    <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                        <Card.Title className='m-0'>
                            {pageLocation() ? task.title : task.title.slice(0, 10)}
                            {pageLocation() ? null : task.title.length > 10 && '...'}
                        </Card.Title>
                    </Col>
                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                        <Row className={pageLocation() && 'flex-row-reverse'}>
                            {
                                pageLocation() ? null : <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                    <input
                                        type='checkbox'
                                        onClick={handleCheck}
                                        className={styles.checkbox}
                                    />
                                </Col>
                            }
                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className={task.selected === 'true' ? styles.selected : styles.nonSelected}
                                    onClick={handleChangeSelectedStatus}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Header>
            <Link
                to={`/task/${task._id}`}
                className={pageLocation() ? styles.singleTaskLink : styles.link}
                onClick={(e) => { (disabled || pageLocation()) && e.preventDefault() }}
            >
                <Card.Body>
                    <Card.Text> <span style={{ fontWeight: 'bold', opacity: '.7' }}>Description:</span> {pageLocation() ? task.description : task.description.length > 20 ? task.description.slice(0, 18) + '...' : task.description}</Card.Text>
                    <Card.Text><span style={{ fontWeight: 'bold', opacity: '.7' }}>Status:</span> <span style={{ fontWeight: 'bolder', color: task.status === 'active' ? '#007BFF' : '#28A745' }}>{task.status}</span></Card.Text>
                    <Card.Text><span style={{ fontWeight: 'bold', opacity: '.7' }}>Date:</span> {task.date.slice(0, 10)}</Card.Text>
                    <Card.Text><span style={{ fontWeight: 'bold', opacity: '.7' }}>Created at:</span> {task.created_at.slice(0, 10)}</Card.Text>
                </Card.Body >
            </Link>
            <Card.Footer>
                <div className='d-flex flex-row-reverse'>
                    <Button
                        variant="warning"
                        disabled={disabled}
                        onClick={() => props.editTask(task, from)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                        variant="danger"
                        className='mr-1'
                        onClick={() => props.removeTask(task._id, from, redirect)}
                        disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button
                        variant={task.status === 'active' ? "success" : "primary"}
                        className='mr-1'
                        disabled={disabled}
                        onClick={handleChangeStatus}
                    >
                        <FontAwesomeIcon icon={task.status === 'active' ? faCheckCircle : faHistory} />
                    </Button>
                </div>
            </Card.Footer>
        </Card >
    );
};


Task.propTypes = {
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        disabled: !!state.selectedTasks.length
    };
};

const mapDispatchToProps = {
    removeTask,
    selectedTask,
    editTask,
    changeStatus,
    changeSelectedStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Task));