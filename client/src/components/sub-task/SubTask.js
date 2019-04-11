import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Spinner from "../shared/spinner/Spinner";
import TaskMessageReply from "../task/reply/TaskMessageReply";
import SubTaskActions from "./SubTaskActions";
import TaskSubTasking from "../task/tasking/TaskSubTasking";
import { getTask } from "../../actions/taskActions";
import moment from "moment"

class Task extends Component {
  constructor(props) {
    super(props)    
    this.mapIdToUser = this.mapIdToUser.bind(this)
    this.mapMessageThread = this.mapMessageThread.bind(this)
    this.getClass = this.getClass.bind(this)
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

  getClass = status => {
    let col = "col-md-8 mx-auto p-3 bg-light rounded "
    if(status.completed) col += "border border-success rounded"
    else if(status.disputed) col += "border border-danger rounded"
    else col += "border border-primary rounded"
    return col
  }

  componentDidMount = () => {
    if(this.props.task.task === null) {      
      this.props.getTask(this.props.match.params.id)
    } else {
      window.location.reload()
    }   
  }

  render() {
    const { task, loading } = this.props.task
    const { auth } = this.props
    let taskContent;

    if( task === null || loading || Object.keys(task).length === 0 ) {
      taskContent = <Spinner />
    } else {
      if( task ) {
        taskContent = (
          <div className={ this.getClass(task.status)}>  
            <h1 className="text-center mb-3">{ task.metaData.title }</h1><hr />
            <p>This task is labeled <strong>{ task.creation.priority.level }</strong> assigned to { `${task.creation.to.rank} ${task.creation.to.name}` }</p>              
            <ul className="list-unstyled">
              <li className="list-header">Task Status</li>
              <li className="list-item">{ task.status.read ? <i className="fas fa-check text-success" /> : <i className="fas fa-times text-danger" /> } Read</li>
              <li className="list-item">{ task.status.completed ? <i className="fas fa-check text-success" /> : <i className="fas fa-times text-danger" /> } Completed</li>
              <li className="list-item">{ task.status.disputed ? <i className="fas fa-check text-success" /> : <i className="fas fa-times text-danger" /> } Disputed</li>
            </ul>
            <p><strong>Description: </strong>{ task.metaData.description }</p>
            <p><strong>Created On: </strong>{  moment(task.creation.date).format('YYYY-MMM-DD') }</p>
            <p><strong>Due By: </strong>{  moment(task.creation.due).format('YYYY-MMM-DD') }</p>
            { task.creation.to.id === auth.user.id ? <TaskSubTasking task={ task } /> : null }
            <hr />
            <h6 className="text-center">Message Thread:</h6>
            <ul className="list-unstyled">{this.mapMessageThread(task.messages)}</ul>
            <TaskMessageReply />
            <hr />
            <h6 className="text-center my-3">Actions:</h6><hr />
            <SubTaskActions />
            <hr />
            <Link to="/dashboard" className="btn btn-outline-primary btn-md">Back to Dashboard</Link>
          </div>
        )
      }
      
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
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  task: state.tasks,
  auth: state.auth
})

export default connect(mapStateToProps, { getTask })(Task)