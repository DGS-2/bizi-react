import React, { Component } from 'react'
import PropTypes from "prop-types";

class ProfileSettings extends Component {
  constructor(props){
    super(props)
    this.state = {
      privilege: ''
    }
  }
  render() {
    console.log(this.props)
    return (
      <div>
        TODO: Add Profile Settings
      </div>
    )
  }
}

ProfileSettings.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileSettings