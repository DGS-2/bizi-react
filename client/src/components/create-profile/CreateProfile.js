import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";

// Actions
import { createProfile } from "../../actions/profileActions"

// Components
import TextFieldGroup from "../shared/TextFieldGroup";
import SelectListGroup from "../shared/SelectListGroup";

// Constants
import * as wings from "./const/wings";
import * as groups from "./const/groups";
import * as squadrons from "./const/squadrons";
import * as ranks from "./const/ranks";

class CreateProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      firstName: '',
      lastName: '',
      wing: '',
      group:'',
      squadron: '',
      flight: '',
      team: '',
      office: '',
      rank: '',
      abreviated: '',
      email: '',
      phone: '',
      skills: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    
    console.log({ key: e.target.name, value: e.target.value })
    console.log(this.state)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      organization: {
        wing: this.state.wing,
        group: this.state.group,
        squadron: this.state.squadron,
        flight: this.state.flight
      },
      personalInfo: {
        name: {
          full: `${ this.state.firstName } ${ this.state.lastName }`,
          first: this.state.firstName,
          last: this.state.lastName
        },
        rank: {
          full: this.state.rank,
          abreviated: ranks.filter(rank => rank.label === this.state.rank)[0].value
        },
        privilege: {
          title: '',
          level: ''
        }
      },
      contactInfo: {
        email: {
          unclass: this.state.email
        },
        phone: {
          unclass: this.state.phone
        }
      },
      skills: this.state.skills
    };

    console.log(profileData)
    this.props.createProfile(profileData, this.props.history);
  } 
  
  render() {
    const { errors } = this.state.errors
    const { user } = this.props.auth
    const names = user.name.split(' ') || ''
    const rank = ranks
    const wing = wings
    const group = groups
    const squadron = squadrons

    return (
      <div className="card o-hidden border-0 shadow-lg my-5">
      <div className="card-body p-0">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
          <div className="col-lg-7">
            <div className="p-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">Create Your Profile!</h1>
              </div>
              <form className="user">
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <TextFieldGroup 
                      name="firstName"
                      placeholder="Enter your first name"
                      type="text"
                      value={ names[0] ? this.state.firstName = names[0] : this.state.firstName }
                      onChange={this.onChange}
                      errors={ errors }
                    />
                    <input type="hidden" name="name" value={ user ? this.state.name = user.name : '' } />
                  </div>
                  <div className="col-sm-6">
                    <TextFieldGroup 
                      name="lastName"
                      placeholder="Enter your last name"
                      type="text"
                      value={ names[1] ? this.state.lastName = names[1] : this.state.lastName }
                      onChange={ this.onChange }
                      errors={ errors }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <SelectListGroup 
                      placeholder="Select your rank"
                      name="rank"
                      value={ this.state.rank }
                      onChange={ this.onChange }
                      options={ rank }
                      errors={errors}
                      info="Provide your current rank for your profile"
                      
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextFieldGroup 
                      name="email"
                      placeholder="Enter your email address"
                      type="email"
                      value={ this.state.email }
                      onChange={ this.onChange }
                      errors={ errors }
                    />
                  </div>                  
                </div>
                <div className="form-group row">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <SelectListGroup 
                      placeholder="Please select the Wing you belong to"
                      name="wing"
                      value={ this.state.wing }
                      onChange={ this.onChange }
                      options={ wing }
                      errors={ errors }
                      info="Provide the Wing you belong to"
                    />                    
                  </div>
                  <div className="col-sm-6">
                    <SelectListGroup 
                      placeholder="Please select the Group you belong to"
                      name="group"
                      value={ this.state.group }
                      onChange={ this.onChange }
                      options={ group }
                      errors={ errors }
                      info="Provide the Group you belong to"
                    />
                  </div>
                  <div className="col-sm-6">
                    <SelectListGroup 
                      placeholder="Please select the Squadron you belong to"
                      name="squadron"
                      value={ this.state.squadron }
                      onChange={ this.onChange }
                      options={ squadron }
                      errors={ errors }
                      info="Provide the Squadron you belong to"
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextFieldGroup 
                      name="flight"
                      placeholder="Enter your office symbol"
                      type="text"
                      value={ this.state.flight }
                      onChange={ this.onChange }
                      errors={ errors }
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <button className="btn btn-primary btn-xl mx-auto" onClick={this.onSubmit}>Create Profile</button>
                </div>
              </form>
              <hr />
              
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));