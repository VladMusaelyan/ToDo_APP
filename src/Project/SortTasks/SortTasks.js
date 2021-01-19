import React, { useState } from 'react';
import { Modal, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTasks } from '../../ReduxStore/actions';
import DatePicker from "react-datepicker";

function SortTasks(props) {

    const [sort, setSort] = useState(props.sortType.sort);

    const [status, setStatus] = useState(props.sortType.status);

    const [date, setDate] = useState(props.sortType.date);

    const statusOptions = [
        {
            label: 'Active',
            value: 'active'
        },
        {
            label: 'Done',
            value: 'done'
        }
    ];

    const sortOptions = [
        {
            label: 'A-Z',
            value: 'a-z'
        },
        {
            label: 'Z-A',
            value: 'z-a'
        },
        {
            label: 'Creation date oldest',
            value: 'creation_date_oldest'
        },
        {
            label: 'Creation date newest',
            value: 'creation_date_newest'
        },
        {
            label: 'Completion date oldest',
            value: 'completion_date_oldest'
        },
        {
            label: 'Completion date newest',
            value: 'completion_date_newest'
        }
    ];

    const dateOptions = [
        {
            label: 'Create later than',
            value: 'create_lte'
        },
        {
            label: 'Crate earlier than',
            value: 'create_gte'
        },
        {
            label: 'Complete later than',
            value: 'complete_lte'
        },
        {
            label: 'Complete earlier than',
            value: 'complete_gte'
        },
    ];

    return (
        <>
            <Modal size='lg' show={true} onHide={() => props.onClose(false)}>
                <Modal.Header>Sort/Filter</Modal.Header>
                <Modal.Body>
                    <Row className='d-flex justify-content-center'>
                        <Col>
                            <h4>Sort</h4>
                            {
                                sortOptions.map((item, index) => {
                                    return (
                                        <InputGroup.Prepend
                                            className='mt-2'
                                            key={index}>
                                            <InputGroup.Checkbox
                                                aria-label="Checkbox for following text input"
                                                checked={sort !== '' && item.value === sort}
                                                onChange={() => setSort(item.value)}
                                            />
                                            {item.label}
                                        </InputGroup.Prepend>
                                    );
                                })
                            }
                        </Col>
                        <Col>
                            <h4>Filter</h4>
                            {
                                dateOptions.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <span className='d-block'>{item.label}</span>
                                            <DatePicker
                                                selected={item.value === date.value && date.selectedDate}
                                                onChange={date => setDate({
                                                    value: item.value,
                                                    selectedDate: date
                                                })}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </Col>
                        <Col>
                            <h4>Status</h4>
                            {
                                statusOptions.map((item, index) => {
                                    return (
                                        <InputGroup.Prepend
                                            className='mt-2'
                                            key={index}>
                                            <InputGroup.Checkbox
                                                aria-label="Checkbox for following text input"
                                                checked={status !== '' && item.value === status}
                                                onChange={() => setStatus(item.value)}
                                            />
                                            {item.label}
                                        </InputGroup.Prepend>
                                    );
                                })
                            }
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        props.getTasks({ sort, status, date, }, 'sort');
                        props.onClose(false);
                    }}>
                        Save
              </Button>
                    <Button variant="secondary" onClick={() => props.onClose(false)}>
                        Close
              </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        sortType: state.sortType
    };
};

const mapDispatchToProps = {
    getTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(SortTasks);