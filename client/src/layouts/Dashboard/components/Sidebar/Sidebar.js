import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// Externals
import classNames from 'classnames';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

import logo from '../../../../assets/images/bizi_logo.svg';

// Material components
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@material-ui/core';

// Material icons
import {
  DashboardOutlined as DashboardIcon,
  PeopleOutlined as PeopleIcon,
  InfoOutlined as InfoIcon,
  AccountBoxOutlined as AccountBoxIcon,
  SettingsOutlined as SettingsIcon,
  Assignment as AssignmentIcon
} from '@material-ui/icons';

// Component styles
import styles from './styles';

class Sidebar extends Component {
  render() {
    
    const { classes, className, profile } = this.props;
    const rootClassName = classNames(classes.root, className);

    let name, title;
    if(profile.profile === null || Object.entries(profile.profile).length === 0) name = "Guest"
    else name = profile.profile.user.name;

    return (
      <nav className={rootClassName}>
        <div className={classes.logoWrapper}>
          <Link
            className={classes.logoLink}
            to="/dashboard"
          >
            <img
              alt="Taskr logo"
              className={classes.logoImage}
              src={logo}
            />
          </Link>
        </div>
        <Divider className={classes.logoDivider} />
        <div className={classes.profile}>
          <Link to="/edit-profile">
            <Avatar
              alt=""
              className={classes.avatar}
              
            />
          </Link>
          <Typography
            className={classes.nameText}
            variant="h6"
          >
           { name }
          </Typography>
          <Typography
            className={classes.bioText}
            variant="caption"
          >
            {title}
          </Typography>
        </div>
        <Divider className={classes.profileDivider} />
        <List
          component="div"
          disablePadding
        >
          <NavLink to="/dashboard">
            <ListItem
              
              className={classes.listItem}            
            >            
              <ListItemIcon className={classes.listItemIcon}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Dashboard"
              />            
            </ListItem>
          </NavLink>
          <NavLink to="/all-users">
            <ListItem
              
              className={classes.listItem}            
            >
              <ListItemIcon className={classes.listItemIcon}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Users"
              />
            </ListItem>
          </NavLink>
          <NavLink to="/tasks">
            <ListItem
              
              className={classes.listItem}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Tasks"
              />
            </ListItem>
          </NavLink>
          <NavLink to="/edit-profile">
            <ListItem
              
              className={classes.listItem}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Account"
              />
            </ListItem>
          </NavLink>
          <NavLink to="/settings">
            <ListItem
              
              className={classes.listItem}
            >
              <ListItemIcon className={classes.listItemIcon}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Settings"
              />
            </ListItem>
          </NavLink>          
        </List>
        <Divider className={classes.listDivider} />
        {/* <List
          component="div"
          disablePadding
          subheader={
            <ListSubheader className={classes.listSubheader}>
              Support
            </ListSubheader>
          }
        >
          <ListItem
            className={classes.listItem}
            component="a"
            href="https://devias.io/contact-us"
            target="_blank"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Customer support"
            />
          </ListItem>
        </List> */}
      </nav>
    );
  }
}

Sidebar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile
})

export default compose(withStyles(styles), connect(mapStateToProps))(Sidebar);