import React from 'react';
import styles from './About.module.css';
import { Accordion, Card } from 'react-bootstrap';

export default function About() {

    const specialTitle = 'How to use app';

    const info = [
        {
            title: 'Welcome!',
            content: `Hi, welcome to our ToDo tasks web app, we are glad to have you here․ We hope you'll use our application
            and it'll help you to make your routine easier. You can find everything about our app on this page, and if you have 
            any questions, contact us from the "Contact" page.`
        },
        {
            title: 'App history information',
            content: `The app was created by VM in 2020 (November)-2021 (January) during the react.js cours. It is designed to
            create tasks for ourselves. React.js and redux technologies were used to create the app. If you find some bugs while using
            the app, please contact us and we will fix them as soon as possible.`
        },
        {
            title: 'Task card structure',
            content: `At the top of the map is the title. If it's too long, it'll be displayed partially. Next to the title, the first
            checkbox is for selecting the type of tasks to be deleted, and the second, star-like checkbox is for selecting special tasks
            (if the star is yellow, then the task is selected as special, otherwise not). Information about the task is in the body of the
            card. It includes a task description, status (active or completed), date and date of creation. At the bottom of the card there
            are three buttons for editing (yellow), deleting (red) and changing the status (green or blue) of the task. If you click on it, 
            will open new page, with all information of task.`
        },
        {
            title: specialTitle,
            content: [
                {
                    title: 'How to add a new task',
                    content: `On the home page appears a blue button "Add", click on it, and a modal window will open, here you must
                    enter the title (mandatory) of the task, description and mark the date. Then if you want to create a new task, click 
                    "Add" (it will show a message in the lower left corner of the screen. if the message color is green, the operation was
                    completed successfully, otherwise there are some problems and the operation was failed), otherwise click "Cancel".\n
                    Please note. if you did not mark the task header, the modal window will not close and your new task will not be created, you will
                    not be able to select a date later than the current one.`
                },
                {
                    title: 'How to edit a task',
                    content: `There are buttons at the bottom of the card, the yellow button is to update the task. Click this button and
                    a modal window will open with the title, description and date fields. The fields are already filled in. Enter your 
                    updates and save them using the "Save".`
                },
                {
                    title: 'How to delete a task',
                    content: `At the bottom of the task card, next to the edit button, there is a red button - "delete". If you click it, 
                    your task will be deleted irretrievably.`
                },
                {
                    title: 'How to delete multiple tasks at once',
                    content: `At the top of the Home page, next to the Add button, there is a red button that is disabled. If you want to
                     delete some tasks together, select those tasks and then click the "trash" button and your selected tasks will be
                    deleted irretrievably.`
                },
                {
                    title: 'How to change status of task',
                    content: `There is a status button next to the delete button. If it is blue, the task is still active,
                    if it is yellow, the task is already completed.`
                },
                {
                    title: 'Sorting and filtering tasks',
                    content: `On the home page next to the buttons "Add" and "Trash" appears the button "Sort", you click on it, and a
                    modal window opens. Here you can choose to sort by "a-z" (in alphabetical order), "z-a" (in reverse alphabetical order),
                    date the oldest was created, date the newest was created, date the oldest was completed or by date the newest was completed
                    and filters by date (by creation or execution) or by status. Select what you want and save them using "Save". `
                }
            ]
        }
    ];

    return (
        <Accordion
            defaultActiveKey='0'
            className={styles.container}
        >
            {
                info.map((item, index) => {
                    return (
                        <Card
                            key={index}
                            className={styles.cardX}
                        >
                            <Accordion.Toggle
                                as={Card.Header}
                                eventKey={index.toString()}
                                className={styles.title}
                            >
                                {item.title.toUpperCase()}
                            </Accordion.Toggle>
                            <Accordion.Collapse
                                eventKey={index.toString()}
                                className={styles.content}
                            >
                                <Card.Body>
                                    {
                                        item.title === specialTitle ?
                                            <Accordion>
                                                {
                                                    item.content.map((item, index) => {
                                                        return (
                                                            <Card
                                                                key={index}
                                                                className={styles.cardY}
                                                            >
                                                                <Accordion.Toggle
                                                                    as={Card.Header}
                                                                    eventKey={index.toString()}
                                                                    style={{ backgroundColor: 'rgb(219 243 250)', cursor: 'pointer' }}
                                                                >
                                                                    {item.title.toUpperCase()}
                                                                </Accordion.Toggle>
                                                                <Accordion.Collapse
                                                                    eventKey={index.toString()}
                                                                >
                                                                    <Card.Body>{item.content}</Card.Body>
                                                                </Accordion.Collapse>
                                                            </Card>
                                                        );
                                                    })
                                                } </Accordion> :
                                            item.content
                                    }
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    );
                })
            }
        </Accordion>
    );
};