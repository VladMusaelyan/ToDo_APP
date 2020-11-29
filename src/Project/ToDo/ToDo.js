/* eslint-disable react/style-prop-object */
/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
import React from 'react';
import Task from '../Task/Task';
import Input from '../Input/Input';
import Confirm from '../Confirm/Confirm';
import EditTask from '../EditTask/EditTask';
import IdGenerator from '../../assets/IDGenerator';
import { Row, Col, Container } from 'react-bootstrap';

class ToDo extends React.PureComponent {
    state = {
        tasks: [],
        inputValue: '',
        boolean: 0,                           //boolean for disabled buutons
        showConfirm: false,
        editTask: null
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
        });
    }
    handleKeyDown = (e) => {
        e.key === 'Enter' & this.state.inputValue !== '' && this.handleClick();
    }
    // removing current task
    removeTask = (id) => {
        const removeTask = this.state.tasks.filter(element => element._id !== id);
        this.setState({
            tasks: removeTask
        });
    }
    // removing some tasks
    removeTasks = () => {
        const removeTasks = this.state.tasks.filter(element => !element.checked);
        this.setState({
            tasks: removeTasks,
            boolean: 0,
            showConfirm: false
        });
    }
    selectedTask = (id) => {
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
                                handleClick={this.handleClick}
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
                    onSave={(editState) => this.saveEdit(editState)}
                    onClose={() => this.toogleEdit(null)}
                />}
            </div >
        );
    };
}

export default ToDo;