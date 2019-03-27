import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from "classnames";

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
    let cardClass = "card-body "
    if(priority === "Critical") cardClass += "bg-danger text-white"
    else if( priority === "Important" )cardClass += "bg-warning text-dark"
    
    return cardClass
  }

  getIconClass = priority => {
    let iconClass = 'fas '
    if(priority === "Critical") iconClass += "fa-exclamation-triangle text-white bg-danger"
    else if( priority === "Important" ) iconClass += "fa-exclamation"

    return iconClass
  }

  render() {
    const { task, auth, showActions } = this.props

    return (
      <div className="card">  
        <div className="card-header">
          <i className={ this.getIconClass(task.creation.priority.level) }></i>&nbsp;
          ({task.metaData.classification}) { task.metaData.title }
        </div>
        <div className={ this.getCardClass(task.creation.priority.level) }>
          <h6 className="text-center"><strong>{ task.creation.priority.level } Task</strong></h6><hr/>
          <p><strong>Description: </strong>{ task.metaData.description }</p>
          <Link to={`/task/${task._id}`} className="btn btn-outline-dark btn-sm">View Task</Link>
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