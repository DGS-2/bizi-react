import React, { Component } from 'react';
import moment from "moment";
import compose from "recompose/compose";
import { connect } from "react-redux";
// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Typography, Divider } from '@material-ui/core';

// Material icons
import {
  AccessTime as AccessTimeIcon,
  Share as GetAppIcon
} from '@material-ui/icons';

// Shared components
import { Paper } from '../../../../components';

// Component styles
import styles from './styles';

class TaskCard extends Component {
  render() {
    const { classes, className, task } = this.props;
    
    const rootClassName = classNames(classes.root, className);

    return (
      <Paper className={rootClassName}>
        <div className={classes.details}>
          <Typography
            className={classes.title}
            variant="h2"
          >
            {task.metaData.classification}
          </Typography>
        </div>
        <div className={classes.details}>
          <Typography
            className={classes.title}
            variant="h4"
          >
            {task.metaData.title}
          </Typography>
          <Typography
            className={classes.description}
            variant="body1"
          >
            {task.metaData.description}
          </Typography>
        </div>
        <Divider />
        <div className={classes.stats}>
          <AccessTimeIcon className={classes.updateIcon} />
          <Typography
            className={classes.updateText}
            variant="body2"
          >
            Created on {moment(task.creation.date).format('MMM DD YYYY')}
          </Typography>
          <Typography
            className={classes.updateText}
            variant="body2"
          >
            <strong>
              Due by {moment(task.creation.due).format('MMM DD YYYY')}
            </strong>            
          </Typography>
          <GetAppIcon className={classes.downloadsIcon} />
          <Typography
            className={classes.downloadsText}
            variant="body2"
          >
            share
          </Typography>
        </div>
      </Paper>
    );
  }
}

TaskCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default compose(withStyles(styles), connect(mapStateToProps) )(TaskCard);
