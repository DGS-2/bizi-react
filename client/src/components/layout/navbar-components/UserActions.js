import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions/authActions';
import { clearCurrentProfile } from '../../../actions/profileActions';
import { Link } from "react-router-dom";

class UserActions extends Component {
  onLogoutClick = e => {
    e.preventDefault()
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    
    const alert = (
      <span className="badge badge-danger badge-counter"><i className="fas fa-exclamation-circle"></i></span>
    )
    return (
      <div>
        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="mr-2 d-none d-lg-inline text-gray-600 small">
            { profile ? `${profile.personalInfo.rank.abreviated} ${profile.personalInfo.name.full}` : user.name }
          &nbsp; <i className="fas fa-user"></i>{ profile ? '' : alert }</span>
        </a>
        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
          <Link className="dropdown-item" to={ profile ? '/edit-profile' : '/create-profile' }>
            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
            { profile ? 'Profile' : 'Create Profile' }
          </Link>
          <a className="dropdown-item" href="#">
            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
            Settings
          </a>
          <a className="dropdown-item" href="#">
            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
            Activity Log
          </a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="" data-toggle="modal" data-target="#logoutModal" onClick={this.onLogoutClick.bind(this)}>
            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </a>
        </div>
      </div>
    )
  }
}

UserActions.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  UserActions
);