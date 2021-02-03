import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/containers/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './app/reducers/reducers';
import thunk from 'redux-thunk';
import {unsplash} from './app/unsplash';

let authorized;
const token = localStorage.getItem(`token`)
token ? authorized = true : authorized = false
unsplash.auth.setBearerToken(token)

const initialState = {
    photoMap: [],
    counter: 0,
    errMessage: null,
    pageY: 0,
    authorized: authorized,
    fromUrl: ``,
};
const store = createStore(reducers, initialState, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById(`root`)
);
