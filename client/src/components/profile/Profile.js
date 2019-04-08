import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";
import Spinner from "../shared/spinner/Spinner";
import { Link } from "react-router-dom";
// Actions
import { getTragetProfile } from "../../actions/profileActions"

import ProfileSkills from "./sections/ProfileSkills";
import ProfileHeader from "./sections/ProfileHeader";
import ProfileAbout from "./sections/ProfileAbout";
import ProfileEducation from './sections/ProfileEducation';
import ProfileSettings from "./sections/ProfileSettings";

class Profile extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount = () => {
    if(this.props.profile.targetProfile === null ){
      this.getProfile(this.props.match.params.id)            
    } else {
      window.location.reload()   
    }
  }

  getProfile = id => {
    this.props.getTragetProfile(id)
  }

  render() {
    const { profile } = this.props
    
    let content

    if(profile === null) {
      content = <Spinner />
    } else {
      if( profile.targetProfile !== null) {
        content = 
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
            <ProfileHeader profile={ profile.targetProfile } admin={ this.props.location.state.admin } />
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
                  <ProfileAbout profile={ profile.targetProfile } admin={ this.props.location.state.admin } />
                </div>
                <div className="tab-pane container" id="skills">
                  <ProfileSkills />
                </div>
                <div className="tab-pane container" id="education">
                  <ProfileEducation profile={ profile.targetProfile } admin={ this.props.location.state.admin } />
                </div>
                <div className="tab-pane container" id="settings">
                  <ProfileSettings profile={ profile.targetProfile } admin={ this.props.location.state.admin } />
                </div>
              </div>
            </div>
          </div> 
        </div>          
      }
    }

    return (
      <div>
        { content }
      </div>
    )
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getTragetProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getTragetProfile })(withRouter(Profile));