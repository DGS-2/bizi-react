import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TaskFeed from "./TaskFeed"
import TaskForm from "./TaskForm"

import Spinner from "../shared/Spinner"

import { getTasks } from "../../actions/taskActions";

class Tasks extends Component {
  componentDidMount(){
    this.props.getTasks()
  }

  render() {
    const { tasks, loading } = this.props.task
    let taskContent

    if(tasks === null || loading) {
      taskContent = <Spinner />
    } else {
      taskContent = <TaskFeed tasks={tasks} />
    }

    return (
      <div className="container-fluid">

        <div className="card-columns">
          <div className="card">
            <div className="card-header">Create a New Task</div>
            <div className="card-body"><TaskForm /></div>
          </div>
          { taskContent }
        </div>
      </div>
    )
  }
}


Tasks.propTypes = {
  getTasks: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  task: state.tasks
})

export default connect(mapStateToProps, { getTasks })(Tasks);