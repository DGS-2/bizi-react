import React, { Component } from 'react'
import { Link } from "react-router-dom"

class SidenavAdmin extends Component {
  render() {
    return (
      <li className="nav-item">      
        <Link to="/admin-panel" className="nav-link"><i className="fas fa-toolbox text-light"></i><span>Admin Panel</span></Link>
      </li>
    )
  }
}

export default SidenavAdmin