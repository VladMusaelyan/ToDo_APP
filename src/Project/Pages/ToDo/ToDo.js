import React, { memo, useEffect, useState } from 'react';
import Task from '../../Task/Task';
import AddTask from '../../AddTask/AddTask';
import Confirm from '../../Confirm/Confirm';
import { Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../../assets/functions/Spinner';
import { connect } from 'react-redux';
import { getTasks, removeTask, editTask, toggle } from '../../../ReduxStore/actions';
import { TOGGLE_CONFIRM, TOGGLE_ADD_TASK } from '../../../ReduxStore/types';
import SortTasks from '../../SortTasks/SortTasks';


function ToDo(props) {

    const [sortModal, setSortModal] = useState(false);

    useEffect(() => {
        props.getTasks(props.searchText, 'search');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.searchText]);

    const task = props.tasks.map(element => {
        return (
            <Col className='mt-3' key={element._id} xs={12} sm={12} md={6} lg={4} xl={4}>
                <Task
                    data={element}
                />
            </Col>
        );
    });

    return (
        <div>
            <Container>
                <InputGroup.Append className='d-flex justify-content-center pt-3'>
                    {/* Button for adding tasks */}
                    <Button
                        variant="outline-primary"
                        onClick={() => props.toggle(TOGGLE_ADD_TASK)}
                        disabled={!!props.selectedTasks.length}
                        className='w-25'
                    >
                        Add
                            </Button>
                    {/* Button for removing selected tasks*/}
                    <Button
                        variant="outline-danger"
                        onClick={() => props.toggle(TOGGLE_CONFIRM)}
                        disabled={!props.selectedTasks.length}
                        className='w-25'
                        title='Select some tasks'
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button
                        variant="outline-info"
                        onClick={() => setSortModal(!sortModal)}
                    >
                        Sort
                    </Button>
                </InputGroup.Append>
                <Row>
                    {!!props.tasks ? task : <Spinner />}
                </Row>
            </Container>

            <Confirm />

            {
                props.addTaskSuccess &&
                <AddTask />
            }
            {
                sortModal && <SortTasks onClose={setSortModal} />
            }
        </div >
    );
};

const mapStateToProps = (state) => {
    const { tasks, addTaskSuccess, selectedTasks, searchText } = state;
    return {
        tasks,
        addTaskSuccess,
        selectedTasks,
        searchText
    };
};

const mapDispatchToProps = {
    getTasks,
    removeTask,
    editTask,
    toggle
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(ToDo));
