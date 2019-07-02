import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from "./components/shared/private-route/PrivateRoute";

// Views
import Account from './views/Account/Account';
import DashboardView from './views/Dashboard/DashboardView';
import Settings from './views/Settings/Settings';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';
import TaskList from './views/TaskList/TaskList';
import TaskItem from './views/TaskItem/TaskItem';
import UserList from './views/UserList/UserList';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/sign-up" component={ SignUp } />
                    <Route exact path="/login" component={ SignIn } />
                    <PrivateRoute exact path="/dashboard" component={ DashboardView } /> 
                    <PrivateRoute exact path="/edit-profile" component={ Account } /> 
                    <PrivateRoute exact path="/all-users" component={UserList} />
                    <PrivateRoute exact path="/settings" component={Settings} />
                    <PrivateRoute exact path="/tasks" component={TaskList} />
                    <PrivateRoute exact path="/task/:id" component={TaskItem} />
                </Switch> 
            </div>
        )
    }
}
