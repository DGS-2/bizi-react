import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props
    return (
      <div className="card bg-dark text-white">
        <div className="card-header bg-dark">{profile.personalInfo.rank.abreviated} { profile.personalInfo.name.full }</div>
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <p> { profile.organization.wing } </p>
              <p> { profile.organization.group }, { profile.organization.squadron } </p>
              <p> Organization: {profile.organization.flight} </p>
              <p><strong>Contact: </strong>{ profile.contactInfo.email.unclass }</p>
            </div>
          </div>
        </div>
        <div className="card-footer bg-dark">
          <div className="row">
            <Link className="btn btn-outline-light mx-auto" to={`/profile/${profile.user._id}`}>View Profile</Link>
          </div>
        </div>
      </div>
    )
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem