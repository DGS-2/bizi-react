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
        <button className="btn btn-primary" onClick={this.toggleForm}>{ this.state.visible? 'Cancel' : 'Add New Task' }</button>
        <CreateTask 
          visible={this.state.visible}
        />
      </div>
    )
  }
}
