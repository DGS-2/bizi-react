import React, { Component } from 'react'
import { Link } from "react-router-dom"

class SidenavPages extends Component {
  render() {
    return (
      <li className="nav-item">
          <Link className="nav-link collapsed" to="/#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
            <i className="fas fa-fw fa-folder"></i>
            <span>Pages</span>
          </Link>
          <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Login Screens:</h6>
              <Link className="collapse-item" to="/login">Login</Link>
              <Link className="collapse-item" to="/register">Register</Link>
              <Link className="collapse-item" to="/forgot-password">Forgot Password</Link>
              <div className="collapse-divider"></div>
            </div>
          </div>
        </li>
    )
  }
}

export default SidenavPages