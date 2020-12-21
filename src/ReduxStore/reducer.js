const defaultState = {
    tasks: []
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'GET_TASKS_SUCCESS':
            return {
                ...state,
                tasks: action.tasks
            }
        case 'ADD_TASK_SUCCESS':
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            }
        case 'REMOVE_TASK_SUCCESS': {
            const removeTask = state.tasks.filter(element => element._id !== action.id);
            return {
                ...state,
                tasks: removeTask
            }
        }
        case 'REMOVE_TASKS_SUCCESS': {
            let tasks = [];
            action.body.tasks.forEach((id) => {
                tasks = state.tasks.filter((task) => task._id !== id);
            });
            return {
                ...state,
                tasks: tasks
            }
        }
        case 'EDIT_TASK_SUCCESS': {
            const tasks = [...state.tasks];
            const findIndex = state.tasks.findIndex(task => task._id === action.editedTask._id);
            tasks[findIndex] = action.editedTask;
            return {
                ...state,
                tasks
            }
        }
        default:
            return state;
    }
};