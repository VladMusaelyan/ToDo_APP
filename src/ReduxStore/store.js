import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const middleWare = applyMiddleware(thunk, logger);

const store = createStore(reducer, middleWare);

export default store;