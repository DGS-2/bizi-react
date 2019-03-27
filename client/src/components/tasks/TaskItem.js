import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from "react-router-dom";

import { deleteTask } from "../../actions/taskActions"

class TaskItem extends Component {
  constructor(props){
    super(props)
    this.mapIdToUser = this.mapIdToUser.bind(this)
    this.getCardClass = this.getCardClass.bind(this)
    this.getIconClass = this.getIconClass.bind(this)
  }

  onDeleteClick = id => {
    this.props.deleteTask(id)
  }

  mapIdToUser = user => {
    let profiles = this.props.profile.profiles
    let from = profiles? profiles.filter(u => u.user._id === user) : []
    let returnUser = from[0] ? `${from[0].personalInfo.rank.abreviated} ${from[0].personalInfo.name.full}` : ''
    return returnUser
  }

  getCardClass = priority => {
    let cardClass = "card "
    if(priority === "Critical") cardClass += "border border-danger text-dark"
    else if( priority === "Important" )cardClass += "border border-warning text-dark"
    
    return cardClass
  }

  getIconClass = priority => {
    let iconClass = 'fas '
    if(priority === "Critical") iconClass += "fa-exclamation-triangle text-white bg-danger"
    else if( priority === "Important" ) iconClass += "fa-exclamation"

    return iconClass
  }

  render() {
    const { task, auth } = this.props

    return (
      <div className={ this.getCardClass(task.creation.priority.level) }>  
        <div className="card-header">
          <i className={ this.getIconClass(task.creation.priority.level) }></i>&nbsp;
          ({task.metaData.classification}) { task.metaData.title }
        </div>
        <div className="card-body">
          <h6 className="text-center"><strong>{ task.creation.priority.level } Task</strong></h6><hr/>
          <p><strong>Description: </strong>{ task.metaData.description }</p>
          <div className="container-fluid">
          <Link to={`/task/${task._id}`} className="btn btn-outline-dark btn-sm mx-auto">View Task</Link>
          </div>
        </div>
        <div className="card-footer">
          {task.creation.from.id === auth.user.id ? (
            <button
              onClick={this.onDeleteClick.bind(this, task._id)}
              type="button"
              className="btn btn-danger mx-auto"
            >
              Delete This Task <i className="fas fa-times" />
            </button>
          ) : null}
        </div>
      </div>
    )
  }
}

TaskItem.defaultProps = {
  showActions: true
}

TaskItem.propTypes = {
  deleteTask: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { deleteTask })(TaskItem);