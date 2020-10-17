/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable no-labels */
import React from 'react';

class Input extends React.Component {
    state = {
        value: '',
        input: ''
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
            input: event.target
        });
    }

    handleClick = () => {
        const value = this.state.value;
        this.props.setValue(value);
        this.setState({
            value: ''
        });
        this.state.value === ''
            ? null
            : this.state.input.focus();
    }

    render() {
        return (
            <div>
                <input
                    value={this.state.value}
                    type="text"
                    onChange={this.handleChange}
                />
                <button onClick={this.handleClick}> Change paragraph </button>
            </div>
        );
    };
}
export default Input; 