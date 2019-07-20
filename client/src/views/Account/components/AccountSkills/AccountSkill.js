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
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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

import { updatePersonalSkills } from '../../../../actions/profileActions';

class AccountSkills extends Component {
  constructor(props) {
    super(props)
    this.state = {
      skills: [],
      activeStep: 0,
      skillName: '',
      skillType: ''
    };
    
  }

  componentDidMount = () => {
    const { user } = this.props
    this.setProfileState(user);
  }

  componentWillReceiveProps = props => {
    const { user } = props;
    this.setProfileState(user);
  }

  setProfileState = user => {
    if(user && Object.entries(user).length !== 0) {
        this.setState({
            skills : user.skills ? user.skills : []
        });
    } else {
        this.setState({
            skills: []
        });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleNext = () => {
      this.setState({activeStep: this.state.activeStep + 1});
  }

  handleBack = () => {
      this.setState({activeStep: this.state.activeStep - 1});
  }
  
  handleReset = () => {
      this.setState({activeStep: 0});
  }

  handleSave = () => {
      let { skills } = this.state;

      let newSkill = {
          name: this.state.skillName,
          type: this.state.skillType
      };

      // Prevent duplicate entries
      if(skills.length === 0) skills.push(newSkill);
      else if(skills.indexOf(newSkill) === -1) skills.push(newSkill);

      this.props.updatePersonalSkills(skills);
      this.handleReset();
  }

  getSteps = () => {
    return ['Identify your skill', 'Explain your skill', 'Save to profile'];
  }

  getSkillTypes = () => {
      return ['','Personal', 'Professional'];
  }
  
  getStepContent = step => {
    switch (step) {
      case 0:
        return 'Is your skill personal or professional?';
      case 1:
        return 'Tell us what it is';
      case 2:
        return 'All finished, time to save';
      default:
        return 'Unknown step';
    }
  }

  getPersonalSkills = () => {
    return this.state.skills.filter(item => item.type === 'Personal');
  }

  getProfessionalSkills = () => {
    return this.state.skills.filter(item => item.type === 'Professional');
  }

  render() {
    const { classes, className } = this.props;
    const { activeStep } = this.state;
    const steps = this.getSteps();
    const skillTypes = this.getSkillTypes();
    const professional = this.getProfessionalSkills();
    const personal = this.getPersonalSkills();

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet
        
        className={rootClassName}
      >
        <PortletHeader>
          <PortletLabel
            subtitle="Update your personal and professional skills here"
            title="Skills"
          />
        </PortletHeader>
        <PortletContent noPadding>
            <Grid container direction="row">
                {professional && (
                    <Grid item className={classes.gridContainer} xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Typography variant="h4">Professional Skills Identified</Typography>
                        <GridList cellHeight={50} className={classes.gridList} cols={3}>
                            {professional.map(skill => {
                                return <GridListTile key={skill._id} cols={skill.cols || 1}>
                                    <GridListTileBar title={skill.name} />
                                </GridListTile>
                            })}
                        </GridList>
                    </Grid>
                    
                )}
                {personal && (
                    <Grid item className={classes.gridContainer} xl={6} lg={6} md={6} sm={12} xs={12}>
                        <Typography variant="h4">Personal Skills Identified</Typography>
                        <GridList cellHeight={50} className={classes.gridList} cols={3}>
                            {personal.map(skill => {
                                return <GridListTile key={skill._id} cols={skill.cols || 1}>
                                    <GridListTileBar title={skill.name} />
                                </GridListTile>
                            })}
                        </GridList>
                    </Grid>
                    
                )}
            </Grid>
            <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, i) => {
                    return (
                        <Step key={i}>
                            <StepLabel>{label}</StepLabel>
                            
                        </Step>
                    )
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={this.handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{this.getStepContent(activeStep)}</Typography>
                        <div className={classes.field}>
                            {activeStep === 0 && (
                                <TextField
                                    className={classes.textField}
                                    margin="dense"
                                    name="skillType"
                                    onChange={this.onChange}
                                    variant="outlined"
                                    select
                                    SelectProps={{ native: true }}
                                >
                                    {skillTypes.map(item => {
                                        return <option
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </option>
                                    })}
                                </TextField>
                            )}
                            {activeStep === 1 && (
                                <TextField
                                    className={classes.textField}
                                    helperText="Identify your skill"
                                    margin="dense"
                                    name="skillName"
                                    onChange={this.onChange}
                                    variant="outlined"
                                />
                            )}
                            {activeStep === 2 && (
                                <div>
                                    <Typography variant="h3">Your {this.state.skillType} skill is: {this.state.skillName} </Typography>
                                    <Typography variant="h5">If this information is correct, please click the finish button below </Typography>
                                </div>
                            )}
                        </div>
                        <div>
                        <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={activeStep === steps.length - 1 ? this.handleSave : this.handleNext}
                            className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                        </div>
                    </div>
                )}
            </div>
          </div>
          
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          {/* <Button
            color="primary"
            variant="contained"
            onClick={this.updateProfile}
          >
            Save skill details
          </Button> */}
        </PortletFooter>
      </Portlet>
    );
  }
}

AccountSkills.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object,
  updatePersonalSkills: PropTypes.func
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default compose(connect(mapStateToProps, {updatePersonalSkills}), withStyles(styles))(AccountSkills);