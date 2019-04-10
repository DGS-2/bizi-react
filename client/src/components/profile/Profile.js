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
      id: '',
      targetProfile: null
    }

    this.getProfile = this.getProfile.bind(this)
  }

  componentDidMount = () => {
    this.getProfile()
  }

  componentDidUpdate = (props, state) => {
    const { id } = state
    const { targetProfile } = props.profile
    const { location, auth, match } = props

    let target
    if( location.state ) {
      if( location.state.accountOwner ) target = auth.user.id
      else target = match.params.id 
    } else {
      target = match.params.id
    }
    
    if( id === '' ) this.setState({ id: target })
    else if( id !== target ) this.setState({ id: target })
    

    if( targetProfile !== null ) { 
      if( state.targetProfile === null ) this.setState({ targetProfile: targetProfile })
      else if( state.targetProfile !== null ){
        if( targetProfile._id !== state.targetProfile._id ) this.setState({ targetProfile: targetProfile })
      }
    }
    
  }

  getProfile = () => {
    const { location, match } = this.props
    let id
    if( this.state.id === '' ) id = location.state.auth ? location.state.auth.user.id : match.params.id
    else if ( this.state.id !== '') id = this.state.id
    
    this.props.getTragetProfile( id )
  }

  render() {
    const { targetProfile } = this.state
    
    const { state } = this.props.location

    let content

    if( targetProfile === null ) {
      content = <Spinner />
    } else {
      if( targetProfile !== null ) {
        content = 
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <ProfileHeader profile={ targetProfile } admin={ state? state.admin : null } accountOwner={ state? state.accountOwner : null  } />
            </div>          
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
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
                  <ProfileAbout profile={ targetProfile } admin={ state? state.admin : null } accountOwner={ state? state.accountOwner : null  } />
                </div>
                <div className="tab-pane container" id="skills">
                  <ProfileSkills profile={ targetProfile } admin={ state? state.admin : null } accountOwner={ state? state.accountOwner : null  } />
                </div>
                <div className="tab-pane container" id="education">
                  <ProfileEducation profile={ targetProfile } admin={ state? state.admin : null } accountOwner={ state? state.accountOwner : null  } />
                </div>
                <div className="tab-pane container" id="settings">
                  <ProfileSettings profile={ targetProfile } admin={ state? state.admin : null } accountOwner={ state? state.accountOwner : null  } />
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