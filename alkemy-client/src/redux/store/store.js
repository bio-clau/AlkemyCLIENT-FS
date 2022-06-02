import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;