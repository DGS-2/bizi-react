import React, { Component } from 'react'
import PropTypes from "prop-types";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props
    return (
      <div>
        <div className="text-center">
              <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar img-circle" alt="Dummy User Icon" /><br />
              <h6 className="text-dark">{ profile.personalInfo.name.full }</h6>
          </div>
          <ul className="list-group">
            <li className='list-group-item text-left'>Location</li>
            <li className='list-group-item text-left'>Duty Position</li>
            <li className='list-group-item text-left'>Contact Info</li>
          </ul>
      </div>

      
    )
  }
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileHeader;