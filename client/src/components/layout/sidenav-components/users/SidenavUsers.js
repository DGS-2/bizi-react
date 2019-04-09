import React, { Component } from 'react'
import { Link } from "react-router-dom"

class SidenavUsers extends Component {
  render() {
    return (
      <li className="nav-item">
        <Link to="/#" className="nav-link collapsed" data-toggle="collapse" data-target="#collapseUsers" aria-expanded="true" aria-controls="collapseUsers">
          <i className="fas fa-search text-light"></i>
          <span>Bizi Users</span>
        </Link>
        <div id="collapseUsers" className="collapse" aria-labelledby="headingUsers" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Find Users:</h6>
            <Link className="collapse-item" to="/skills">By Skills</Link>
            <Link className="collapse-item" to="/all-users">By Search</Link>
          </div>
        </div>
      </li>
    )
  }
}

export default SidenavUsers