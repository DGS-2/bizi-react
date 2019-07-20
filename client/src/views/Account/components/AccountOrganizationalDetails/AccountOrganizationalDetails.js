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

// import { dgsSites } from '../../../../const/consts';

import { getSquadrons } from '../../../../actions/organizationActions';

class AccountOrganizationalDetails extends Component {
    state = {
        squadron: '',
        flight: '',
        team: '',
        office: '',
        squadrons: [],
        selectedSquadron: ''
    }

    componentDidMount = () => {
        const { user } = this.props;
        this.setProfileState(user);
        this.props.getSquadrons();
    }
    
    componentWillReceiveProps = props => {
        const { user, org } = props;
        this.setProfileState(user);
        this.setState({squadrons: org.squadrons});
    }

    setProfileState = user => {
        if(user && Object.entries(user).length !== 0) {
            let squadron = user.organization.organization.filter(item => item.level === 'squadron')[0];
            let flight = user.organization.organization.filter(item => item.level === 'flight')[0];
            let team = user.organization.organization.filter(item => item.level === 'team')[0];
            
            this.setState({
                squadron: squadron ? squadron : '',
                flight: flight ? flight.name : '',
                team: team ? team.name : '',
                office: flight ? flight.abreviated : ''
            });
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    
    updateOrgDetails = () => {
        const { selectedSquadron, squadron, flight, office } = this.state;
        let updateToBeMade = {
            org: selectedSquadron ? selectedSquadron : squadron._id,
            flight: flight,
            office: office
        };
        
        /*
            TODO add parent child relationship
        */
       console.log(updateToBeMade);
        this.props.updateOrganizationalDetails(updateToBeMade);
    }

    render() {
        const { classes, className, ...rest } = this.props;
        const { squadron, flight, team, office, squadrons } = this.state;
        
        const rootClassName = classNames(classes.root, className);

        return (
        <Portlet
            
            className={rootClassName}
        >
            <PortletHeader>
            <PortletLabel
                subtitle="Update your organization information here"
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
                    helperText="Please provide the Squadron you are assigned to"
                    label="Squadron"
                    margin="dense"
                    required
                    select
                    SelectProps={{ native: true }}
                    name="selectedSquadron"
                    onChange={this.onChange}
                    value={squadron._id}
                    variant="outlined">
                        <option></option>
                    {squadrons && squadrons.map(option => (
                        <option
                            key={option._id}
                            value={option._id}
                        >
                            {option.name}
                        </option>
                    ))}
                </TextField>
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
                    label="Office Symbol"
                    helperText="Please provide your Office symbol"
                    margin="dense"
                    value={office}
                    name="office"
                    onChange={this.onChange}
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
                </div>
            </form>
            </PortletContent>
            <PortletFooter className={classes.portletFooter}>
            <Button
                color="primary"
                variant="contained"
                onClick={this.updateOrgDetails}
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
    updateOrganizationalDetails: PropTypes.func,
    getSquadrons: PropTypes.func
  };

const mapStateToProps = state => ({
    profile: state.profile,
    org: state.org
});

export default compose(connect(mapStateToProps, {updateOrganizationalDetails, getSquadrons}), withStyles(styles)) (AccountOrganizationalDetails)