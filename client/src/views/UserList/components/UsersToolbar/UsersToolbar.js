import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button, IconButton, TextField } from '@material-ui/core';

// Material icons
import {
  Delete as DeleteIcon
} from '@material-ui/icons';

// Shared components
import { SearchInput } from '../../../../components';

// Component styles
import styles from './styles';

const views = ['Standard', 'By Skill', 'By DGS Site', 'By Privilege'];

class UsersToolbar extends Component {
  changeView = e => {
    this.props.setTableView(e.target.value);
  }

  render() {
    const { classes, className, selectedUsers, profile } = this.props;

    const rootClassName = classNames(classes.root, className);

    let addUserButton = false;

    if(profile.profile) {
      if(profile.profile.personalInfo.privilege.level >= 8) {
        addUserButton = true;          
      }     
    }

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          {selectedUsers.length > 0 && (
            <IconButton
              className={classes.deleteButton}
              onClick={this.handleDeleteUsers}
            >
              <DeleteIcon />
            </IconButton>
          )}
          { addUserButton ? (<Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={this.props.toggleAddUser}
          >
            {this.props.isOpen ? 'Cancel' : 'Add User'}
          </Button>) : null}
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search user"
            onChange={this.props.filterUsers}
            name="filter"
          />
          <span className={classes.spacer} />
          <TextField
                className={classes.textField}
                label="Select table to view by"
                margin="dense"
                onChange={this.changeView}
                required
                select
                SelectProps={{ native: true }}
                name="view"
                variant="outlined">
                {views.map(option => (
                <option
                    key={option}
                    value={option}
                >
                    {option}
                </option>
                ))}
            </TextField>
        </div>
      </div>
    );
  }
}

UsersToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedUsers: PropTypes.array,
  profile: PropTypes.object,
  filterUsers: PropTypes.func
};

UsersToolbar.defaultProps = {
  selectedUsers: []
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default compose(withStyles(styles), connect(mapStateToProps))(UsersToolbar);
