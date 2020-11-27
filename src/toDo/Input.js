import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, InputGroup, FormControl, Col } from 'react-bootstrap';

class Input extends React.PureComponent {
    render() {
        console.log('Input')
        const { boolean, inputValue, handleChange, handleClick, handleKeyDown, removeTasks } = this.props;
        return (
            <>
                <Col xs={12} sm={12} md={12} lg={10} xl={10}>
                    <InputGroup className='mb-3'>
                        <FormControl
                            placeholder="Add a new task"
                            aria-describedby="basic-addon2"
                            disabled={boolean}
                            value={inputValue}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                        <InputGroup.Append>
                            <Button
                                variant="outline-primary"
                                onClick={handleClick}
                                disabled={inputValue === ''}
                            >
                                Add
                                    </Button>
                            <Button
                                variant="outline-danger"
                                disabled={!boolean}
                                onClick={removeTasks}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </>
        )
    }
}

export default Input;

