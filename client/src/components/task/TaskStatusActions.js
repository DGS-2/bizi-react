import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";
import {changeStatus} from "../../actions/taskActions"


class TaskStatusActions extends Component {
  constructor(props){
    super(props)
    this.state = {
      date: Date.now(),
      verified: false,
      reason: '',
      accepted: false,
      completed: false,
      read: true,
      disputed: false,
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.markCompleted = this.markCompleted.bind(this)
    this.setDispute = this.setDispute.bind(this)
    this.override = this.override.bind(this)
    this.closeOut = this.closeOut.bind(this)
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  markCompleted = () => {
    this.setState({
      completed: true
    })
  }

  setDispute = e => {
    this.setState({
      disputed: true,
      reason: e.target.value
    })
  }

  override = e => {
    this.setState({
      disputed: false,
      reason: ''
    })
  }

  closeOut = e => {
    this.setState({
      verified: true
    })
  }

  onSubmit = e => {
    e.preventDefault()
    let taskId = this.props.task._id
    let statusUpdate = {
      status: {
        completed: this.state.completed,
        disputed: this.state.disputed,
        read: this.state.read
      },
      completed: {
        date: this.state.date,
        verified: this.state.verified
      },
      disputed: {
        reason: this.state.reason,
        accepted: this.state.accepted
      }
    }
    
    this.props.changeStatus(taskId, statusUpdate)
  }

  render() {
    let { user, task } = this.props
    const override = (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <select name="override" className="form-control" onChange={this.override}>
            <option value="">Override Dispute?</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="form-group"><button className="btn btn-outline-dark btn-xl">Override</button></div>
      </form>      
    )

    const verifyComplete = (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <select name="verify" className="form-control" onChange={this.closeOut}>
            <option value="">Verify Complete?</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="form-group"><button className="btn btn-outline-primary btn-xl">Verify!</button></div>
      </form>
    )

    return (
      <div className="row no-gutters">        
          <div className="col-6 pr-2">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
              { task.status.disputed ? null : (<button className="btn btn-outline-success btn-xl mx-auto" onClick={this.markCompleted}>Mark Completed</button>) }
              </div>              
            </form>
            {task.creation.from.id === user.id ? verifyComplete : null}
          </div>    
          <div className="col-6 pl-2">
            <form onSubmit={this.onSubmit}> 
              <div className="form-group">
                <label htmlFor="dispute">Dispute Task</label>
                <select name="reason" id="dispute" className="form-control" onChange={this.setDispute}>
                  <option value="">* Select a reason</option>
                  <option value="Similar Task Assigned">Similar Task Assigned</option>
                  <option value="I No Longer Have Permissions For This Task">I No Longer Have Permissions For This Task</option>
                  <option value="Previously Completed">Previously Completed</option>
                </select>
              </div>
              { this.state.disputed ? (<button className="btn btn-outline-danger btn-xl mx-auto">Save</button>) : null }             
            </form>
              {task.creation.from.id === user.id ? override : null}
          </div>        
      </div>
    )
  }
}

TaskStatusActions.propTypes = {
  task: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user,
  task: state.tasks.task
})

export default connect( mapStateToProps, { changeStatus } )( TaskStatusActions )