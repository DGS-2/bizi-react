import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import validate from 'validate.js';

// Material helpers
import { withStyles } from '@material-ui/core';

import { registerUser } from '../../actions/authActions';

// Material components
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';

// Material icons
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import { ranks } from '../../const/consts';

// Shared utilities
import validators from '../../common/validators';

// Component styles
import styles from './styles';

validate.validators.checked = validators.checked;



// Service methods
const signUp = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      isToken: false,
      errors: {},
      isLoading: false,
      rank: ''
    };
  }

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  onChange = e => {
    this.setState({[e.target.name] : e.target.value});
  }

  handleSignUp = async () => {
    if(this.state.password === this.state.password2) {
      try {
        const { history } = this.props;

        this.setState({ isLoading: true });

        let user = {
          name: `${this.state.firstName} ${this.state.lastName}`,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2,
          isToken: false,
          rank: ranks.filter(rank => rank.value === this.state.rank)[0]
        };
        console.log(user);
        await signUp(this.props.registerUser(user));
  
        history.push('/login');
      } catch (error) {
        this.setState({
          isLoading: false,
          serviceError: error
        });
      }
    } else {
      this.setState({errors: {error: 'Passwords Do Not Match'}});
    }
    
  };

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            className={classes.quoteWrapper}
            item
            lg={5}
          >
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography
                  className={classes.quoteText}
                  variant="h1"
                >
                  Taskr. Visualising your workload and workflow between users and customers. 
                </Typography>
                <div className={classes.person}>
                  <Typography
                    className={classes.name}
                    variant="body1"
                  >
                    
                  </Typography>
                  <Typography
                    className={classes.bio}
                    variant="body2"
                  >
                    
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            className={classes.content}
            item
            lg={7}
            xs={12}
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
                <form className={classes.form} onSubmit={this.handleSignUp}>
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="First name"
                      name="firstName"
                      onChange={this.onChange}
                      value={this.state.firstName}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      label="Last name"
                      onChange={this.onChange}
                      value={this.state.lastName}
                      name="lastName"
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      label="Select Your Rank"
                      margin="dense"
                      onChange={this.onChange}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={this.state.rank}
                      name="rank"
                      variant="outlined">
                      {ranks.map(option => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                    <TextField
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      onChange={this.onChange}
                      value={this.state.email}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      label="Password"
                      onChange={this.onChange}
                      type="password"
                      name="password"
                      value={this.state.password}
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      label="Verify Password"
                      onChange={this.onChange}
                      type="password"
                      name="password2"
                      value={this.state.password2}
                      variant="outlined"
                    />
                    {this.state.errors && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2"
                      >
                        {this.state.errors.error}
                      </Typography>
                    )}
                  </div>
                  {this.state.isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.signUpButton}
                      color="primary"
                      onClick={this.handleSignUp}
                      size="large"
                      variant="contained"
                    >
                      Sign up now
                    </Button>
                  )}
                  <Typography
                    className={classes.signIn}
                    variant="body1"
                  >
                    Have an account?{' '}
                    <Link
                      className={classes.signInUrl}
                      to="/sign-in"
                    >
                      Sign In
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignUp.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, { registerUser })
)(SignUp);