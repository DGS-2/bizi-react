import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";

// Actions
import { getCurrentProfile } from "../../actions/profileActions"

import AddSkill from "./actions/AddSkill"


class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      firstName: '',
      lastName: '',
      rank: ''
    }
  }
  render() {
    const { profile } = this.props.profile
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
          <div className="text-center">
              <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar img-circle" alt="Dummy User Icon" /><br />
              <h6 className="text-dark">{profile ? profile.personalInfo.name.full : '' }</h6>
          </div>
          <ul className="list-group">
            <li className='list-group-item text-right'>Item</li>
            <li className='list-group-item text-right'>Item</li>
            <li className='list-group-item text-right'>Item</li>
          </ul>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#skills">Skills</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#education">Education</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#settings">Settings</a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane container active" id="home">
              Home -- Personal Info
            </div>
            <div className="tab-pane container" id="skills">
              <AddSkill />
            </div>
            <div className="tab-pane container" id="education">
              Education
            </div>
            <div className="tab-pane container" id="settings">
              Settings
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { getCurrentProfile })(withRouter(Profile));