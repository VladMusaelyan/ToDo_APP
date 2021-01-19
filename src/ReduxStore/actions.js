import request from '../assets/functions/request';
import * as types from './types';

const URL = process.env.REACT_APP_API_URL;

function error(dispatch, message) {
    dispatch({ type: types.ERROR, error: message });
};

export function toggle(type) {
    return (dispatch) => dispatch({ type });
};

export function getTasks(arg, type) {
    let query = '';
    const searchText = type === 'search' ? arg : '';
    if (!!arg) query = '?';
    if (!!searchText) query += `search=${searchText}`
    if (type === 'sort') {
        if (!!arg.sort) query += `&&sort=${arg.sort}`;
        if (!!arg.status) query += `&&status=${arg.status}`;
        if (!!arg.date.value) query += `&&${arg.date.value}=${arg.date.selectedDate}`;
    };
    return (dispatch) => {
        dispatch({ type: types.LOADER, loader: true });
        request(`${URL}/task${query}`)
            .then(res => dispatch({
                type: types.GET_TASKS_SUCCESS,
                tasks: res
            }))
            .catch(err => error(dispatch, err));
        if (type === 'sort') {
            dispatch({ type: types.SORT_TASKS, sortType: arg });
        };
    };
};

export function getTask(id) {
    return (dispatch) => {
        dispatch({ type: types.LOADER, loader: true });
        request(`${URL}/task/${id}`)
            .then((res) => {
                dispatch({ type: types.GET_TASK_SUCCESS, task: res });
            })
            .catch((err) => error(dispatch, err));
    };
};

export function addTask(body) {
    return (dispatch) => {
        dispatch({ type: types.LOADER, loader: true });
        request(`${URL}/task`, 'POST', body)
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

export function removeTask(id, from = '', redirect) {
    return (dispatch) => {
        dispatch({ type: types.LOADER, loader: true });
        request(`${URL}/task/${id}`, 'DELETE')
            .then(() => {
                dispatch({
                    type: types.REMOVE_TASK_SUCCESS,
                    id
                });
                if (from === 'singleTask') redirect();
            })
            .catch(err => error(dispatch, err));
    };
};

export function removeTasks(body) {
    return (dispatch) => {
        dispatch({ type: types.LOADER, loader: true });
        request(`${URL}/task`, 'PATCH', body)
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
        request(`${URL}/task/${editedTask._id}`, 'PUT', editedTask)
            .then(() => dispatch({ type: types.SAVE_EDITED_TASK_SUCCESS, editedTask }))
            .catch(err => error(dispatch, err));
    };
};

export function changeStatus(task, from) {
    return (dispatch) => {
        dispatch({ type: types.LOADER, loader: true });
        request(`${URL}/task/${task._id}`, 'PUT', task)
            .then(() => dispatch({ type: types.CHANGE_STATUS, task, from }))
            .catch(err => error(dispatch, err));
    };
};

export function changeSelectedStatus(task, from) {
    return (dispatch) => {
        dispatch({ type: types.LOADER, loader: true });
        request(`${URL}/task/${task._id}`, 'PUT', task)
            .then(() => dispatch({ type: types.CHANGE_SELCTED_STATUS, task, from }))
            .catch(err => error(dispatch, err));
    };
};

export function contactSubmit(body) {
    return (dispatch) => {
        dispatch({ type: types.LOADER, loader: true });
        request(`${URL}/form`, 'POST', body)
            .then(res => dispatch({ type: types.CONTACT_MESSAGE }))
            .catch(err => error(dispatch, err))
    };
};