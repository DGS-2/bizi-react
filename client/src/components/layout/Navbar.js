import React, { Component } from 'react'

import NavbarSearch from "./navbar-components/NavbarSearch";
import DropdownSearch from "./navbar-components/DropdownSearch";
import NavbarAlerts from "./navbar-components/NavbarAlerts"
import NavbarMessages from "./navbar-components/NavbarMessages";
import UserActions from "./navbar-components/UserActions";


class Navbar extends Component {
  render() {
    return (
      <div>
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
      </div>
    )
  }
}

export default Navbar;