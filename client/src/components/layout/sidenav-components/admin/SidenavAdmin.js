import React, { Component } from 'react'
import { Link } from "react-router-dom"

class SidenavAdmin extends Component {
  render() {
    const { priv, profile } = this.props
    let links

    if(priv.level === 3 || priv.level === 4) {
      // NCOIC & Section Chief Links
      links = <div>
            <Link to="/view-section" className="collapse-item">View Section</Link>
            <Link to={{pathname:"/move-personnel", state:{priv: priv}}} className="collapse-item">Move Personnel</Link>
        </div>
    } else if(priv.level === 6){
      // Flight Leadership
      links = <div>
        <Link to={{pathname: "/view-flight", state: {flight: profile.organization.flight}}} className="collapse-item">View Section</Link>
        <Link to={{pathname:"/move-personnel", state:{priv: priv}}} className="collapse-item">Move Personnel</Link>
        <Link to={{pathname: "/manage-flight", state: {flight: profile.organization.flight}}} className="collapse-item">Manage Flight</Link>
      </div>
    } else if( priv.level === 8 ) {
      // DO Staff
      links = <div>
        <Link to={{pathname:"/view-squadron-ops", state:{squadron: profile.organization.squadron}}}>View Squadron Ops</Link>
        <Link to={{pathname: "/admin-panel", state:{viewDepth: "squadron"}}} className="collapse-item">Edit/Update Users</Link>
      </div>
    } else if( priv.level === 9 ){
      // CSS
      links = <div>
        <Link to={{pathname: "/admin-panel", state:{viewDepth: "squadron"}}} className="collapse-item">Edit/Update Users</Link>
      </div>
    } else if( priv.title === "Developer" ) {
      // Developer Links
      links = <div>
        <Link to={{pathname: "/admin-panel", state:{viewDepth: "all"}}} className="collapse-item">Edit/Update Users</Link>
      </div>
    }

    return (
      <li className="nav-item">
          <Link to="/#" className="nav-link collapsed" data-toggle="collapse" data-target="#collapseAdmin" aria-expanded="true" aria-controls="collapseAdmin">
            <i className="fas fa-toolbox text-light"></i>
            <span>Admin</span>
          </Link>
          <div id="collapseAdmin" className="collapse" aria-labelledby="headingAdmin" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header text-dark">Actions:</h6>
              { links }
              { priv.isProgramManager ? <Link to={{pathname: "/manage-program", state:{program: priv.program}}}>Manage My Program</Link> : null }              
            </div>
          </div>
        </li>
    )
  }
}

export default SidenavAdmin