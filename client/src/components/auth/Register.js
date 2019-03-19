import React, { Component } from 'react'
import { Link } from "react-router-dom"

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import TextFieldGroup from "../shared/TextFieldGroup"

class Register extends Component {
  constructor(){
    super()
    this.state = {
      name: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) this.setState({errors: nextProps.errors})
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: `${this.state.firstName} ${this.state.lastName}`,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    this.props.registerUser(newUser, this.props.history)
  }

  render() {
    const { errors } = this.state
    return (
      <div>
        <div className="card o-hidden border-0 shadow-lg my-5">
          <div className="card-body p-0">
            <div className="row">
              <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div className="col-lg-7">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                  </div>
                  <form className="user" noValidate onSubmit={this.onSubmit}>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <TextFieldGroup
                          name="firstName"
                          placeholder="First Name"
                          type="text"
                          value={this.state.firstName}
                          onChange={this.onChange}
                          errors={ errors.firstName }
                        ></TextFieldGroup>
                      </div>
                      <div className="col-sm-6">
                        <TextFieldGroup
                          name="lastName"
                          placeholder="Last Name"
                          type="text"
                          value={this.state.lastName}
                          onChange={this.onChange}
                          errors={ errors.lastName }
                        ></TextFieldGroup>
                      </div>
                    </div>
                    <div className="form-group">
                        <TextFieldGroup
                          name="email"
                          placeholder="Enter your email..."
                          type="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          errors={ errors.email }
                        ></TextFieldGroup>
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <TextFieldGroup
                            name="password"
                            placeholder="Provide a password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            errors={ errors.password }
                          ></TextFieldGroup>
                      </div>
                      <div className="col-sm-6">
                        <TextFieldGroup
                              name="password2"
                              placeholder="Confirm your password"
                              type="password"
                              value={this.state.password2}
                              onChange={this.onChange}
                              errors={ errors.password2 }
                            ></TextFieldGroup>
                      </div>
                    </div>
                    <button className="btn btn-primary btn-user btn-block">
                      Register Account
                    </button>
                    <hr />
                  </form>
                  <hr />
                  <div className="text-center">
                    <Link className="small" to="/forgotPassword">Forgot Password?</Link>
                  </div>
                  <div className="text-center">
                    <Link className="small" to="/login">Already have an account? Login!</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));