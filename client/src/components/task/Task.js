import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Spinner from "../shared/Spinner";
import TaskMessageReply from "./TaskMessageReply";
import { getTask } from "../../actions/taskActions";
import moment from "moment"

class Task extends Component {
  constructor(props) {
    super(props)

    this.mapIdToUser = this.mapIdToUser.bind(this)
    this.mapMessageThread = this.mapMessageThread.bind(this)
  }

  mapIdToUser = user => {
    let profiles = this.props.profile.profiles
    let from = profiles? profiles.filter(u => u.user._id === user)[0] : []
    let messageFrom = from.personalInfo ? `${from.personalInfo.rank.abreviated} ${from.personalInfo.name.full}` : ''
    return messageFrom
  }

  mapMessageThread = messages => {
    return messages.map(message => {
      return <li key={message._id} className={message.from === this.props.auth.user.id ? 'text-left' : 'text-right'}><strong>{ this.mapIdToUser(message.from) }</strong> <small className="text-muted">{ moment(message.time).format("DD MMMM YYYY, @ HH:mm") }</small>: {message.message}</li>
    })
  }

  componentDidMount = () => {
    this.props.getTask(this.props.match.params.id)
  }
  render() {
    const { task, profile, loading } = this.props
    let taskContent;

    if( task === null || loading || Object.keys(task).length === 0 ) {
      taskContent = <Spinner />
    } else {
      taskContent = (
        <div className="col-md-8 mx-auto p-3">  
          <h1 className="text-center mb-3">{ task.metaData.title }</h1><hr />
          <p>This task has been labeled <strong>{ task.creation.priority.level }</strong> by { this.mapIdToUser(task.creation.from.id)}</p>
          <p><strong>Description: </strong>{ task.metaData.description }</p>
          <p><strong>Created On: </strong>{  moment(task.creation.date).format('YYYY-MMM-DD') }</p>
          <p><strong>Due By: </strong>{  moment(task.creation.due).format('YYYY-MMM-DD') }</p>
          <hr />
          <h6 className="text-center">Message Thread:</h6>
          <ul className="list-unstyled">{this.mapMessageThread(task.messages)}</ul>
          <TaskMessageReply />
          <hr />
          <h6 className="text-center my-3">Actions:</h6>
          <Link to="/dashboard" className="btn btn-outline-primary btn-md">Back to Dashboard</Link>
        </div>
      )
    }

    
    return (
      <div className="container-fluid">
        { taskContent }
      </div>
    )
  }
}

Task.propTypes = {
  getTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  task: state.tasks.task,
  profile: state.profile
})

export default connect(mapStateToProps, { getTask })(Task)