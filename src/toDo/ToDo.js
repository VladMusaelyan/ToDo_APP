/* eslint-disable react/style-prop-object */
/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
import React from 'react';
import Task from './Task';
import IdGenerator from '../assets/IDGenerator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, InputGroup, FormControl, Row, Col, Container } from 'react-bootstrap';

class ToDo extends React.Component {
    state = {
        tasks: [],
        inputValue: '',
        boolean: 0                              //boolean for disabled buutons
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
                text: inputValue,
                checked: false
            }, ...tasks],
            inputValue: ''
        })
    }
    // removing current task
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
                text: this.state.inputValue,
                checked: false
            }, ...this.state.tasks],
            inputValue: ''
        })
    }
    checkboxClick = (id) => {
        const { tasks, boolean } = this.state;
        tasks.forEach(element => {
            if (element._id === id) {
                element.checked = !element.checked;
                if (element.checked === true) {
                    this.setState({
                        boolean: boolean + 1
                    })
                } else {
                    this.setState({
                        boolean: boolean - 1
                    })
                }
            }
        })
        this.setState({
            inputValue: ''
        })
    }
    // removing some tasks
    removeTasks = () => {
        const removeTasks = this.state.tasks.filter(element => element.checked !== true);
        this.setState({
            tasks: removeTasks,
            boolean: 0
        })
    }
    render() {
        const tasks = this.state.tasks.map((element) => {
            return (
                <Col className='mt-3' key={element._id} xs={12} sm={12} md={6} lg={4} xl={4}>
                    <Task
                        element={element}
                        onRemoveTask={this.removeTask}
                        checkboxClick={this.checkboxClick}
                        disabled={!!this.state.boolean}
                    />
                </Col>
            )
        });
        return (
            <div >
                <Container>
                    <Row className={'p-3 d-flex justify-content-center'}>
                        <Col xs={12} sm={12} md={12} lg={10} xl={10}>
                            <InputGroup className='mb-3'>
                                <FormControl
                                    placeholder="Add a new task"
                                    aria-describedby="basic-addon2"
                                    disabled={this.state.boolean}
                                    value={this.state.inputValue}
                                    onChange={this.handleChange}
                                    onKeyDown={this.handleKeyDown}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-primary"
                                        onClick={this.handleClick}
                                        disabled={this.state.inputValue === ''}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        disabled={!this.state.boolean}
                                        onClick={this.removeTasks}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        {tasks}
                    </Row>
                </Container>
            </div >
        );
    };
}

export default ToDo;