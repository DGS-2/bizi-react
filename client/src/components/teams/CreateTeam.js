import React, { Component } from 'react';
import TeamForm from "./TeamForm";


class CreateTeam extends Component {
  render() {
    return (
      <div className="container">
        <div className="col-8 mx-auto">
          <TeamForm />
        </div>
      </div>
    )
  }
}


export default CreateTeam