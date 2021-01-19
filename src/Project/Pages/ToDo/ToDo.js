import React, { memo, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { getTasks, removeTask, editTask, toggle } from "../../../ReduxStore/actions";
import { TOGGLE_CONFIRM, TOGGLE_ADD_TASK } from "../../../ReduxStore/types";
import { Container, Row, Col, Button, InputGroup, Form, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import Switch from 'react-switch';
import Spinner from "../../../assets/functions/Spinner";
import SortTasks from "../../SortTasks/SortTasks";
import Task from "../../Task/Task";
import AddTask from "../../AddTask/AddTask";
import Confirm from "../../Confirm/Confirm";

function ToDo(props) {

  let tasks = [...props.tasks];

  const searchInputRef = useRef(null);

  const [sortModal, setSortModal] = useState(false);

  const [selected, setSelcted] = useState(false);

  if (selected) tasks = tasks.filter(item => item.selected === 'true');

  useEffect(() => {
    props.getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      props.getTasks(searchInputRef.current.value, 'search');
      searchInputRef.current.value = '';
    };
  };

  const task = tasks.map((element) => {
    return (
      <Col
        className="mt-3"
        key={element._id}
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={4}
      >
        <Task data={element} />
      </Col>
    );
  });

  return (
    <div>
      <Container>
        <InputGroup.Append className="d-flex justify-content-center pt-3">
          {/* Button for adding tasks */}
          <Button
            variant="outline-primary"
            onClick={() => props.toggle(TOGGLE_ADD_TASK)}
            disabled={!!props.selectedTasks.length}
            className="w-25"
          >
            Add
          </Button>
          {/* Button for removing selected tasks*/}
          <Button
            variant="outline-danger"
            onClick={() => props.toggle(TOGGLE_CONFIRM)}
            disabled={!props.selectedTasks.length}
            className="w-25"
            title="Select some tasks"
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button
            variant="outline-info"
            onClick={() => setSortModal(!sortModal)}
          >
            Sort
          </Button>

          <Form inline className='ml-auto'>
            <FormControl
              type="text"
              placeholder='Search...'
              className="mr-sm-2 rounded-pill text-end"
              ref={searchInputRef}
              onKeyPress={handleKeyPress}
            />
          </Form>
        </InputGroup.Append>
        <div className='float-right mt-2'>
          <Switch
            onChange={() => setSelcted(!selected)}
            checked={selected}
            checkedIcon={<FontAwesomeIcon icon={faStar} style={{ color: '#FFC107', margin: '5px' }} />}
            uncheckedIcon={<FontAwesomeIcon icon={faStar} style={{ color: 'black', margin: '5px' }} />}
            onColor='#888'
          />
        </div>
        <Row>{!!props.tasks ? task : <Spinner />}</Row>
      </Container>

      <Confirm />

      {props.addTaskSuccess && <AddTask />}
      {sortModal && <SortTasks onClose={setSortModal} />}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { tasks, addTaskSuccess, selectedTasks } = state;
  return {
    tasks,
    addTaskSuccess,
    selectedTasks
  };
};

const mapDispatchToProps = {
  getTasks,
  removeTask,
  editTask,
  toggle
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(ToDo));