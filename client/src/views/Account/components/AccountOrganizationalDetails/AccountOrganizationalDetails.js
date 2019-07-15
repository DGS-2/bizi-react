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

import { updateOrganizationalDetails } from '../../../../actions/profileActions';

import { dgsSites } from '../../../../const/consts';

class AccountOrganizationalDetails extends Component {
    state = {
        wing: '',
        site: '',
        group: '',
        squadron: '',
        flight: '',
        team: '',
        office: ''
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
                wing: user.organization.wing ? user.organization.wing : '',
                site: user.organization.site ? user.organization.site : '',
                group: user.organization.group ? user.organization.group : '',
                squadron: user.organization.squadron ? user.organization.squadron : '',
                flight: user.organization.flight ? user.organization.flight : '',
                team: user.organization.team ? user.organization.team : '',
                office: user.organization.office ? user.organization.office : ''
            });
        } else {
            this.setState({
                wing: 'Please Update',
                site: 'Please Update',
                group: 'Please Update',
                squadron: 'Please Update',
                flight: 'Please Update',
                team: 'Please Update',
                office: 'Please Update'
            });
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    
    updateOrgDetails = () => {
        const { wing, site, group, squadron, flight, team, office } = this.state;
        let updateToBeMade = {
            wing: wing,
            site: site,
            group: group,
            squadron: squadron,
            flight: flight,
            team: team,
            office: office
        };

        this.props.updateOrganizationalDetails(updateToBeMade);
    }

    render() {
        const { classes, className, ...rest } = this.props;
        const { wing, site, group, squadron, flight, team, office } = this.state;
        
        const rootClassName = classNames(classes.root, className);

        return (
        <Portlet
            {...rest}
            className={rootClassName}
        >
            <PortletHeader>
            <PortletLabel
                subtitle="Update your organization infomration here"
                title="Organization"
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
                    helperText="Please provide the Wing you are assigned to"
                    label="Wing"
                    margin="dense"
                    required
                    name="wing"
                    onChange={this.onChange}
                    value={wing}
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    helperText="Please provide the Group you are assigned to"
                    label="Group"
                    margin="dense"
                    required
                    name="group"
                    onChange={this.onChange}
                    value={group}
                    variant="outlined"
                />
                </div>
                <div className={classes.field}>
                <TextField
                    className={classes.textField}
                    label="Select DGS Site"
                    margin="dense"
                    onChange={this.onChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={site}
                    name="site"
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
                    helperText="Please provide the Squadron you are assigned to"
                    label="Squadron"
                    margin="dense"
                    required
                    name="squadron"
                    onChange={this.onChange}
                    value={squadron}
                    variant="outlined"
                />
                </div>
                <div className={classes.field}>
                <TextField
                    className={classes.textField}
                    label="Flight"
                    helperText="Please provide the Flight you are assigned to"
                    margin="dense"
                    name="flight"
                    onChange={this.onChange}
                    value={flight}
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    label="Team"
                    helperText="Please provide the Team you are assigned to (if any)"
                    margin="dense"
                    name="team"
                    onChange={this.onChange}
                    value={team}
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    label="Office Symbol"
                    helperText="Please provide your Office symbol"
                    margin="dense"
                    value={office}
                    name="office"
                    onChange={this.onChange}
                    variant="outlined"
                />
                </div>
            </form>
            </PortletContent>
            <PortletFooter className={classes.portletFooter}>
            <Button
                color="primary"
                variant="contained"
                onClick={this.updateProfile}
            >
                Save organizational details
            </Button>
            </PortletFooter>
        </Portlet>
        );
    }
}

AccountOrganizationalDetails.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    profile: PropTypes.object,
    updateOrganizationalDetails: PropTypes.func
  };

const mapStateToProps = state => ({
    profile: state.profile
});

export default compose(withStyles(styles), connect(mapStateToProps, {updateOrganizationalDetails})) (AccountOrganizationalDetails)