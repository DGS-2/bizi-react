import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from "./components/shared/private-route/PrivateRoute";

// Views
import Account from './views/Account';
import Dashboard from './views/Dashboard';
import Settings from './views/Settings';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import TaskList from './views/TaskList';
import UserList from './views/UserList';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/register" component={ SignUp } />
                    <Route exact path="/login" component={ SignIn } />
                    <PrivateRoute exact path="/dashboard" component={ Dashboard } /> 
                    <PrivateRoute exact path="/edit-profile" component={ Account } /> 
                    <PrivateRoute exact path="/all-users" component={UserList} />
                    <PrivateRoute exact path="/settings" component={Settings} />
                    <PrivateRoute exact path="/tasks" component={TaskList} />
                </Switch>
            </div>
        )
    }
}
