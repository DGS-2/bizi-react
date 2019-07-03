import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
// Actions
import { adminRegisterUser } from "../../../../actions/authActions";


// Material Helpers
import { withStyles } from '@material-ui/core';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { filterUsers } from "../../../../functions/functions";
import Spinner from '../../../../components/shared/spinner/Spinner';
import { dgsSites, ranks } from '../../../../const/consts';
// Component styles
import styles from './styles';

import {
    Portlet,
    PortletHeader,
    PortletLabel,
    PortletContent,
    PortletFooter
} from '../../../../components';

class UserForm extends Component {
    constructor(props){
        super(props)    
        this.state = {
            name: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            taggableUsers: [],
            errors: {},
            registering: false,
            registered: false,
            updating: false,
            newUser: {},
            phone: '',
            site: '',
            unit: '',
            rank: ''
        }
        
        this.onChange = this.onChange.bind(this);
      }
    
      componentWillReceiveProps(newProps) {
        if(newProps.errors) {
          this.setState({errors: newProps.errors})
        }
      }
        
      onChange = e => {
        this.setState({[e.target.name]: e.target.value})
      } 
    
      register = e => {
        e.preventDefault();
        let firstName, lastName;
        firstName = this.state.name.split(' ')[0];  
        lastName = this.state.name.split(' ')[1];
        this.setState({
            registering: true,
            firstName: firstName,
            lastName: lastName
        });

        let user = {
            name: this.state.name,
            firstName: firstName,
            lastName: lastName,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password,
            isToken: true
        };

        this.props.adminRegisterUser(user);

        setTimeout(() => {
            this.setState({
                registered: true,
                newUser: this.props.auth.registered
            });
        }, 5000);
      }
    
      updateProfile = e => {
          e.preventDefault();
            this.setState({updating: true});
          setTimeout(() => {
              this.props.toggleAddUser();
          }, 5000);
      }
      
      generateLoginToken = () => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        var charactersLength = characters.length;
        for ( var i = 0; i < 15; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        this.setState({
            password: result
        });
     }

      render() {        
        const { classes } = this.props;
        const { newUser } = this.state;

        let registerForm = (
            <form
                autoComplete="off"
                noValidate
                onSubmit={this.register}
            >
                <Portlet>
                <PortletHeader>
                    <PortletLabel
                    subtitle="Register a new user"
                    title="Register"
                    />
                </PortletHeader>              
                <PortletContent noPadding>
                    <div className={classes.field}>
                      <TextField 
                          className={classes.textField}
                          helperText="New User's Name"
                          label="Full Name"
                          margin="dense"
                          required
                          fullWidth
                          value={this.state.name}
                          variant="outlined"
                          name="name"
                          onChange={this.onChange}
                      />
                    </div>
                    <div className={classes.field}>
                      <TextField 
                          className={classes.textField}
                          helperText="New User's Email"
                          label="Email Address"
                          margin="dense"
                          required
                          fullWidth
                          value={this.state.email}
                          variant="outlined"
                          name="email"
                          onChange={this.onChange}
                      />
                    </div>
                    <div className={classes.field}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="button"
                            onClick={this.generateLoginToken}
                        >
                            Generate Login Token    
                        </Button> 
                    </div>
                    <div className={classes.field}> 
                      <TextField 
                          className={classes.textField}
                          helperText="New User's Login Token"
                          label="Login Token"
                          margin="dense"
                          required
                          fullWidth
                          variant="outlined"
                          name="password"
                          value={this.state.password}
                      />
                    </div>
                </PortletContent>
                <PortletFooter className={classes.portletFooter}>
                    <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    >
                    Register User
                    </Button>
                </PortletFooter>            
                </Portlet>
            </form>
          );

        let profileForm = (
            <form
                autoComplete="off"
                noValidate
                onSubmit={this.updateProfile}
            >
                <Portlet>
                <PortletHeader>
                    <PortletLabel
                    subtitle="Update profile information"
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
                            helperText="Please specify your first name"
                            label="First name"
                            margin="dense"
                            required
                            value={newUser.firstName}
                            variant="outlined"
                            onChange={this.onChange}
                            name="firstName"
                        />
                        <TextField
                            className={classes.textField}
                            label="Last name"
                            margin="dense"
                            required
                            value={newUser.lastName}
                            variant="outlined"
                            name="lastName"
                            onChange={this.onChange}
                        />
                        <TextField
                            className={classes.textField}
                            label="Select Rank"
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
                        </div>
                        <div className={classes.field}>
                        <TextField
                            className={classes.textField}
                            label="Email Address"
                            margin="dense"
                            required
                            value={newUser.email}
                            variant="outlined"
                            name="email"
                            onChange={this.onChange}
                        />
                        <TextField
                            className={classes.textField}
                            label="Phone Number"
                            margin="dense"
                            type="number"
                            value={this.state.phone}
                            variant="outlined"
                            onChange={this.onChange}
                        />
                        </div>
                        <div className={classes.field}>
                        <TextField
                            className={classes.textField}
                            label="Select Site"
                            margin="dense"
                            onChange={this.onChange}
                            required
                            select
                            SelectProps={{ native: true }}
                            name="site"
                            value={this.state.site}
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
                            value={this.state.unit}
                            variant="outlined"
                            onChange={this.onChange}
                        />
                        </div>
                    </form>
                    </PortletContent>
                <PortletFooter className={classes.portletFooter}>
                    <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    >
                    Update Profile
                    </Button>
                </PortletFooter>            
                </Portlet>
            </form>
          );

        return (
          <div>
              {this.state.registered ? this.state.updating ? <Spinner /> : profileForm : this.state.registering ? <Spinner /> : registerForm}
          </div>
        );
      }
}

UserForm.propTypes = {
    adminRegisterUser: PropTypes.func.isRequired,
    filterUsers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    toggleAddUser: PropTypes.func
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile
})

export default compose(withStyles(styles), withRouter, connect(mapStateToProps, { adminRegisterUser, filterUsers })) (UserForm);