import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Shared services
import { getTasks } from '../../../../actions/taskActions';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  IconButton,
  Typography,
  CircularProgress,
  Menu,
  MenuItem,
  LinearProgress
} from '@material-ui/core';

// Material icons
import {
  ArrowRight as ArrowRightIcon,
  MoreVert as MoreVertIcon
} from '@material-ui/icons';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from '../../../../components';

// Component styles
import styles from './styles';

class TaskList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 4,
    tasks: [],
    tasksTotal: 0,
    error: null,
    isOpen: false,
    showMore: '',
    anchorEl: null
  };

  async getTasks() {
    try {
      this.setState({ isLoading: true });

      this.props.getTasks();

      const { task } = this.props
      if (this.signal) {
        this.setState({
          isLoading: false,
          tasks: task.tasks,
          tasksTotal: task.tasks.length
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
    const { profile, task } = props
    let profileExists;
    
    if(profile.profile === null || Object.entries(profile.profile).length === 0 ) profileExists = false;
    else profileExists = true;

    if(task.tasks !== null && profileExists) {
      this.setState({
        tasks: task.tasks.filter(item => item.creation.to.id === profile.profile.user._id),
        tasksTotal: task.tasks.filter(item => item.creation.to.id === profile.profile.user._id).length
      })
    }    
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
      isOpen: !this.state.isOpen
    })
  }

  handleClose = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  getValue = status => {
    let value
    if(status.completed) value = 100
    if(status.read) value = 25
    if(status.disputed || status) value = 0

    return value
  }

  renderUserTasks() {
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
      <Fragment>
        {tasks.map((task, i) => (
          <div
            className={classes.product}
            key={i}
          >
            <div className={classes.productDetails}>
                <Typography
                  className={classes.productTitle}
                  variant="h5"
                >
                  {task.metaData.title}
                </Typography>
              <Typography
                className={classes.productTimestamp}
                variant="body2"
              >
                
              </Typography>
              <div>
                <Typography className={classes.value} variant="h6">PROGRESS {this.getValue(task.status)}% </Typography>
                <LinearProgress 
                  variant="indeterminate"
                  value={this.getValue(task.status)}
                />
              </div>
            </div>
            <div>
              <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                <MoreVertIcon  />
              </IconButton>
              <Menu
                id={"simple-menu_" + i}
                anchorEl={this.state.anchorEl}
                keepMounted
                open={this.state.isOpen}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}><Link to={"/task/" + task._id}>View Task</Link></MenuItem>
                <MenuItem onClick={this.handleClose}>View Progress</MenuItem>
                <MenuItem onClick={this.handleClose}>Action</MenuItem>
              </Menu>
            </div>
            
          </div>
        ))}
      </Fragment>
    );
  }

  render() {
    const { classes, className } = this.props;
    const { tasksTotal } = this.state;
    
    const rootClassName = classNames(classes.root, className);
    
    return (
      <Portlet
        // {...rest}
        className={rootClassName}
      >
        <PortletHeader noDivider>
          <PortletLabel
            subtitle={`${tasksTotal} in total`}
            title="My tasks"
          />
        </PortletHeader>
        <PortletContent className={classes.portletContent}>
          {this.renderUserTasks()}
        </PortletContent>
      </Portlet>
    );
  }
}

TaskList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  getTasks: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  task: state.tasks,
  auth: state.auth,
  profile: state.profile
})

export default compose(connect(mapStateToProps, { getTasks }), withStyles(styles)) (TaskList);