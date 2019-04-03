import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubTaskItem from './SubTaskItem';

class SubTaskFeed extends Component {
  render() {
    const { tasks } = this.props
    
    return tasks.map(task => <SubTaskItem key={task._id} task={ task } />)
  }
}

SubTaskFeed.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default SubTaskFeed