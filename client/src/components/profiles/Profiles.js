import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../shared/spinner/Spinner";

import { getProfiles } from "../../actions/profileActions";

import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      loading: false,
      profiles: []
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange = e => {
    this.setState({ [e.target.name] : e.target.value })
  }

  componentDidMount = () => {
    if(this.props.profile.profiles === null) this.props.getProfiles()
  }

  componentWillReceiveProps = props => {
    const { profile } = props
    this.setState({ profiles: profile.profiles, loading: profile.loading })
  }

  render() {
    const { profiles, loading } = this.state
    let profileItems;

    if(profiles === null || loading) {
      profileItems = <Spinner />
    } else {
      if(profiles.length > 0) {
        let biziUsers = profiles.filter(p => {
          if(this.state.input === '') return p
          else if(p.personalInfo.name.full.toLowerCase().includes(this.state.input.toLowerCase())) 
            return p.personalInfo.name.full.toLowerCase().includes(this.state.input.toLowerCase())    
        })
        profileItems = biziUsers.map(profile => <ProfileItem key={ profile._id } profile={ profile } />)
      } else {
        profileItems = <h4 className="text-center text-white">No Profiles Found...</h4>
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center text-white">Bizi User Profiles</h1>
              <p className="lead text-center text-white">Browse and connect with other Bizi members</p>
              <input type="text" className="form-control form-control-user" placeholder="Start Typing to Filter Users by Name..." name="input" onChange={this.onChange} value={this.state.input} /> <hr />
            </div>
            <div className="card-columns">
              { profileItems }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profiles.propTpyes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles)