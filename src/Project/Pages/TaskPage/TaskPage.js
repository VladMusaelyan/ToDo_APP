import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { editTask, removeTask, getTask } from '../../../ReduxStore/actions';
import Task from '../../Task/Task';

function TaskPage(props) {

    useEffect(() => {
        props.getTask(props.match.params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { data } = props;
    return (
        <Container>
            {
                props.data ? <Task data={data} /> : null
            }
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        data: state.singleTask
    };
};

const mapDispatchToProps = {
    editTask,
    removeTask,
    getTask
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);