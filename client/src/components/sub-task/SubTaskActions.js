import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { changeStatus } from "../../actions/taskActions"

class SubTaskActions extends Component {
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
        <div className="form-group">
          <div className="row no-gutters">
            <button className="btn btn-outline-dark btn-xl mx-auto">Override</button>
          </div>
        </div>
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
        <div className="form-group">
          <div className="row no-gutters">
            <button className="btn btn-outline-primary btn-xl mx-auto">Verify!</button>
          </div>
        </div>
      </form>
    )

    return (
      <div className="row no-gutters">        
          <div className="col-6 pr-2">
            {task.creation.from.id === user.id ? verifyComplete : null}
          </div>    
          <div className="col-6 pl-2">
              {task.creation.from.id === user.id ? override : null}
          </div>        
      </div>
    )
  }
}

SubTaskActions.propTypes = {
  task: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user,
  task: state.tasks.task
})

export default connect( mapStateToProps, { changeStatus } )( SubTaskActions )