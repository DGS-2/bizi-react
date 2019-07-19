import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';

// Shared helpers
import { getInitials } from '../../../../../helpers';

// Component styles
import styles from '../styles';

class StandardTable extends Component {
  handleSelectAll = event => {
    const { users, onSelect } = this.props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    this.setState({ selectedUsers });

    onSelect(selectedUsers);
  };

  handleSelectOne = (event, id) => {
    const { onSelect } = this.props;
    const { selectedUsers } = this.state;

    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    this.setState({ selectedUsers: newSelectedUsers });

    onSelect(newSelectedUsers);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, users, activeTab, selectedUsers, rowsPerPage, page } = this.props;

    return (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={this.handleSelectAll}
                    />
                    Name
                  </TableCell>
                  <TableCell align="left">Rank</TableCell>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Privilege</TableCell>
                  <TableCell align="left">Organization</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .filter(user => {
                    if (activeTab === 1) {
                      return !user.returning;
                    }

                    if (activeTab === 2) {
                      return user.returning;
                    }

                    return user;
                  })
                  .slice(0, rowsPerPage)
                  .map(user => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.user._id}
                      selected={selectedUsers.indexOf(user.user._id) !== -1}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          <Checkbox
                            checked={selectedUsers.indexOf(user.user._id) !== -1}
                            color="primary"
                            onChange={event =>
                              this.handleSelectOne(event, user.user._id)
                            }
                            value="true"
                          />
                          <Avatar
                            className={classes.avatar}
                            src={user.avatarUrl}
                          >
                            {getInitials(user.user.name)}
                          </Avatar>
                          <Link to="#">
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {user.user.name}
                            </Typography>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell >
                        {user.rank.abreviated}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.user._id}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.contactInfo.email.unclass}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.permission.role_name}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {(user.organization.wing + "/" + user.organization.group + "/" + user.organization.squadron + "/" + user.organization.flight)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
    );
  }
}

StandardTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  users: PropTypes.array.isRequired,
  toggleAddUser: PropTypes.func,
  view: PropTypes.string,
  rowsPerPage: PropTypes.number,
  activeTab: PropTypes.number
};

StandardTable.defaultProps = {
  users: [],
  onSelect: () => {},
  onShowDetails: () => {}
};

export default withStyles(styles)(StandardTable);