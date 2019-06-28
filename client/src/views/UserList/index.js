import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { CircularProgress, Typography } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from '../../layouts';

// Shared services
// import { getUsers } from 'services/user';
import { getProfiles } from "../../actions/profileActions";

// Custom components
import { UsersToolbar, UsersTable } from './components';

// Component styles
import styles from './styles';

class UserList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    users: [],
    selectedUsers: [],
    error: null
  };

  async pullProfiles() {
    try {
      this.setState({ isLoading: true }); 
      const { profile } = this.props;
      
      if (this.signal) {
        if(profile.profiles !== null) {
          
          this.setState({
            isLoading: false,
            users: profile.profiles,
            selectedUsers: [profile.profile]
          });
        }
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

  componentDidMount() {
    this.signal = true;
    
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSelect = selectedUsers => {
    this.setState({ selectedUsers });
  };

  renderUsers(users) {
    const { classes, profile } = this.props;
    const { isLoading, error } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (profile.profiles) {
      if(profile.profiles.length === 0) return <Typography variant="h6">There are no users</Typography>;
    }

    return (
      <UsersTable
        //
        onSelect={this.handleSelect}
        users={profile.profiles !== null ? profile.profiles : []}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { selectedUsers } = this.state;
    
    return (
      <DashboardLayout title="Users">
        <div className={classes.root}>
          <UsersToolbar selectedUsers={selectedUsers} />
          <div className={classes.content}>{this.renderUsers()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

UserList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default compose(withStyles(styles), connect(mapStateToProps, {getProfiles}) )(UserList);