import React, { Component } from 'react'

import CreateTask from "../create-task/CreateTask"


export default class Dashboard extends Component {
  state = {
    visible: false
  }

  toggleForm = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    return (
      <div className="container">
        <h1>Dashboard</h1>
      </div>
    )
  }
}
