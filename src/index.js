import React from 'react';
import ReactDOM from 'react-dom';
import App from './Container/App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import thunk, {Provider} from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';

/* import

const rootReducer = combineReducers({
	dscrItm: descriptionReducer,
	modal: modalReducer
})
const store = createStore();
 */
ReactDOM.render(
	<BrowserRouter><App/></BrowserRouter>, document.getElementById('root')
);
registerServiceWorker();
