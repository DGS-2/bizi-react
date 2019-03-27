import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';

class TaskFeed extends Component {
  render() {
    const { tasks } = this.props
    return tasks.map(task => <TaskItem key={task._id} task={task} />)
  }
}

TaskFeed.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default TaskFeed