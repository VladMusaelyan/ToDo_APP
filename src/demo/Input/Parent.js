import React from 'react';
import Input from './Input';
import Paragraph from './Paragraph'

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.value
        }
    }

    getValue = (value) => {
        this.setState({
            text: value
        })
    }
    render() {
        return (
            <div>
                <Input
                    setValue={this.getValue}
                />
                <Paragraph
                    text={this.state.text}
                />
            </div>
        );
    };
}
export default Parent;