import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import  Sidenav  from "./components/layout/Sidenav";
import  Navbar  from "./components/layout/Navbar";
import  Landing from "./components/layout/Landing";
import  Register from "./components/layout/auth/Register";
import  Login from "./components/layout/auth/Login";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" id="wrapper">
          <Sidenav />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar />
              <Route exact path="/" component={ Landing } />
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
