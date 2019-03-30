import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile, getCurrentProfile, getProfiles } from './actions/profileActions';

import { Provider } from "react-redux";
import store from './store';

import PrivateRoute from "./components/shared/PrivateRoute";

import  Sidenav  from "./components/layout/sidenav-components/Sidenav";
import  Navbar  from "./components/layout/navbar-components/Navbar";
import  Register from "./components/auth/Register";
import  Login from "./components/auth/Login";

import CreateProfile from "./components/profile/CreateProfile";
import Profile from "./components/profile/Profile";
import Tasks from "./components/tasks/Tasks";
import Task from "./components/task/Task";
import Dashboard from './components/dashboard/Dashboard';
import Calendar from "./components/calendar/Calendar"

import "./App.scss";


// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getCurrentProfile());
  store.dispatch(getProfiles())
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App" id="wrapper">
            <Sidenav />
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <Navbar />                
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
                <Switch><Route exact path="/" component={ Dashboard }></Route></Switch>
                <Switch><PrivateRoute exact path="/dashboard" component={ Tasks } /></Switch>
                <Switch><PrivateRoute exact path="/calendar" component={ Calendar } /></Switch>
                <Switch><PrivateRoute exact path="/task/:id" component={ Task } /></Switch>
                <Switch><PrivateRoute exact path="/create-profile" component={ CreateProfile } /></Switch>
                <Switch><PrivateRoute exact path="/edit-profile" component={ Profile } /></Switch>              
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
