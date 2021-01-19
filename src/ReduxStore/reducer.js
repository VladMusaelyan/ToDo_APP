import * as types from './types';

const defaultState = {
    tasks: [],
    selectedTasks: [],
    errorMessage: null,
    successMessage: null,
    loader: false,
    addTaskSuccess: false,
    showConfirm: false,
    editedTask: null,
    singleTask: null,
    editTaskFrom: null,
    sortType: {
        sort: '',
        filter: '',
        date: {
            value: '',
            selectedate: null
        }
    },
    contactMessage: ''
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {

        case types.ERROR:
            return {
                ...state,
                errorMessage: action.error,
                loader: false
            };

        case types.LOADER:
            return {
                ...state,
                loader: action.loader,
                errorMessage: null,
                successMessage: null,
                contactMessage: '',
                addTaskSuccess: false,
                showConfirm: false,
                editedTask: null,
                singleTask: null
            };

        case types.TOGGLE_ADD_TASK:
            return {
                ...state,
                addTaskSuccess: !state.addTaskSuccess
            };

        case types.TOGGLE_CONFIRM:
            return {
                ...state,
                showConfirm: !state.showConfirm
            };

        case types.TOGGLE_EDIT_TASK:
            return {
                ...state,
                editedTask: null
            };

        case types.GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.tasks,
                loader: false
            };

        case types.GET_TASK_SUCCESS:
            return {
                ...state,
                singleTask: action.task,
                loader: false
            };

        case types.ADD_TASK_SUCCESS:
            return {
                ...state,
                tasks: [...state.tasks, action.task],
                successMessage: action.successMessage,
                loader: false,
                addTaskSuccess: false
            };

        case types.SELECTED_TASK: {
            const selectedTasks = new Set(state.selectedTasks);
            if (selectedTasks.has(action.taskId)) {
                selectedTasks.delete(action.taskId);
            }
            else {
                selectedTasks.add(action.taskId);
            };
            return {
                ...state,
                selectedTasks: [...selectedTasks]
            };
        }

        case types.REMOVE_TASK_SUCCESS: {
            const removeTask = state.tasks.filter(element => element._id !== action.id);
            return {
                ...state,
                tasks: removeTask,
                loader: false,
                successMessage: 'Task removed!'
            };
        }

        case types.REMOVE_TASKS_SUCCESS: {
            let tasks = [...state.tasks];
            action.body.tasks.forEach((id) => {
                tasks = tasks.filter((task) => task._id !== id);
            });
            return {
                ...state,
                tasks: tasks,
                showConfirm: false,
                loader: false,
                selectedTasks: [],
                successMessage: 'Tasks removed!'
            };
        }

        case types.SAVE_EDITED_TASK_SUCCESS: {
            if (state.editTaskFrom === 'singleTask') {
                return {
                    ...state,
                    singleTask: action.editedTask,
                    editedTask: null,
                    successMessage: 'Task changed!',
                    loader: false
                };
            }
            else {
                const tasks = [...state.tasks];
                const findIndex = state.tasks.findIndex(task => task._id === action.editedTask._id);
                tasks[findIndex] = action.editedTask;
                return {
                    ...state,
                    tasks,
                    editedTask: null,
                    successMessage: 'Task changed!',
                    loader: false
                };
            };
        }

        case types.EDIT_TASK:
            return {
                ...state,
                editedTask: action.task,
                successMessage: null,
                editTaskFrom: action.from
            };

        case types.CHANGE_STATUS: {
            let message = '';
            if (action.task.status === 'active') {
                message = 'Your task active!';
            } else {
                message = 'Your task has been done!';
            }
            if (action.from === 'singleTask') {
                return {
                    ...state,
                    singleTask: action.task,
                    successMessage: message,
                    loader: false
                };
            }
            else {
                const tasks = [...state.tasks];
                const findIndex = state.tasks.findIndex(task => task._id === action.task._id);
                tasks[findIndex] = action.task;
                return {
                    ...state,
                    tasks,
                    successMessage: message,
                    loader: false
                };
            };
        }

        case types.SORT_TASKS:
            return {
                ...state,
                sortType: action.sortType
            }

        case types.CHANGE_SELCTED_STATUS:
            if (action.from === 'singleTask') {
                return {
                    ...state,
                    singleTask: action.task,
                    loader: false
                };
            }
            else {
                const tasks = [...state.tasks];
                const findIndex = state.tasks.findIndex(task => task._id === action.task._id);
                tasks[findIndex] = action.task;
                return {
                    ...state,
                    tasks,
                    loader: false
                };
            };

        case types.CONTACT_MESSAGE:
            return {
                ...state,
                contactMessage: 'Thank You for contact us, we\'ll reply you as soon as possible',
                loader: false
            };

        default:
            return state;
    }
};