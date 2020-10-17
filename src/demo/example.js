/* eslint-disable no-unused-expressions */
import React from 'react';


class Example extends React.Component {
    state = {
        value: ''
    };

    input = (event) => {
        this.setState({
            value: event.target.value
        });
    }

    render() {
        return (
            <div>
                <input type="text"
                    onChange={this.input}
                />
                <p>{this.state.value}</p>


            </div>
        );
    };
};
export default Example;


