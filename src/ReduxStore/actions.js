import request from '../assets/functions/request';

export function getTasks() {
    return (disputch) => {
        request('http://localhost:3001/task')
            .then(res => disputch({ type: 'GET_TASKS_SUCCESS', tasks: res }))
            .catch(err => console.log(err));
    };
};

export function addTask(body) {
    return (disputch) => {
        request('http://localhost:3001/task', 'POST', body)
            .then(res => disputch({ type: 'ADD_TASK_SUCCESS', task: res }))
            .catch(err => console.log(err));
    };
};

export function removeTask(id) {
    return (disputch) => {
        request(`http://localhost:3001/task/${id}`, 'DELETE')
            .then(() => disputch({ type: 'REMOVE_TASK_SUCCESS', id }))
            .catch(err => console.log(err));
    };
};

export function removeTasks(body) {
    return (disputch) => {
        request(`http://localhost:3001/task`, 'PATCH', body)
            .then(() => disputch({ type: 'REMOVE_TASKS_SUCCESS', body }))
            .catch(err => console.log(err));
    };
};

export function editTask(editedTask) {
    return (disputch) => {
        request(`http://localhost:3001/task/${editedTask._id}`, 'PUT', editedTask)
            .then(() => disputch({ type: 'EDIT_TASK_SUCCESS', editedTask }))
            .catch(err => console.log(err));
    };
};