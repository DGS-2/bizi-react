import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

// Actions
import { resetPassword } from "../../actions/authActions";

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';

// Material icons
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';


// Component styles
import styles from './styles';


const reset = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

class PasswordReset extends Component {
  state = {
    id: '',
    currentPassword: '',
    password: '',
    password2: '',
    errors: {}
  };

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  

  handleReset = async () => {
    

    if( this.state.password === this.state.password2 ) {
        try {
            const { history, auth } = this.props;
            await reset(this.props.resetPassword({id: auth.user.id, currentPassword: this.state.currentPassword, newPassword: this.state.password}, history));
            
          } catch (error) {
            this.setState({
              isLoading: false,
              serviceError: error
            });
          }
    } else {
        this.setState({
            errors: {...this.state.errors, passwordError: 'New Passwords Do Not Match'}
        })
    }
    
  };

  onChange = e => {
      this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
          direction="row"
          justify="center"
        >
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton
                  className={classes.backButton}
                  onClick={this.handleBack}
                >
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form className={classes.form} autoComplete="off">
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    Password Reset
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Current Password"
                      name="currentPassword"
                      onChange={this.onChange}
                      type="password"
                      value={this.state.email}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      label="New Password"
                      name="password"
                      onChange={this.onChange}
                      type="password"
                      value={this.state.password}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      label="Verify Password"
                      name="password2"
                      onChange={this.onChange}
                      type="password"
                      value={this.state.password2}
                      variant="outlined"
                    />
                    {this.state.errors.passwordError  && (
                        <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {this.state.errors.passwordError}
                      </Typography>
                    )}
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      size="large"
                      variant="contained"
                      onClick={this.handleReset}
                    >
                      Reset Password
                    </Button>
                  </div>
                </form>
              </div>
            </div>
        </Grid>
      </div>
    );
  }
}

PasswordReset.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default compose( withRouter, withStyles(styles), connect(mapStateToProps, {resetPassword}) )(PasswordReset);