import React, { Component } from 'react'
import { Link } from "react-router-dom"

class Register extends Component {
  constructor(){
    super()
    this.state = {
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

    console.log(newUser)
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
                        <input 
                          type="text" 
                          className="form-control form-control-user" 
                          id="exampleFirstName" 
                          placeholder="First Name" 
                          name="firstName"
                          value={ this.state.firstName } 
                          onChange={this.onChange}  
                        />
                      </div>
                      <div className="col-sm-6">
                        <input type="text" className="form-control form-control-user" id="exampleLastName" placeholder="Last Name" name="lastName" value={this.state.lastName} onChange={this.onChange}   />
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange}   />
                    </div>
                    <div className="form-group row">
                      <div className="col-sm-6 mb-3 mb-sm-0">
                        <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                      </div>
                      <div className="col-sm-6">
                        <input type="password" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password" name="password2" value={this.state.password2} onChange={this.onChange} />
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


export default Register