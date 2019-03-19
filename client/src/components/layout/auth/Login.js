import React, { Component } from 'react'
import { Link } from "react-router-dom"

class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = e => {
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    console.log(user)
  }

  render() {
    const { errors } = this.state
    return (
      <div>
        <div className="row justify-content-center">

          <div className="col-xl-10 col-lg-12 col-md-9">

            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form className="user" onSubmit={ this.onSubmit }>
                        <div className="form-group">
                          <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." name="email" value={this.state.email} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                          <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                          <div className="custom-control custom-checkbox small">
                            <input type="checkbox" className="custom-control-input" id="customCheck" />
                            <label className="custom-control-label" forhtml="customCheck">Remember Me</label>
                          </div>
                        </div>
                        <button className="btn btn-primary btn-user btn-block">
                          Login
                        </button>
                        <hr />
                      </form>
                      <hr />
                      <div className="text-center">
                        <Link className="small" to="/forgotPassword">Forgot Password?</Link>
                      </div>
                      <div className="text-center">
                        <Link className="small" to="/register">Create an Account!</Link>
                      </div>
                    </div>
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


export default Login