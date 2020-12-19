import { createStore } from 'redux';

const defaultState = {
    count: 0
};

function counterReduser(state = defaultState, action) {

    switch (action.type) {
        case 'INCREMENT_COUNT':
            return { count: state.count + action.sum }
        case 'RESET_COUNT':
            return { count: 0 }
        default:
            return state
    };
};

export const store = createStore(counterReduser);