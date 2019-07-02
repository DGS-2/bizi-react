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

import { dgsSites } from '../../../../const/consts';

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      site: '',
      unit: ''
    };
    
  }

  componentDidMount = () => {
    const { user } = this.props
    if(Object.entries(user).length !== 0) {
      this.setState({
        firstName: user.personalInfo.name.first,
        lastName: user.personalInfo.name.last,
        email: user.contactInfo.email.unclass,
        unit: user.organization.squadron
      })
    } else {
      this.setState({
        firstName: 'Please Update',
        lastName: 'Please Update',
        email: 'Please Update',
        unit: 'Please Update'
      })
    }
  }

  componentWillReceiveProps = props => {
    const { user } = props
    if(Object.entries(user).length !== 0) {
      this.setState({
        firstName: user.personalInfo.name.first,
        lastName: user.personalInfo.name.last,
        email: user.contactInfo.email.unclass,
        unit: user.organization.squadron
      })
    } else {
      this.setState({
        firstName: 'Please Update',
        lastName: 'Please Update',
        email: 'Please Update',
        unit: 'Please Update'
      })
    }
  }

  handleChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  render() {
    const { classes, className, ...rest } = this.props;
    const { firstName, lastName, phone, unit, email } = this.state;
    
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        {...rest}
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="Update your infomration here"
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
                value={firstName}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Last name"
                margin="dense"
                required
                value={lastName}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Email Address"
                margin="dense"
                required
                value={email}
                variant="outlined"
              />
              <TextField
                className={classes.textField}
                label="Phone Number"
                margin="dense"
                type="number"
                value={phone}
                variant="outlined"
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Select Site"
                margin="dense"
                onChange={this.handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={unit}
                variant="outlined">
                {dgsSites.map(option => (
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
                label="Unit assigned"
                margin="dense"
                required
                value={unit}
                variant="outlined"
              />
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            variant="contained"
          >
            Save details
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default compose(withStyles(styles), connect(mapStateToProps))(Account);