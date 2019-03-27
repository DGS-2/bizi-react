import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { clearCurrentProfile } from '../../../actions/profileActions';

import NavbarSearch from "./NavbarSearch"
import DropdownSearch from "./DropdownSearch"
import NavbarAlerts from "./NavbarAlerts"
import NavbarMessages from "./NavbarMessages"
import UserActions from "./UserActions"

class Navbar extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    const authNav = (
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
          <i className="fa fa-bars"></i>
        </button>
        <NavbarSearch />
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow d-sm-none">
            <DropdownSearch />
          </li>
          <li className="nav-item dropdown no-arrow mx-1">
            <NavbarAlerts />
          </li>
          <li className="nav-item dropdown no-arrow mx-1">
           <NavbarMessages />
          </li>
          <div className="topbar-divider d-none d-sm-block"></div>          
          <li className="nav-item dropdown no-arrow">
            <UserActions />
          </li>
        </ul>
      </nav>
    )

    const guestNav = (
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"> </nav>
    )

    return (
      <div>{isAuthenticated ? authNav : guestNav}</div>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);