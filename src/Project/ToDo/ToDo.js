/* eslint-disable react/style-prop-object */
/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
import React from 'react';
import Task from '../Task/Task';
import Input from '../Input/Input';
import Confirm from '../Confirm/Confirm';
import EditTask from '../EditTask/EditTask';
import { Row, Col, Container } from 'react-bootstrap';

class ToDo extends React.PureComponent {
    state = {
        tasks: [],
        inputValue: '',
        boolean: 0,                           //boolean for disabled buutons
        showConfirm: false,
        editTask: null,
        selectedTasks: new Set()
    }
    componentDidMount() {
        fetch('http://localhost:3001/task')
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw res.error;
                }
                this.setState({
                    tasks: res,
                    inputValue: ''
                });
            })
            .catch(err => console.log(err))
    }
    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }
    addTask = () => {
        fetch('http://localhost:3001/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.inputValue
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw res.error;
                }
                const { tasks } = this.state;
                this.setState({
                    tasks: [res, ...tasks],
                    inputValue: ''
                });
            })
            .catch(err => console.log(err))
    }
    handleKeyDown = (e) => {
        e.key === 'Enter' & this.state.inputValue !== '' && this.addTask();
    }
    // removing current task
    removeTask = (id) => {
        fetch(`http://localhost:3001/task/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
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

    }
    // removing some tasks
    removeTasks = () => {
        const body = {
            tasks: [...this.state.selectedTasks]
        };
        fetch('http://localhost:3001/task', {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw res.error;
                }
                const removeTasks = this.state.tasks.filter(element => !element.checked);
                this.setState({
                    tasks: removeTasks,
                    boolean: 0,
                    showConfirm: false
                });
            })
    }
    selectedTask = (id) => {
        const { tasks, boolean, selectedTasks } = this.state;
        tasks.forEach(element => {
            if (element._id === id) {
                element.checked = !element.checked;
                if (element.checked === true) {
                    this.setState({
                        boolean: boolean + 1,
                        selectedTasks: selectedTasks.add(id)
                    })
                } else {
                    if (selectedTasks.has(id)) {
                        this.setState({
                            boolean: boolean - 1,
                            selectedTask: selectedTasks.delete(id)
                        })
                    }
                }
            }
        });
    }
    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    }
    toogleEdit = (element) => {
        this.setState({
            editTask: element
        })
    }
    saveEdit = (editState) => {
        const tasks = [...this.state.tasks];
        const findIndex = tasks.findIndex(element => element._id === editState._id);
        tasks[findIndex] = editState;
        this.setState({
            tasks: tasks,
            editTask: null
        })
    }
    render() {
        const { tasks, inputValue, boolean, showConfirm, editTask } = this.state;
        const task = tasks.map((element) => {
            return (
                <Col className='mt-3' key={element._id} xs={12} sm={12} md={6} lg={4} xl={4}>
                    <Task
                        element={element}
                        onRemoveTask={this.removeTask}
                        toogleEdit={() => this.toogleEdit(element)}
                        selectedTask={this.selectedTask}
                        disabled={!!boolean}
                    />
                </Col>
            )
        });
        return (
            <div>
                <Container>
                    <Row className={'p-3 d-flex justify-content-center'}>
                        <Col xs={12} sm={12} md={12} lg={10} xl={10}>
                            <Input
                                boolean={boolean}
                                inputValue={inputValue}
                                handleChange={this.handleChange}
                                handleKeyDown={this.handleKeyDown}
                                addTask={this.addTask}
                                toggleConfirm={this.toggleConfirm}
                            />

                        </Col>
                    </Row>
                    <Row>
                        {task}
                    </Row>
                </Container>
                <Confirm
                    onSubmit={this.removeTasks}
                    onClose={this.toggleConfirm}
                    show={showConfirm}
                    count={boolean}
                />
                {!!editTask && <EditTask
                    data={editTask}
                    onSave={this.saveEdit}
                    onClose={() => this.toogleEdit(null)}
                />}
            </div >
        );
    };
}

export default ToDo;