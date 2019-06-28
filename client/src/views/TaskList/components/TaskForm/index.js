import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import compose from 'recompose/compose';
// Actions
import { addTask } from "../../../../actions/taskActions";


// Material Helpers
import { withStyles } from '@material-ui/core';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { WithContext as ReactTags } from 'react-tag-input';
import DatePicker from 'react-date-picker';
import { delimiters, priorityOptions } from "../../../../const/consts";
import { filterUsers } from "../../../../functions/functions";

// Component styles
import styles from './styles';

import {
    Portlet,
    PortletHeader,
    PortletLabel,
    PortletContent,
    PortletFooter
} from '../../../../components';

class TaskForm extends Component {
    constructor(props){
        super(props)    
        this.state = {
          title: '',
          description: '',
          classification: '',
          due: new Date(),
          to: '',
          from: '',
          message: '',
          tags: '',
          priority: '',
          errors: {},
          taggableUsers: [],
          suggestions: []
        }
        
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
    
        this.buildTask = this.buildTask.bind(this)
        this.setDueDate = this.setDueDate.bind(this)
      }
    
      componentWillReceiveProps(newProps) {
        if(newProps.errors) {
          this.setState({errors: newProps.errors})
        }
      }
    
      handleDelete = i => {
        const { taggableUsers } = this.state;
        this.setState({
          taggableUsers: taggableUsers.filter((tag, index) => index !== i),
        });
      }
    
      handleAddition = tag => {
          this.setState(state => ({ taggableUsers: [...state.taggableUsers, tag] }));
      }
    
      setDueDate = date => {
        this.setState({due: date})
      }
    
      onChange = e => {
        this.setState({[e.target.name]: e.target.value})
      } 
    
      onSubmit = e => {
        e.preventDefault();
        this.state.taggableUsers.forEach(user => {
          let to = this.props.profile.profiles.filter(u => u.user._id === user.id)[0]
          this.buildTask(to)
        })    
      }
    
      buildTask = user => {
        const newTask = {
          metaData: {
            title: this.state.title,
            description: this.state.description,
            classification: this.state.classification
          },
          creation: {
            from: {
              name: this.props.profile.profile.personalInfo.name.full,
              rank: this.props.profile.profile.personalInfo.rank.abreviated,
              id: this.props.auth.user.id
            },
            date: Date.now,
            due: this.state.due,
            to: {
              name: user.personalInfo.name.full,
              rank: user.personalInfo.rank.abreviated,
              id: user.user._id
            },
            priority: {
              level: this.state.priority
            }
          },
          messages: [{
            from: this.props.auth.user.id,
            message: this.state.message 
          }],
          tags: this.state.tags
        }
        
        this.props.addTask(newTask, this.props.history)
      }
      render() {
        const { taggableUsers } = this.state
        
        const { classes, profile } = this.props;

        const suggestions = filterUsers(profile.profiles)

        console.log({props: this.props, state: this.state, users: suggestions});

        let header = (
            <PortletHeader>
              <PortletLabel
                subtitle="Create your task and assign it"
                title="Create"
              />
            </PortletHeader>
          )
          
          let footer = (
            <PortletFooter className={classes.portletFooter}>
              <Button
                color="primary"
                variant="contained"
              >
                Create Task
              </Button>
            </PortletFooter>
          )
      
          let form = (
            <form
                autoComplete="off"
                noValidate
              >
                <div className={classes.field}>
                    <TextField 
                        className={classes.textField}
                        helperText="Please apply the proper classification for this task"
                        label="Task classification"
                        margin="dense"
                        required
                        fullWidth
                        value={this.state.classification}
                        variant="outlined"
                        name="classification"
                        onChange={this.onChange}
                    />
                </div>
                <div className={classes.field}>
                <TextField
                    className={classes.textField}
                    helperText="Please assign a title to this task"
                    label="Task name"
                    margin="dense"
                    required
                    fullWidth
                    value={this.state.title}
                    variant="outlined"
                    name="title"
                    onChange={this.onChange}
                  />
                </div>
                <div className={classes.field}>
                  <TextField
                    className={classes.textField}
                    label="Task description"
                    margin="dense"
                    required
                    multiline
                    fullWidth
                    value={this.state.description}
                    variant="outlined"
                    name="description"
                    onChange={this.onChange}
                  />
                </div>
                <div className={classes.field}>
                  <TextField 
                    name="message"
                    value={this.state.message}
                    fullWidth
                    multiline
                    margin="dense"
                    label="Start message thread"
                    variant="outlined"
                    className={classes.textField}
                  />
                </div>
                <div className={classes.field}>
                    <TextField
                        className={classes.textField}
                        label="Select a Priority"
                        margin="dense"
                        name="priority"
                        onChange={this.onChange}
                        required
                        select
                        SelectProps={{ native: true }}
                        value={this.state.priority}
                        variant="outlined">
                        {priorityOptions.map(option => (
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
                   
                        <ReactTags 
                            name="to"
                            placeholder="Start typing to assign task to members"              
                            inputFieldPosition="inline"
                            tags={taggableUsers}
                            suggestions={suggestions}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            delimiters={delimiters}
                            autocomplete={true}
                            autofocus={false}
                            minQueryLength={1}
                            classNames={{
                              tags: classes.ReactTags__tags,
                              tagInput: classes.ReactTags__tagInput,
                              tagInputField: classes.ReactTags__tagInputField,
                              selected: classes.ReactTags__selected,
                              tag: classes.ReactTags__selected,
                              remove: classes.ReactTags__selected,
                              suggestions: classes.ReactTags__suggestions
                            }}
                        />
                    
                </div>
                <div className={classes.field}>
                    <DatePicker
                        onChange={this.setDueDate}
                        value={this.state.due}
                        className="form-controlnodemon"
                    />
                </div>
              </form>
          )
      
          let portlet = (
            <Portlet>
              {header}
            <PortletContent noPadding>
              {form}
            </PortletContent>
            {footer}
          </Portlet>);

          return portlet;
      }
}

TaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
    filterUsers: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    profile: state.profile
})

export default compose(withStyles(styles), withRouter, connect(mapStateToProps, { addTask, filterUsers })) (TaskForm);