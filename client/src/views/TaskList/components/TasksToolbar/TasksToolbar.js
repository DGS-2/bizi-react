import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Button } from '@material-ui/core';

// Shared components
import { DisplayMode, SearchInput } from '../../../../components';


// Component styles
import styles from './styles';

class TasksToolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFormOpen: false
    }
  }

  toggleForm = () => {
    this.setState({isFormOpen: !this.state.isFormOpen});
    this.props.toggleForm();
  }

  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={this.toggleForm}
          >
            { this.state.isFormOpen ? ("Cancel") : ("Add") }
          </Button>
          
        </div>
        
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search tasks"
          />
          <span className={classes.spacer} />
          <DisplayMode mode="grid" />
        </div>
      </div>
      
    );
  }
}

TasksToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TasksToolbar);
