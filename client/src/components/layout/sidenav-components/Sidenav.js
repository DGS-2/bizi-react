import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import logo from "../../../assets/images/bizi_logo.svg";
import SidenavCalendar from "./calendar/SidenavCalendar";
import SidenavUsers from "./users/SidenavUsers";
import SidenavActions from "./actions/SidenavActions";
import SidenavPages from "./pages/SidenavPages";
import SidenavAdmin from "./admin/SidenavAdmin";

class Sidenav extends Component {
  render() {
    const { auth, profile } = this.props
    
    let priv
    if( profile.profile !== null ) priv = profile.profile.personalInfo.privilege.level

    let guestLinks = (
      <ul className="navbar-nav bg-dark sidebar sidebar-dark accordion" id="accordionSidebar">
          <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
            <div className="sidebar-brand-icon rotate-n-15">
              <img className="img-fluid" src={logo} alt="Bizi Logo" />
            </div>
            <div className="sidebar-brand-text mx-3">Bizi</div>
          </Link>
        </ul>
    )
    let authLinks = (
      <ul className="navbar-nav bg-dark sidebar sidebar-dark accordion" id="accordionSidebar">
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
          <div className="sidebar-brand-icon rotate-n-15">
            <img className="img-fluid" src={logo} alt="Bizi Logo" />
          </div>
          <div className="sidebar-brand-text mx-3">Bizi</div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span></Link>
        </li>
        { priv >= 9 ? <SidenavAdmin /> : null }
        <hr className="sidebar-divider d-none d-md-block" />
        <SidenavCalendar />
        <hr className="sidebar-divider d-none d-md-block" />
        <SidenavUsers />
        <hr className="sidebar-divider d-none d-md-block" />
        <SidenavActions />
        <hr className="sidebar-divider d-none d-md-block" />
        <div className="sidebar-heading text-light">
          Addons
        </div>
        <SidenavPages />
        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
      </ul>
    )

    return (
      <div>
        { auth.isAuthenticated ? authLinks : guestLinks }
      </div>
    )
  }
}

Sidenav.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})


export default connect(mapStateToProps)(Sidenav)