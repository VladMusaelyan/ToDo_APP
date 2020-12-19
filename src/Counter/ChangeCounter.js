import React from 'react';
import { connect } from 'react-redux';
import './CounterStyles.module.css';

function Counter(props) {
    return (
        <>
            <button onClick={() => props.changeCount(1)}>+1</button>
            <button onClick={() => props.changeCount(5)}>+5</button>
            <button onClick={() => props.changeCount(10)}>+10</button>
            <button onClick={() => props.onReset()}>Reset</button>
        </>
    );
};

const mapDisputchTOProps = (dispatch) => {
    return {
        changeCount: (sum) => dispatch({ type: 'INCREMENT_COUNT', sum }),
        onReset: () => dispatch({ type: 'RESET_COUNT' })
    };
};

export default connect(null, mapDisputchTOProps)(Counter);