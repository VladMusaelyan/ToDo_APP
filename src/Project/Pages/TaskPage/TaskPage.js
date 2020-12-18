import React from 'react';
import styles from './TaskPage.module.css';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditTask from '../../EditTask/EditTask';
import Spinner from '../../../assets/functions/Spinner';

export default class TaskPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            editTask: false
        };
    }
    componentDidMount = () => {
        fetch(`http://localhost:3001/task/${this.props.match.params.id}`)
            .then((res) => res.json())
            .then(res => {
                if (res.error) {
                    throw res.error;
                }
                this.setState({
                    data: {
                        ...res
                    }
                })
            })
            .catch((err) => console.log(err));
    }
    onRemoveTask = () => {
        fetch(`http://localhost:3001/task/${this.state.data._id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(res => {
                if (res.error) {
                    throw res.error;
                }
                this.props.history.push('/')
            })
            .catch(err => console.log(err))
    };
    toogleEdit = () => {
        this.setState({
            editTask: !this.state.editTask
        });
    }
    saveTask = (editedTask) => {
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedTask)
        })
            .then((res) => res.json())
            .then(res => {

                if (res.error) {
                    throw res.error;
                }
                this.setState({
                    data: res,
                    editTask: false
                });
            })
            .catch((err) => console.log(err));

    };
    render() {
        const { title, description, date, created_at } = this.state.data
        return (
            <>
                {!!this.state.data
                    ? <Card border="info">
                        <Card.Header> <h3>{title}</h3> </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={11}>
                                    <Card.Text><span className={styles.property}>Description</span>: {description}</Card.Text>
                                    <Card.Text><span className={styles.property}>Date</span>: {date.slice(0, 10)}</Card.Text>
                                    <Card.Text><span className={styles.property}>Created at</span>: {created_at.slice(0, 10)}</Card.Text>
                                </Col>
                                <Col xs={1}>
                                    <Row>
                                        <Button
                                            variant="warning"
                                            size='lg'
                                            className='w-50'
                                            onClick={this.toogleEdit}
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                    </Row>
                                    <Row>
                                        <Button
                                            variant="danger"
                                            size='lg'
                                            className='mt-2 w-50'
                                            onClick={this.onRemoveTask}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    : <Spinner />
                }

                {this.state.editTask && <EditTask
                    data={this.state.data}
                    onSave={this.saveTask}
                    onClose={() => this.toogleEdit(null)}
                />}
            </>
        )
    }
}