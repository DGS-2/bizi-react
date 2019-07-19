import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Avatar, Typography, Button, LinearProgress } from '@material-ui/core';

// Shared components
import { Portlet, PortletContent, PortletFooter } from '../../../../components';

// Component styles
import styles from './styles';

class AccountProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      avatar: '',
      timeZone: ''
    }
  }

  componentDidMount = () => {
    const { user } = this.props;
    this.setProfileState(user);
  }

  componentWillReceiveProps = props => {
    const { user } = props;
    this.setProfileState(user);  
  }

  setProfileState = user => {
    if(user && Object.entries(user).length !== 0) {
      this.setState({
        name: user.user.name,
        // location: user.organization.wing || ''
      })
    } else {
      this.setState({
        name: 'Please Update',
        location: 'Please Update'
      })
    }
  }

  render() {
    const { classes, className, ...rest } = this.props;

    const rootClassName = classNames(classes.root, className);

    const { name, location, timeZone } = this.state;

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">{ name }</Typography>
              {/* <Typography
                className={classes.locationText}
                variant="body1"
              >
                { location }
              </Typography> */}
              <Typography
                className={classes.dateText}
                variant="body1"
              >
                { timeZone }
              </Typography>
            </div>
            <Avatar
              className={classes.avatar}
              src="/images/avatars/avatar_1.png"
            />
          </div>
          <div className={classes.progressWrapper}>
            <Typography variant="body1">Profile Completeness: 70%</Typography>
            <LinearProgress
              value={70}
              variant="determinate"
            />
          </div>
        </PortletContent>
        <PortletFooter>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text"
          >
            Upload picture
          </Button>
          <Button variant="text">Remove picture</Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);