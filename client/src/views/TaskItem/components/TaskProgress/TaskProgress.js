import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import moment from 'moment';

// Shared components
import {  Paper } from '../../../../components';

// Component styles
import styles from './styles';

class TaskProgress extends Component {  
  state = {
    open: false,
    inProgress: false,
    resolved: false,
    reopened: false,
    closed: false,
    readyForReview: false,
    reviewed: false,
    blocked: false,
    pendingApproval: false,
    approved: false,
    completed: false,
    created: '',
    due: ''
  };

  componentDidMount = () => {   
    const { task } = this.props; 
    this.setState({
      open: task.status.open,
      inProgress: task.status.inProgress,
      resolved: task.status.resolved,
      reopened: task.status.reopened,
      closed: task.status.closed,
      readyForReview: task.workflow.readyForReview,
      reviewed: task.workflow.reviewed,
      blocked: task.workflow.blocked,
      pendingApproval: task.workflow.pendingApproval,
      approved: task.workflow.approved,
      completed: task.workflow.completed,
      created: task.creation.date,
      due: task.creation.due
    });
  }

  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
        <Paper className={rootClassName}>
            <Timeline lineColor={'#ccc'}>
                <TimelineItem 
                    key="001"
                    dateText={'Created on: ' + moment(this.state.created).format('DD MMM YYYY')}
                    style={{ color: '#e86971' }}
                >
                    <h3>Created</h3>
                    <p>This task was created on {moment(this.state.created).format('DD MMM YYYY')}</p>
                </TimelineItem>
                {this.state.open.isStarted && (
                    <TimelineItem 
                        key="002"
                        dateText={'Task was opened on: ' + moment(this.state.open.date).format('DD MMM YYYY')}
                        style={{ color: '#e86971' }}
                    >
                        <h3>Task Opened</h3>
                        <p>This task was set to open on {moment(this.state.open.date).format('DD MMM YYYY')}</p>
                    </TimelineItem>
                )}
                {this.state.inProgress.isStarted && (
                    <TimelineItem 
                        key="003"
                        dateText={'Task In Progress on: ' + moment(this.state.inProgress.date).format('DD MMM YYYY')}
                        style={{ color: '#e86971' }}
                    >
                        <h3>Task In Progress</h3>
                        <p>This task is in progress as of {moment(this.state.inProgress.date).format('DD MMM YYYY')}</p>
                    </TimelineItem>
                )}
                {this.state.resolved.isStarted && (
                    <TimelineItem 
                        key="004"
                        dateText={'Task was resolved on: ' + moment(this.state.resolved.date).format('DD MMM YYYY')}
                        style={{ color: '#e86971' }}
                    >
                        <h3>Task Resolved</h3>
                        <p>This task was resolved on {moment(this.state.resolved.date).format('DD MMM YYYY')}</p>
                    </TimelineItem>
                )}
                {this.state.reopened.isStarted && (
                    <TimelineItem 
                        key="005"
                        dateText={'Task was reopened on: ' + moment(this.state.reopened.date).format('DD MMM YYYY')}
                        style={{ color: '#e86971' }}
                    >
                        <h3>Task Reopened</h3>
                        <p>This task was reopened on {moment(this.state.reopened.date).format('DD MMM YYYY')}</p>
                    </TimelineItem>
                )}
                {this.state.closed.isStarted && (
                    <TimelineItem 
                        key="006"
                        dateText={'Task was closed on: ' + moment(this.state.closed.date).format('DD MMM YYYY')}
                        style={{ color: '#e86971' }}
                    >
                        <h3>Task Closed</h3>
                        <p>This task was closed on {moment(this.state.closed.date).format('DD MMM YYYY')}</p>
                    </TimelineItem>
                )}
                {this.state.readyForReview.isStarted && (
                    <TimelineItem 
                        key="007"
                        dateText={'Task -- Workflow -- Ready For Review on: ' + moment(this.state.readyForReview.date).format('DD MMM YYYY')}
                        style={{ color: '#e86971' }}
                    >
                        <h3>Ready For Reivew</h3>
                        <p>This task is ready for review as of {moment(this.state.readyForReview.date).format('DD MMM YYYY')}</p>
                    </TimelineItem>
                )}
                {this.state.reviewed.isStarted && (
                    <TimelineItem 
                        key="008"
                        dateText={'Task -- Workflow -- Task Reviewed on: ' + moment(this.state.reviewed.date).format('DD MMM YYYY')}
                        style={{ color: '#e86971' }}
                    >
                        <h3>Task Reviewed</h3>
                        <p>This task was reviewed on {moment(this.state.reviewed.date).format('DD MMM YYYY')}</p>
                    </TimelineItem>
                )}
                {this.state.blocked.isStarted && (
                    <TimelineItem 
                        key="009"
                        dateText={'Task -- Workflow -- Blocked on: ' + moment(this.state.blocked.date).format('DD MMM YYYY')}
                        style={{ color: '#e86971' }}
                    >
                        <h3>Task Blocked</h3>
                        <p>This task was blocked on {moment(this.state.blocked.date).format('DD MMM YYYY')}</p>
                        <p>{this.state.blocked.reason}</p>
                    </TimelineItem>
                )}
                {this.state.pendingApproval.isStarted && (
                    <TimelineItem 
                        key="010"
                        dateText={'Task -- Workflow -- Pending Approval on: ' + moment(this.state.pendingApproval.date).format('DD MMM YYYY')}
                        style={{ color: '#e86971' }}
                    >
                        <h3>Task Pending Approval</h3>
                        <p>This task is pending approval as of {moment(this.state.pendingApproval.date).format('DD MMM YYYY')}</p>
                    </TimelineItem>
                )}
                {this.state.approved.isStarted && (
                    <TimelineItem 
                        key="011"
                        dateText={'Task -- Workflow -- Approved on: ' + moment(this.state.approved.date).format('DD MMM YYYY')}
                        style={{ color: '#e86971' }}
                    >
                        <h3>Task Approved</h3>
                        <p>This task was approved on {moment(this.state.approved.date).format('DD MMM YYYY')}</p>
                    </TimelineItem>
                )}
                {this.state.completed.isStarted && (
                    <TimelineItem 
                        key="012"
                        dateText={'Task -- Workflow -- Completed on: ' + moment(this.state.completed.date).format('DD MMM YYYY')}
                        style={{ color: '#00b300' }}
                    >
                        <h3>Task Completed</h3>
                        <p>This task was completed on {moment(this.state.completed.date).format('DD MMM YYYY')}</p>
                    </TimelineItem>
                )}
                <TimelineItem 
                    key="013"
                    dateText={'Due on: ' + moment(this.state.due).format('DD MMM YYYY')}
                    style={{ color: '#e86971' }}
                >
                    <h3>Due By</h3>
                    <p>This task is due on {moment(this.state.due).format('DD MMM YYYY')}</p>
                </TimelineItem>
            </Timeline>
        </Paper>
    );
  }
}

TaskProgress.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  tasks: PropTypes.object,
  task: PropTypes.object
};


const mapStateToProps = state => ({
  tasks: state.tasks
});

export default compose(withStyles(styles), connect(mapStateToProps))(TaskProgress);
