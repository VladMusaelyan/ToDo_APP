import React from 'react';
import Task from '../../Task/Task';
import AddTask from '../../AddTask/AddTask';
import Confirm from '../../Confirm/Confirm';
import EditTask from '../../EditTask/EditTask';
import { Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../../assets/functions/Spinner';

class ToDo extends React.PureComponent {
    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false,
        editTask: null,
        addNewTask: false
    };
    componentDidMount() {
        fetch("http://localhost:3001/task", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then(res => {
                if (res.error) {
                    throw res.error;
                }
                this.setState({
                    tasks: res
                });
            })
            .catch((err) => console.log(err));
    }
    addTask = (data) => {
        fetch("http://localhost:3001/task", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(res => {
                if (res.error) {
                    throw res.error;
                }
                const tasks = [...this.state.tasks];
                this.setState({
                    tasks: [res, ...tasks],
                    addNewTask: false
                });

            })
            .catch((err) => console.log(err));

    };
    // removing current tas
    removeTask = (id) => {
        fetch(`http://localhost:3001/task/${id}`, {
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
                const removeTask = this.state.tasks.filter(element => element._id !== id);
                this.setState({
                    tasks: removeTask
                });

            })
            .catch(err => console.log(err))
    };
    //removing some tasks
    removeTasks = () => {
        const body = {
            tasks: [...this.state.selectedTasks]
        };
        fetch(`http://localhost:3001/task`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then(res => {
                if (res.error) {
                    throw res.error;
                }
                let tasks = [...this.state.tasks];
                this.state.selectedTasks.forEach((id) => {
                    tasks = tasks.filter((task) => task._id !== id);
                });
                this.setState({
                    tasks,
                    selectedTasks: new Set(),
                    showConfirm: false
                });
            })
            .catch((err) => console.log(err));
    };
    selectedTask = (id) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(id)) {
            selectedTasks.delete(id);
        }
        else {
            selectedTasks.add(id);
        }
        this.setState({
            selectedTasks
        });
    };
    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    }
    toogleEdit = (task) => {
        this.setState({
            editTask: task
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
                const tasks = [...this.state.tasks];
                const findIndex = tasks.findIndex((task) => task._id === editedTask._id);
                tasks[findIndex] = res;
                this.setState({
                    tasks: tasks,
                    editTask: null
                });
            })
            .catch((err) => console.log(err));

    };
    toogleAddNewTask = () => {
        this.setState({
            addNewTask: !this.state.addNewTask
        });
    }
    render() {
        const { tasks, selectedTasks, showConfirm, editTask, addNewTask } = this.state;
        const task = tasks.map(element => {
            return (
                <Col className='mt-3' key={element._id} xs={12} sm={12} md={6} lg={4} xl={4}>
                    <Task
                        data={element}
                        onRemoveTask={this.removeTask}
                        selectedTask={this.selectedTask}
                        disabled={!!selectedTasks.size}
                        onEdit={this.toogleEdit}
                    />
                </Col>
            )
        });
        return (
            <div>
                <Container>
                    <InputGroup.Append className='d-flex justify-content-center pt-3'>
                        {/* Button for adding tasks */}
                        <Button
                            variant="outline-primary"
                            onClick={this.toogleAddNewTask}
                            disabled={!!selectedTasks.size}
                            className='w-25'
                        >
                            Add
                            </Button>
                        {/* Button for removing selected tasks*/}
                        <Button
                            variant="outline-danger"
                            onClick={this.toggleConfirm}
                            disabled={!selectedTasks.size}
                            className='w-25'
                            title='Select some tasks'
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </InputGroup.Append>
                    <Row>
                        {!!tasks ? task : <Spinner />}
                    </Row>
                </Container>
                <Confirm
                    onSubmit={this.removeTasks}
                    onClose={this.toggleConfirm}
                    count={selectedTasks.size}
                    show={showConfirm}
                />
                {
                    !!editTask &&
                    <EditTask
                        data={editTask}
                        onSave={this.saveTask}
                        onClose={() => this.toogleEdit(null)}
                    />
                }
                {
                    addNewTask &&
                    <AddTask
                        onAdd={this.addTask}
                        onClose={this.toogleAddNewTask}
                    />
                }
            </div>
        );
    };

}

export default ToDo;
