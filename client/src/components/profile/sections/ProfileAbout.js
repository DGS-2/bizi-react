import React, { Component } from 'react'
import PropTypes from "prop-types";

class ProfileAbout extends Component {
  render() {
    return (
      <div>
        <h1>Home -- Personal Info</h1>
      </div>
    )
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout