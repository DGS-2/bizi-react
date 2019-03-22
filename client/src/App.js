import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile, getCurrentProfile } from './actions/profileActions';

import { Provider } from "react-redux";
import store from './store';

import PrivateRoute from "./components/shared/PrivateRoute"

import  Sidenav  from "./components/layout/Sidenav";
import  Navbar  from "./components/layout/Navbar";
import  Landing from "./components/layout/Landing";
import  Register from "./components/auth/Register";
import  Login from "./components/auth/Login";

import CreateProfile from "./components/create-profile/CreateProfile"

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(getCurrentProfile());
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
                <Route exact path="/" component={ Landing } />
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
                <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
