import React from 'react';
import styles from './TaskPage.module.css';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { editTask, removeTask, getTask } from '../../../ReduxStore/actions';

class TaskPage extends React.PureComponent {

    componentDidMount = () => {
        this.props.getTask(this.props.match.params.id);
    };

    render() {
        const { data } = this.props;
        return (
            <>
                {this.props.data ? < Card border="info">
                    <Card.Header> <h3>{data.title}</h3> </Card.Header>
                    <Card.Body>
                        <Row>
                            <Col xs={11}>
                                <Card.Text><span className={styles.property}>Description</span>: {data.description}</Card.Text>
                                <Card.Text><span className={styles.property}>Date</span>: {data.date.slice(0, 10)}</Card.Text>
                                <Card.Text><span className={styles.property}>Created at</span>: {data.created_at.slice(0, 10)}</Card.Text>
                            </Col>
                            <Col xs={1}>
                                <Row>
                                    <Button
                                        variant="warning"
                                        size='lg'
                                        className='w-50'
                                        onClick={() => this.props.editTask(data, 'singleTask')}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                </Row>
                                <Row>
                                    <Button
                                        variant="danger"
                                        size='lg'
                                        className='mt-2 w-50'
                                        onClick={() => {
                                            this.props.removeTask(data._id);
                                            this.props.history.push('/');
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card> : null}
            </>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.singleTask
    };
};

const mapDispatchToProps = {
    editTask,
    removeTask,
    getTask
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);