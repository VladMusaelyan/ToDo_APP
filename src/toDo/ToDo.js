/* eslint-disable react/style-prop-object */
/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
import React from 'react';
import Task from './Task';
import Input from './Input';
import IdGenerator from '../assets/IDGenerator';
import { Row, Col, Container } from 'react-bootstrap';

class ToDo extends React.PureComponent {
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
        e.key === 'Enter' & this.state.inputValue !== '' && this.handleClick()
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
        const { tasks, inputValue, boolean } = this.state;
        console.log('ToDo')
        const task = tasks.map((element) => {
            return (
                <Col className='mt-3' key={element._id} xs={12} sm={12} md={6} lg={4} xl={4}>
                    <Task
                        element={element}
                        onRemoveTask={this.removeTask}
                        checkboxClick={this.checkboxClick}
                        disabled={!!boolean}
                    />
                </Col>
            )
        });
        return (
            <div>
                <Container>
                    <Row className={'p-3 d-flex justify-content-center'}>
                        <Input
                            boolean={boolean}
                            inputValue={inputValue}
                            handleChange={this.handleChange}
                            handleKeyDown={this.handleKeyDown}
                            handleClick={this.handleClick}
                            removeTasks={this.removeTasks}
                        />
                    </Row>
                    <Row>
                        {task}
                    </Row>
                </Container>
            </div >
        );
    };
}

export default ToDo;