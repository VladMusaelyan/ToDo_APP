import React from 'react';
import styles from './TaskStyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Row, Col, Card } from 'react-bootstrap';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            element: this.props.element
        }
    }
    render() {
        const { element } = this.state
        return (
            <>
                <Card className={element.checked === true && 'border border-danger'}>
                    <Card.Body>
                        <Row>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                <Card.Title>
                                    {element.text.slice(0, 10) + '...'}
                                </Card.Title>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    onClick={() => this.props.checkboxClick(element._id)}
                                />
                            </Col>
                        </Row>
                        <Card.Text>
                            {element.text}
                        </Card.Text>
                        <div className='d-flex flex-row-reverse'>
                            <Button
                                variant="warning"
                                disabled={this.props.disabled}
                                className='ml-3'
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => this.props.onRemoveTask(element._id)}
                                disabled={this.props.disabled}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

export default Task;