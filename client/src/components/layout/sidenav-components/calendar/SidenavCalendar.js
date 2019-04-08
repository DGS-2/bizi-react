import React, { Component } from 'react'
import { Link } from "react-router-dom";

class SidenavCalendar extends Component {
  render() {
    return (
      <li className="nav-item active">
        <Link className="nav-link" to="/calendar">
          <i className="fas fa-fw fa-calendar-alt"></i>
          <span>My Calendar</span></Link>
      </li>
    )
  }
}

export default SidenavCalendar