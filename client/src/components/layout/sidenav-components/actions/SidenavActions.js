import React, { Component } from 'react'
import { Link } from "react-router-dom"

class SidenavActions extends Component {
  render() {
    return (
      <li className="nav-item">
          <Link to="/#" className="nav-link collapsed" data-toggle="collapse" data-target="#collapseActions" aria-expanded="true" aria-controls="collapseActions">
            <i className="fas fa-infinity text-light"></i>
            <span>Actions</span>
          </Link>
          <div id="collapseActions" className="collapse" aria-labelledby="headingActions" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Find Users:</h6>
              <Link className="collapse-item" to="/teams">View My Teams</Link>
              <Link className="collapse-item" to="/create-team">Create New Team</Link>
            </div>
          </div>
        </li>
    )
  }
}

export default SidenavActions