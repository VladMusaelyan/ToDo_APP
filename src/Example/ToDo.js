import React, { PureComponent } from 'react';
import Task from './Task';
import idGenerator from '../assets/IDGenerator';
import { Container, Row, Col, FormControl, InputGroup, Button } from 'react-bootstrap';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class ToDo extends PureComponent {
    state = {
        tasks: [],
        inputValue: '',
        selectedTasks: new Set()
    };

    handleInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addTask();
        }
    };

    addTask = () => {
        const { inputValue } = this.state;
        if (!inputValue) {
            return;
        }

        const newTask = {
            text: inputValue,
            _id: idGenerator()
        };

        const tasks = [newTask, ...this.state.tasks];
        this.setState({
            tasks: tasks,
            inputValue: ''
        });
    };

    removeTask = (taskId) => {
        const newTasks = this.state.tasks.filter(task => task._id !== taskId);
        this.setState({
            tasks: newTasks
        });
    };

    handleCheck = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId);
        }
        else {
            selectedTasks.add(taskId);
        }

        this.setState({
            selectedTasks
        });

    };

    removeSelected = () => {
        let tasks = [...this.state.tasks];

        this.state.selectedTasks.forEach((id) => {
            tasks = tasks.filter((task) => task._id !== id);
        });

        this.setState({
            tasks,
            selectedTasks: new Set()
        });
    };


    render() {
        console.log('Todo render');
        const { tasks, inputValue, selectedTasks } = this.state;
        const tasksArray = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Task
                        data={task}
                        onRemove={this.removeTask}
                        onCheck={this.handleCheck}
                        disabled={!!selectedTasks.size}
                    />
                </Col>
            )
        });


        return (
            <div className={styles.toDo}>
                <Container>
                    <Row className='justify-content-center'>
                        <Col sm={10} xs={12} md={8} lg={6}>
                            <InputGroup className={styles.input}>
                                <FormControl
                                    placeholder="Input new task"
                                    aria-label="Input new task"
                                    aria-describedby="basic-addon2"
                                    onChange={this.handleInputChange}
                                    onKeyDown={this.handleKeyDown}
                                    value={inputValue}
                                    disabled={!!selectedTasks.size}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-primary"
                                        onClick={this.addTask}
                                        disabled={!inputValue}
                                    >
                                        Add
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>

                    </Row>

                    <Row>
                        {tasksArray}
                    </Row>

                    <Row className='justify-content-center'>
                        <Col xs={4} >
                            <Button
                                variant="outline-danger"
                                onClick={this.removeSelected}
                                disabled={!selectedTasks.size}
                            >
                                Removing Task
                            </Button>
                        </Col>
                    </Row>
                </Container>

            </div>
        );
    };

}

export default ToDo;