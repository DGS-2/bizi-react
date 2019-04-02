import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props
    return (
      <div className="card col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 bg-dark text-white">
        <div className="card-header bg-dark">{profile.personalInfo.rank.abreviated} { profile.personalInfo.name.full }</div>
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <p> { profile.organization.wing } </p>
              <p> { profile.organization.group }, { profile.organization.squadron } </p>
              <p> {profile.organization.flight} </p>
              <p><strong>Contact: </strong>{ profile.contactInfo.email.unclass }</p>
            </div>
            <div className="col-12">
              <h4 className="text-center">Skill Set</h4><hr />
              <ul className="list-unstyled">
                { profile.skills.slice(0, 4).map(item => {
                  return <li className="list-item" key={item._id}><i className="fas fa-check pr-2 text-success" />{ item.name }</li>
                }) }
              </ul>
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