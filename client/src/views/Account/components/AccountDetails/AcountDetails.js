import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

import { updatePersonalDetails } from '../../../../actions/profileActions';

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
    
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
          firstName: user.user.name.split(' ')[0],
          lastName: user.user.name.split(' ')[1],
          email: user.user.email,
        });
    } else {
        this.setState({
          firstName: 'Please Update',
          lastName: 'Please Update',
          email: 'Please Update'
        });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateProfile = () => {
    let updateToBeMade = {
      name: this.state.firstName + ' ' + this.state.lastName,
      email: this.state.email
    };

    this.props.updatePersonalDetails(updateToBeMade);
  }

  render() {
    const { classes, className, ...rest } = this.props;
    const { firstName, lastName, email } = this.state;
    
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="Update your personal and contact infomration here"
            title="Profile"
          />
        </PortletHeader>
        <PortletContent noPadding>
          <form
            autoComplete="off"
            noValidate
          >
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                required
                name="firstName"
                onChange={this.onChange}
                value={firstName}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Last name"
                margin="dense"
                required
                name="lastName"
                onChange={this.onChange}
                value={lastName}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Email Address"
                margin="dense"
                type="email"
                required
                name="email"
                onChange={this.onChange}
                value={email}
                variant="outlined"
              />
              {/* <TextField
                className={classes.textField}
                label="Phone Number"
                margin="dense"
                type="text"
                value={phone}
                name="phone"
                onChange={this.onChange}
                variant="outlined"
              /> */}
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            variant="contained"
            onClick={this.updateProfile}
          >
            Save personal details
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object,
  updatePersonalDetails: PropTypes.func
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default compose(connect(mapStateToProps, {updatePersonalDetails}), withStyles(styles))(Account);