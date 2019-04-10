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
    const { auth, profile } = this.props;
  
    let name , profileLink
    if( profile.profile === null || Object.keys(profile.profile).length === 0 ) {
      name = (
        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
          { auth.user.name } &nbsp;
          <i className="fas fa-exclamation-circle text-danger"></i>
        </span>
      )
      profileLink = (
        <Link className="dropdown-item" to='/create-profile'>
          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          Create Profile
        </Link>
      )
    } else if( profile.profile.personalInfo  ) {
      name = (
        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
         { `${profile.profile.personalInfo.rank.abreviated} ${profile.profile.personalInfo.name.full}` }
        </span>        
      )
      profileLink = (
        <Link className="dropdown-item" to={{ pathname: '/edit-profile', state: { admin: true, accountOwner: true }}} >
          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          Profile
        </Link>
      )
    }


    return (
      <div>
          <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           { name }
          </Link>
          <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            { profileLink }
            {/* <Link className="dropdown-item" to="#">
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
              Settings
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
              Activity Log
            </Link> */}
            <div className="dropdown-divider"></div>
            <Link className="dropdown-item" to="#" data-toggle="modal" data-target="#logoutModal" onClick={this.onLogoutClick.bind(this)}>
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </Link>
          </div>
        </div>
    )
  }
}

UserActions.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  UserActions
);