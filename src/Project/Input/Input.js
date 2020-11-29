import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Input extends React.PureComponent {
    render() {
        const { boolean, inputValue, handleChange, handleClick, handleKeyDown, toggleConfirm } = this.props;
        return (
            <>
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
                            onClick={toggleConfirm}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </>
        )
    }
}

export default Input;

Input.propTypes = {
    boolean: PropTypes.number.isRequired,
    inputValue: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    toggleConfirm: PropTypes.func.isRequired
}

