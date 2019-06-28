import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Shared services
import { getTasks } from '../../../../actions/taskActions';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Button,
  IconButton,
  Typography,
  CircularProgress
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
    error: null
  };

  async getTasks() {
    try {
      this.setState({ isLoading: true });

      this.props.getTasks();

      const { tasks } = this.props

      if (this.signal) {
        this.setState({
          isLoading: false,
          tasks: tasks.tasks,
          tasksTotal: tasks.tasks.length
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

    this.props.getTasks();
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
      <Fragment>
        {tasks.map((task, i) => (
          <div
            className={classes.product}
            key={i}
          >
            <div className={classes.productDetails}>
              <Link to="#">
                <Typography
                  className={classes.productTitle}
                  variant="h5"
                >
                  {task.title}
                </Typography>
              </Link>
              <Typography
                className={classes.productTimestamp}
                variant="body2"
              >
                
              </Typography>
            </div>
            <div>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </Fragment>
    );
  }

  render() {
    const { classes, className, ...rest } = this.props;
    const { tasksTotal } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader noDivider>
          <PortletLabel
            subtitle={`${tasksTotal} in total`}
            title="Latest tasks"
          />
        </PortletHeader>
        <PortletContent className={classes.portletContent}>
          {this.renderTasks()}
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            size="small"
            variant="text"
          >
            View all <ArrowRightIcon />
          </Button>
        </PortletFooter>
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

export default connect(mapStateToProps, { getTasks })(withStyles(styles)(TaskList));