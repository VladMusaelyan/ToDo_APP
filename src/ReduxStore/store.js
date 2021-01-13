import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const middleWare = applyMiddleware(thunk);

const composeProperty = [middleWare];

if (process.env.NODE_ENV === "development") {
    composeProperty.push(
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
};

const store = createStore(reducer, compose(...composeProperty));

export default store;