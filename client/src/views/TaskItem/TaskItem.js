import React, { Component } from 'react';

import { connect } from 'react-redux';
import compose from 'recompose/compose';
// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Form
// import TaskForm from "./components/TaskForm/TaskForm";

import { getTask } from '../../actions/taskActions';

// Material components
import {
  IconButton,
  CircularProgress,
  Grid,
  Typography
} from '@material-ui/core';

// Material icons
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon
} from '@material-ui/icons';

// Shared layouts
import { Dashboard as DashboardLayout } from '../../layouts';

import TaskCard from '../TaskList/components/TaskCard/TaskCard';

// Component styles
import styles from './styles';

class TaskItem extends Component {
  signal = true;

  state = {
    isLoading: false,
    task: null,
    error: null,
    isFormOpen: false
  };

  async getTask() {      
    try {
      this.setState({ isLoading: true });
      
      await this.props.getTask(this.props.match.params.id);
    
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentWillMount() {
    this.signal = true;
    this.getTask();    
  }

  componentWillReceiveProps = props => {
    const { task } = props.tasks
    if(task !== null) {
      this.setState({
        task: task,
        isLoading: false
      })
    }    
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderTask() {
    const { classes } = this.props;
    const { isLoading, task } = this.state;
    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (task === null) {
      return (
        <Typography variant="h6">Your task could not be found</Typography>
      );
    }

    return (
      <Grid
        container
        spacing={3}
      >
        
          <Grid
            item
            key={task._id}
            lg={6}
            md={6}
            xs={6}
          >
            <TaskCard task={task} />
          </Grid>
        
      </Grid>
    );
  }

  toggleForm = () => {
    this.setState({isFormOpen: !this.state.isFormOpen})
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title={"Task"}>
        <div className={classes.root}>
          {/* <TasksToolbar toggleForm={this.toggleForm} /> */}
          
          <div className={classes.content}>{ this.renderTask() }</div>
          <div className={classes.pagination}>
            <Typography variant="caption"></Typography>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>
      </DashboardLayout>
    );
  }
}

TaskItem.propTypes = {
  classes: PropTypes.object.isRequired,
  getTask: PropTypes.func.isRequired,
  tasks: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  showForm: PropTypes.bool
};

const mapStateToProps = state => ({
  tasks: state.tasks,
  auth: state.auth,
  profile: state.profile
})

export default compose( withStyles(styles), connect(mapStateToProps, { getTask }))(TaskItem);