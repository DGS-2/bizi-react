import React, { Component } from 'react'
import PropTypes from "prop-types";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props
    return (
      <div>
        <h1 className="text-white">{ profile.personalInfo.name.full }</h1><hr />
        <p className="text-white">{ profile.bio ? profile.bio : "Bio Needed" }</p>
      </div>
    )
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout