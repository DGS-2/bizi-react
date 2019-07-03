import React, { Component } from 'react';

// Externals
import PropTypes from 'prop-types';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import { Grid } from '@material-ui/core';

// Shared layouts
import { Dashboard as DashboardLayout } from '../../layouts';

// Custom components
import {
  TaskList
} from './components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4,
    height: '100%'
  },
  item: {
    height: '100%'
  }
});

class DashboardView extends Component {
  render() {
    const { classes } = this.props;
    
    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}> 
          <Grid
            container
            spacing={4}
          >
            
            <Grid
              item
              lg={4}
              md={6}
              xl={3}
              xs={12}
            >
              <TaskList className={classes.item} />
            </Grid>
            
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

DashboardView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DashboardView);