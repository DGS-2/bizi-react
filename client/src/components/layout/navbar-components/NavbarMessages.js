import React, { Component } from 'react'
import { Link } from "react-router-dom";

class NavbarMessages extends Component {
  render() {
    return (
      <div>
        <Link className="nav-link dropdown-toggle" to="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fas fa-envelope fa-fw"></i>
          <span className="badge badge-danger badge-counter">7</span>
        </Link>
        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
          <h6 className="dropdown-header">Message Center</h6>
          
          
        </div>
      </div>
    )
  }
}


export default NavbarMessages;