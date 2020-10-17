/* eslint-disable react/style-prop-object */
/* eslint-disable no-unused-expressions */
/* eslint-disable eqeqeq */
import React from 'react';
import { Task } from './Task';
import checkImage from './../assets/check.png';

class ToDo extends React.Component {
    state = {
        tasks: [],
        input: '',
        inputValue: '',
    }
    handleChange = (event) => {
        this.setState({
            input: event.target,
            inputValue: event.target.value
        });
    }
    handleClick = () => {
        this.state.inputValue == '' ? null : this.setState({
            tasks: this.state.tasks.concat(this.state.inputValue),
            inputValue: ''
        })
        this.state.input.focus()

    }
    render() {
        const styles = {
            textAlign: 'start',
            listStyleImage: `url(${checkImage})`
        };
        const tasks = this.state.tasks.map((element, index) => {
            return (
                <li key={index} style={styles}> { element}</li >
            )
        });
        return (
            <div >
                <input
                    value={this.state.inputValue}
                    type="text"
                    onChange={this.handleChange}
                />
                <button onClick={this.handleClick}>Add</button>
                <Task text={tasks} />
            </div >
        );
    };
}

export default ToDo;