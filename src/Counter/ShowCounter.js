import React from 'react';
import { connect } from 'react-redux';
import './CounterStyles.module.css';

function ShowCounter(props) {
    return (
        <div className='m-5'>{props.count}</div>
    );
};

const mapToProps = (state) => {
    return {
        count: state.count
    };
};

export default connect(mapToProps, null)(ShowCounter);