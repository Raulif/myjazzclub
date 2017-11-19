import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './app/app';
import { Provider } from 'react-redux';
import reducer from './reducers/reducers'
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'



export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise, logger)));

const router = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}/>
        </Router>
    </Provider>
);


ReactDOM.render(
    router,
    document.querySelector('main')
);

// <Route path="admin" component={Admin}/>
// let router = location.pathname === '/welcome' ? notLoggedInRouter : loggedInRouter;
