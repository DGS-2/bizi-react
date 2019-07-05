import React, { Component } from 'react';
import { connect } from 'react-redux';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button, TextField } from '@material-ui/core';

// Shared components
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter,
} from '../../../../components';

import {Typography} from '@material-ui/core';

// Component styles
import styles from './styles';

// Actions
import { resetPassword } from '../../../../actions/authActions';

const reset = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

class Password extends Component {
  state = {
    currentPassword: '',
    newPassword: '',
    verifyPassword: '',
    message: ''
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = async () => {
    try {
      const { auth } = this.props;
      const { currentPassword, newPassword } = this.state;
      let obj = {
        id: auth.user.id,
        currentPassword: currentPassword,
        newPassword: newPassword
      };

      reset(this.props.resetPassword(obj, null));

      this.setState({message: 'Your password was reset successfully'});      
      
    } catch (error) {
      this.setState({
        message: 'We could not update your password. Please contact your administrator'
      });
    }
  }

  render() {
    const { classes, className } = this.props;
    const { currentPassword, newPassword, verifyPassword, message } = this.state;

    const rootClassName = classNames(classes.root, className);
    
    return (
      <Portlet
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="Update password"
            title="Password"
          />
        </PortletHeader>
        <PortletContent>
          <form className={classes.form}>
            <TextField
              className={classes.textField}
              label="Password"
              name="currentPassword"
              onChange={this.onChange}
              type="password"
              value={currentPassword}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              label="Password"
              name="newPassword"
              onChange={this.onChange}
              type="password"
              value={newPassword}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              label="Confirm password"
              name="verifyPassword"
              onChange={this.onChange}
              type="password"
              value={verifyPassword}
              variant="outlined"
            />
            {newPassword !== verifyPassword  && (
              <Typography
                className={classes.fieldError}
                variant="body2"
              >
                Passwords Do Not Match
              </Typography>
            )}
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          {newPassword === verifyPassword && message === '' && (
            <Button
              color="primary"
              variant="outlined"
              onClick={this.handleSubmit}
            >
              Update
            </Button>
          )}
          {message && (
            <Typography
              className={classes.fieldSuccess}
              variant="body2"
            >
              {message}
            </Typography>
          )}
        </PortletFooter>
      </Portlet>
    );
  }
}

Password.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  resetPassword: PropTypes.func,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default compose(withStyles(styles), connect(mapStateToProps, {resetPassword}))(Password);