import React, { Component } from 'react'

import CreateTaskForm from "./CreateTaskForm"
import Tasks from "../tasks/Tasks"

export default class CreateTask extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  

  render() {
    const something = (<div className="p-5"><CreateTaskForm /></div>)
  
    const somethingElse = (<div className="p-5"><Tasks /></div>)
    return (
      <div>
        {this.props.visible? something : somethingElse}
      </div>
    )
  }
}
