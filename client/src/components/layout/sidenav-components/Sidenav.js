import React, { Component } from 'react'
import { Link } from "react-router-dom";

import logo from "../../../assets/images/bizi_logo.svg";

export default class Sidenav extends Component {
  render() {
    return (
      <div>
        <ul className="navbar-nav bg-dark sidebar sidebar-dark accordion" id="accordionSidebar">
          <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
            <div className="sidebar-brand-icon rotate-n-15">
              <img className="img-fluid" src={logo} />
            </div>
            <div className="sidebar-brand-text mx-3">Bizi</div>
          </Link>
          <hr className="sidebar-divider my-0" />
          <li className="nav-item active">
            <Link className="nav-link" to="/dashboard">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span></Link>
          </li>
          <hr className="sidebar-divider d-none d-md-block" />

          <div className="sidebar-heading">
            Addons
          </div>
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
                <h6 className="collapse-header">Other Pages:</h6>
                <Link className="collapse-item" to="/404">404 Page</Link>
                <Link className="collapse-item" to="/blank">Blank Page</Link>
              </div>
            </div>
          </li>
          
          <div className="text-center d-none d-md-inline">
            <button className="rounded-circle border-0" id="sidebarToggle"></button>
          </div>
        </ul>
      </div>
    )
  }
}


