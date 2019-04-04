import React, { Component } from 'react';
import { Link } from "react-router-dom";

class NoProfile extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center text-white">Your Profile Hasn't Loaded</h1>
        <h3 className="text-center text-white">If you have created a profile, please wait. Otherwise, click the link below.</h3>
        <div className="row no-gutters">
          <Link className="btn btn-outline-light btn-xl mx-auto" to="/create-profile" >Create One Now</Link>
        </div>        
      </div>
    )
  }
}


export default NoProfile