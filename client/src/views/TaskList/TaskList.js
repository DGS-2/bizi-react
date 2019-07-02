import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Form
import TaskForm from "./components/TaskForm/TaskForm";

import { getTasks } from '../../actions/taskActions';

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

// Shared services
// import { getProducts } from 'services/product';

// Custom components
import { TasksToolbar, TaskCard } from './components';

// Component styles
import styles from './styles';

class TaskList extends Component {
  signal = true;

  state = {
    isLoading: false,
    tasks: [],
    tasksTotal: 0,
    error: null,
    isFormOpen: false
  };

  async getTasks() {
    try {
      this.setState({ isLoading: true });

      await this.props.getTasks();

      const { tasks } = this.props.task.tasks;
      console.log(tasks);
      if (this.signal) {
        this.setState({
          isLoading: false,
          tasks: tasks,
          tasksTotal: tasks.length
        });
      }
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
    this.getTasks();    
  }

  componentWillReceiveProps = props => {
    if(props.task.tasks !== null) {
      this.setState({
        tasks: props.task.tasks,
        tasksTotal: props.task.tasks.length
      })
    }    
  }

  componentWillUnmount() {
    this.signal = false;
  }

  renderTasks() {
    const { classes } = this.props;
    const { isLoading, tasks } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (tasks.length === 0) {
      return (
        <Typography variant="h6">There are no tasks available</Typography>
      );
    }

    return (
      <Grid
        container
        spacing={3}
      >
        {tasks.map(task => (
          <Grid
            item
            key={task._id}
            lg={4}
            md={6}
            xs={12}
          >
            <Link to="#">
              <TaskCard task={task} />
            </Link>
          </Grid>
        ))}
      </Grid>
    );
  }

  toggleForm = () => {
    this.setState({isFormOpen: !this.state.isFormOpen})
  }

  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Tasks">
        <div className={classes.root}>
          <TasksToolbar toggleForm={this.toggleForm} />
          <div className={classes.content}>{ this.state.isFormOpen ? <TaskForm /> : null }</div>
          <div className={classes.content}>{this.renderTasks()}</div>
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

TaskList.propTypes = {
  classes: PropTypes.object.isRequired,
  getTasks: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  showForm: PropTypes.bool
};

const mapStateToProps = state => ({
  task: state.tasks,
  auth: state.auth,
  profile: state.profile
})

export default compose( withStyles(styles), connect(mapStateToProps, { getTasks }))(TaskList);