import request from '../assets/functions/request';
import * as types from './types';

function error(dispatch, message) {
    dispatch({ type: types.ERROR, error: message });
};

export function toggle(type) {
    return (dispatch) => dispatch({ type });
};

export function getTasks() {
    return (dispatch) => {
        dispatch({ type: types.LOADER, loader: true });
        request('http://localhost:3001/task')
            .then(res => dispatch({
                type: types.GET_TASKS_SUCCESS,
                tasks: res
            }))
            .catch(err => error(dispatch, err));
    };
};

export function getTask(id) {
    return (dispatch) => {
        dispatch({ type: types.LOADER, loader: true });
        request(`http://localhost:3001/task/${id}`)
            .then((res) => {
                dispatch({ type: types.GET_TASK_SUCCESS, task: res });
            })
            .catch((err) => error(dispatch, err));
    };
};

export function addTask(body) {
    return (dispatch) => {
        dispatch({ type: types.LOADER, loader: true });
        request('http://localhost:3001/task', 'POST', body)
            .then(res => dispatch({
                type: types.ADD_TASK_SUCCESS,
                task: res,
                successMessage: 'Task added!'
            }))
            .catch(err => error(dispatch, err));
    };
};

export function selectedTask(id) {
    return (dispatch) => {
        dispatch({ type: types.SELECTED_TASK, taskId: id });
    };
};

export function removeTask(id) {
    return (dispatch) => {
        dispatch({ type: types.LOADER, loader: true });
        request(`http://localhost:3001/task/${id}`, 'DELETE')
            .then(() => dispatch({
                type: types.REMOVE_TASK_SUCCESS,
                id
            }))
            .catch(err => error(dispatch, err));
    };
};

export function removeTasks(body) {
    return (dispatch) => {
        dispatch({ type: types.LOADER, loader: true });
        request(`http://localhost:3001/task`, 'PATCH', body)
            .then((res) => dispatch({
                type: types.REMOVE_TASKS_SUCCESS,
                body
            }))
            .catch(err => error(dispatch, err));
    };
};

export function editTask(editedTask, from) {
    return (dispatch) => {
        dispatch({ type: types.EDIT_TASK, task: editedTask, from });
    };
};

export function saveEditedTask(editedTask) {
    return (dispatch) => {
        dispatch({ type: types.LOADER, loader: true });
        request(`http://localhost:3001/task/${editedTask._id}`, 'PUT', editedTask)
            .then(() => dispatch({ type: types.SAVE_EDITED_TASK_SUCCESS, editedTask }))
            .catch(err => error(dispatch, err));
    };
};

export function searchTask(title) {
    return (dispatch) => {
        if (!!title) {
            dispatch({ type: types.SEARCH_TASK, title });
        }
        else {
            dispatch({ type: types.LOADER, loader: true });
            request('http://localhost:3001/task')
                .then(res => dispatch({
                    type: types.GET_TASKS_SUCCESS,
                    tasks: res,
                    loader: false
                }))
                .catch(err => error(dispatch, err));
        };
    };
};