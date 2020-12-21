import React from 'react';
import Task from '../../Task/Task';
import AddTask from '../../AddTask/AddTask';
import Confirm from '../../Confirm/Confirm';
import EditTask from '../../EditTask/EditTask';
import { Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../../assets/functions/Spinner';
import { connect } from 'react-redux';
import { getTasks, removeTask, removeTasks, editTask } from '../../../ReduxStore/actions';


class ToDo extends React.PureComponent {

    state = {
        selectedTasks: new Set(),
        showConfirm: false,
        editTask: null,
        addNewTask: false
    };

    componentDidMount() {
        this.props.getTasks();
    }

    // removing current task
    removeTask = (id) => {
        this.props.removeTask(id);
    };

    //removing some tasks
    removeTasks = () => {
        const body = {
            tasks: [...this.state.selectedTasks]
        };
        this.props.removeTasks(body);
        this.setState({
            selectedTasks: new Set(),
            showConfirm: false
        });
    };

    selectedTask = (id) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(id)) {
            selectedTasks.delete(id);
        }
        else {
            selectedTasks.add(id);
        }
        this.setState({
            selectedTasks
        });
    };

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

    toogleEdit = (task) => {
        this.setState({
            editTask: task
        });
    };

    saveTask = (editedTask) => {
        this.props.editTask(editedTask);
        this.setState({
            editTask: null
        });
    };

    toogleAddNewTask = () => {
        this.setState({
            addNewTask: !this.state.addNewTask
        });
    }

    render() {

        const { selectedTasks, showConfirm, editTask, addNewTask } = this.state;

        const task = this.props.tasks.map(element => {
            return (
                <Col className='mt-3' key={element._id} xs={12} sm={12} md={6} lg={4} xl={4}>
                    <Task
                        data={element}
                        onRemoveTask={this.removeTask}
                        selectedTask={this.selectedTask}
                        disabled={!!selectedTasks.size}
                        onEdit={this.toogleEdit}
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
                            onClick={this.toogleAddNewTask}
                            disabled={!!selectedTasks.size}
                            className='w-25'
                        >
                            Add
                            </Button>
                        {/* Button for removing selected tasks*/}
                        <Button
                            variant="outline-danger"
                            onClick={this.toggleConfirm}
                            disabled={!selectedTasks.size}
                            className='w-25'
                            title='Select some tasks'
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </InputGroup.Append>
                    <Row>
                        {!!this.props.tasks ? task : <Spinner />}
                    </Row>
                </Container>
                <Confirm
                    onSubmit={this.removeTasks}
                    onClose={this.toggleConfirm}
                    count={selectedTasks.size}
                    show={showConfirm}
                />
                {
                    !!editTask &&
                    <EditTask
                        data={editTask}
                        onSave={this.saveTask}
                        onClose={() => this.toogleEdit(null)}
                    />
                }
                {
                    addNewTask &&
                    <AddTask
                        onClose={this.toogleAddNewTask}
                        toggleAddTask={this.toogleAddNewTask}
                    />
                }
            </div>
        );
    };

}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

const mapDispatchToProps = {
    getTasks,
    removeTask,
    removeTasks,
    editTask
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
