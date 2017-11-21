import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './app/app';
import { Provider } from 'react-redux';
import reducer from './reducers/reducers'
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import AdminLogin from './admin/login';
import AdminHome from './admin/home';
import ShowEditor from './admin/show-editor';


export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise, logger)));

const visitorRouter = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}/>
            <Route path='/login' component={AdminLogin}/>
        </Router>
    </Provider>
);

const adminRouter = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/admin' component={AdminHome}>
                <IndexRoute component={ShowEditor}/>
            </Route>
        </Router>
    </Provider>
)
let router = location.pathname === '/admin' ? adminRouter : visitorRouter;


ReactDOM.render(
    router,
    document.querySelector('main')
);

// let router = location.pathname === '/welcome' ? notLoggedInRouter : loggedInRouter;
