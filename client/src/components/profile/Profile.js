import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";
import Spinner from "../shared/spinner/Spinner";
import { Link } from "react-router-dom";

// Actions
import { getTragetProfile } from "../../actions/profileActions";

import ProfileSkills from "./sections/ProfileSkills";
import ProfileHeader from "./sections/ProfileHeader";
import ProfileAbout from "./sections/ProfileAbout";
import ProfileEducation from './sections/ProfileEducation';
import ProfileSettings from "./sections/ProfileSettings";

class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.getId()
    }

    this.getProfile = this.getProfile.bind(this)
    this.getId = this.getId.bind(this)
  }

  getId = () => {
    console.log(this.props)
    let id
    if( this.props.location.state ) {
      if(this.props.location.state.accountOwner) {
        id = this.props.auth.user.id
      } else {
        id = this.props.match.params.id
      }
    }
    else id = this.props.match.params.id

    return id
  }

  componentDidMount = () => {
    if(this.props.profile.targetProfile === null ){
      this.getProfile()            
    } else {
      window.location.reload()   
    }
  }

  getProfile = () => {
    this.props.getTragetProfile(this.state.id)
  }

  render() {
    const { profile } = this.props
    
    const { state } = this.props.location

    let content

    if(profile === null) {
      content = <Spinner />
    } else {
      if( profile.targetProfile !== null) {
        content = 
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
            <ProfileHeader profile={ profile.targetProfile } admin={ state? state.admin : null } accountOwner={ state? state.accountOwner : null  } />
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
                  <ProfileAbout profile={ profile.targetProfile } admin={ state? state.admin : null } accountOwner={ state? state.accountOwner : null  } />
                </div>
                <div className="tab-pane container" id="skills">
                  <ProfileSkills profile={ profile.targetProfile } admin={ state? state.admin : null } accountOwner={ state? state.accountOwner : null  } />
                </div>
                <div className="tab-pane container" id="education">
                  <ProfileEducation profile={ profile.targetProfile } admin={ state? state.admin : null } accountOwner={ state? state.accountOwner : null  } />
                </div>
                <div className="tab-pane container" id="settings">
                  <ProfileSettings profile={ profile.targetProfile } admin={ state? state.admin : null } accountOwner={ state? state.accountOwner : null  } />
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
  getTragetProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getTragetProfile })(withRouter(Profile));