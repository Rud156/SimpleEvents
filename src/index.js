//@ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './components/Notification';

import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './utils/store';

import './assets/index.css';
import 'typeface-roboto';

import { actionAddUser, actionRemoveUser } from './actions/UserAction';

import PrivateRoute from './components/PrivateRoute';
import HomePage from './components/Home/HomePage';
import DashBoard from './components/Dashboard/Dashboard';

const userIsLoggedIn = () => {
    if (window.localStorage.getItem('user') != null) {
        var user = JSON.parse(window.localStorage.getItem('user'));
        store.dispatch(actionAddUser(user.userDetails, user.token));
        return true;
    } else {
        store.dispatch(actionRemoveUser());
        return false;
    }
};

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Notification />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => {
                            return userIsLoggedIn() ? (
                                <Redirect to="/dashboard" />
                            ) : (
                                <HomePage />
                            );
                        }}
                    />
                    <PrivateRoute path="/dashboard" component={DashBoard} />
                    <Route
                        render={() => {
                            return <Redirect to="/" />;
                        }}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
