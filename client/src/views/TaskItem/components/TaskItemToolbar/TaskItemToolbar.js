import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Actions
import { changeStatus } from '../../../../actions/taskActions';

// Material components
import { 
  Button, 
  Menu, 
  MenuItem
} from '@material-ui/core';

// Component styles
import styles from './styles';

class TaskItemToolbar extends Component {  
  state = {
    anchorEl: null,
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
    completed: false
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
      completed: task.workflow.completed
    });
  }

  openMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  }

  closeMenu = () => {
    this.setState({anchorEl: null});
  }

  updateStatus = e => {
    this.setState({[e.currentTarget.value]: { isStarted: !this.state[e.currentTarget.value].isStarted, date: Date.now()}});

    setTimeout(() => {
      this.processUpdate();
    }, 1500);
  }

  processUpdate = () => {
    const { task } = this.props
    console.log(this.state)
    let updatedTask = {
      status: {
        open: this.state.open,
        inProgress: this.state.inProgress,
        resolved: this.state.resolved,
        reopened: this.state.reopened,
        closed: this.state.closed,
      },
      workflow: {
        readyForReview: this.state.readyForReview,
        reviewed: this.state.reviewed,
        blocked: this.state.blocked,
        pendingApproval: this.state.pendingApproval,
        approved: this.state.approved,
        completed: this.state.completed
      }
    };

    this.props.changeStatus(task._id, updatedTask);
  }

  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          <Button
            aria-controls="actions-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
          >
            Sub-Task
          </Button>
          <Button value={'open'} onClick={this.updateStatus} disabled={this.state.open.isStarted}>Open</Button>
          <Button value={'inProgress'} onClick={this.updateStatus} disabled={this.state.inProgress.isStarted && this.state.open.isStarted}>In Progress</Button>
          <Button value={'resolved'} onClick={this.updateStatus} disabled={this.state.resolved.isStarted && this.state.open.isStarted}>Resolved</Button>
          <Button value={'reopened'} onClick={this.updateStatus} disabled={this.state.reopened.isStarted  && !this.state.open.isStarted}>Reopened</Button>
          <Button value={'closed'} onClick={this.updateStatus} disabled={this.state.closed.isStarted && this.state.open.isStarted}>Closed</Button>
          <Button
            aria-controls="workflow-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={this.openMenu}
          >
            Workflow
          </Button>
          <Menu
            id="workflow-menu"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.closeMenu}
          >
            <MenuItem>
              <Button value={'readyForReview'} onClick={this.updateStatus} disabled={this.state.readyForReview.isStarted  && this.state.open.isStarted}>Ready for Review</Button>
            </MenuItem>
            <MenuItem>
              <Button value={'reviewed'} onClick={this.updateStatus} disabled={this.state.reviewed.isStarted  && this.state.open.isStarted}>Task Reviewed</Button>
            </MenuItem>
            <MenuItem>
              <Button value={'blocked'} onClick={this.updateStatus} disabled={this.state.blocked.isStarted  && this.state.open.isStarted}>Blocked</Button>
            </MenuItem>
            <MenuItem>
              <Button value={'pendingApproval'} onClick={this.updateStatus} disabled={this.state.pendingApproval.isStarted  && this.state.open.isStarted}>Pending Approval</Button>
            </MenuItem>
            <MenuItem>
              <Button value={'approved'} onClick={this.updateStatus} disabled={this.state.approved.isStarted  && this.state.open.isStarted}>Approved</Button>
            </MenuItem>
            <MenuItem >
              <Button value={'completed'} onClick={this.updateStatus} disabled={this.state.completed.isStarted  && this.state.open.isStarted}>Completed</Button>              
            </MenuItem>            
          </Menu>
          <span className={classes.spacer} />
          
        </div>
      </div>
    );
  }
}

TaskItemToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  tasks: PropTypes.object,
  changeStatus: PropTypes.func
};


const mapStateToProps = state => ({
  tasks: state.tasks
});

export default compose(withStyles(styles), connect(mapStateToProps, { changeStatus }))(TaskItemToolbar);
