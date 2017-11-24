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
import GalleryManager from './admin/gallery-manager/gallery-manager';
import ShowPage from './shows-list/show-page';
import HomePage from './home/home';
import GalleryListContainer from './gallery/gallery-list-container';

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise, logger)));

const visitorRouter = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={HomePage}/>
            <Route path='/shows' component={App}/>
            <Route path='/shows/:id' component={ShowPage}/>
            <Route path='/login' component={AdminLogin}/>
            <Route path='/gallery' component={GalleryListContainer}/>
        </Router>
    </Provider>
);

const adminRouter = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/admin' component={AdminHome}/>
        </Router>
    </Provider>
)
let router = location.pathname === '/admin' ? adminRouter : visitorRouter;


ReactDOM.render(
    router,
    document.querySelector('main')
);

// let router = location.pathname === '/welcome' ? notLoggedInRouter : loggedInRouter;
