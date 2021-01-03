import React, { useState } from 'react';
import { Modal, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTasks } from '../../ReduxStore/actions';

function SortTasks(props) {

    const [sort, setSort] = useState(props.sortType[0]);

    const [filter, setFilter] = useState(props.sortType[1]);

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
                                                disabled={item.value !== sort && !!sort}
                                                checked={sort !== '' && item.value === sort}
                                                onChange={() => !!sort ? setSort('') : setSort(item.value)}
                                            />
                                            {item.label}
                                        </InputGroup.Prepend>
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
                                            key={index}>
                                            <InputGroup.Checkbox
                                                aria-label="Checkbox for following text input"
                                                disabled={!!filter && item.value !== filter ? true : false}
                                                checked={filter !== '' && item.value === filter}
                                                onChange={() => !!filter ? setFilter('') : setFilter(item.value)}
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
                        props.getTasks([sort, filter], 'sort');
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