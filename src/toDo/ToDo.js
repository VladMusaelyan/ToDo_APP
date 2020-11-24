/* eslint-disable react/style-prop-object */
/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
import React from 'react';
import styles from './taskStyles.module.css';
import { Task } from './Task';
import IdGenerator from '../assets/IDGenerator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, InputGroup, FormControl, Row, Col, Container, Card } from 'react-bootstrap';

class ToDo extends React.Component {
    state = {
        tasks: [],
        inputValue: '',
    }
    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }
    handleClick = () => {
        const { tasks, inputValue } = this.state;
        this.setState({
            tasks: [{
                _id: IdGenerator(),
                text: inputValue
            }, ...tasks],
            inputValue: ''
        })
    }
    removeTask = (id) => {
        const removeTask = this.state.tasks.filter(element => element._id !== id);
        this.setState({
            tasks: removeTask
        })
    }
    handleKeyDown = (e) => {
        e.key === 'Enter' && this.setState({
            tasks: [{
                _id: IdGenerator(),
                text: this.state.inputValue
            }, ...this.state.tasks],
            inputValue: ''
        })
    }
    render() {
        const tasks = this.state.tasks.map((element) => {
            return (
                <Col className='mt-3' key={element._id} xs={12} sm={12} md={6} lg={4} xl={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {element.text.slice(0, 10)}
                                {element.text !== '' ? element.text.length > 10 && '...' : 'Empty Task'}</Card.Title>
                            <Card.Text>
                                {element.text}
                            </Card.Text>
                            <div className='d-flex flex-row-reverse'>
                                <Button
                                    variant="warning"
                                    className='ml-3'
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => this.removeTask(element._id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            )
        });
        return (
            <div >
                <Container>
                    <Row className={styles.container + ' p-3'}>
                        <Col xs={12} sm={12} md={12} lg={10} xl={10}>
                            <InputGroup className='mb-3'>
                                <FormControl
                                    placeholder="Add a new task"
                                    aria-describedby="basic-addon2"
                                    value={this.state.inputValue}
                                    onChange={this.handleChange}
                                    onKeyDown={this.handleKeyDown}
                                    className={styles.input}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-primary"
                                        onClick={this.handleClick}
                                    >
                                        Add
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Task text={tasks} />
                    </Row>
                </Container>
            </div >
        );
    };
}

export default ToDo;