import React, { Component } from 'react';
import { Link } from "react-router-dom";

class NoProfile extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center">I noticed you don't have a profile setup</h1>
        <div className="row no-gutters">
          <Link className="btn btn-outline-primary btn-xl mx-auto" to="/create-profile" >Create One Now</Link>
        </div>        
      </div>
    )
  }
}


export default NoProfile