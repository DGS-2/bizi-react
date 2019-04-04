import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addTask } from "../../../actions/taskActions";
import TextFieldGroup from "../../shared/text-field/TextFieldGroup";
import TextAreaFieldGroup from "../../shared/text-area/TextAreaFieldGroup";
import SelectListGroup from "../../shared/select-group/SelectListGroup";
import { WithContext as ReactTags } from 'react-tag-input';
import DatePicker from 'react-date-picker';
import { delimiters, priorityOptions } from "../../../const/consts";
import { filterUsers } from "../../../functions/functions";

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
    const { errors, taggableUsers } = this.state
    const { profile } = this.props
    
    const suggestions = filterUsers(profile.profiles)
    
    return (
      <div>
        <form className="user" noValidate onSubmit={this.onSubmit} autoComplete="off">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12 col-xl-12">
            <TextFieldGroup 
              name="title"
              placeholder="Task Title"
              type="text"
              value={this.state.title}
              onChange={this.onChange}
              errors={ errors.title }
              info="Please assign a title to this task"
            />
          </div>
          <hr />
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12 col-xl-12">
            <TextFieldGroup 
              name="classification"
              placeholder="Task Classification"
              type="text"
              value={this.state.classification}
              onChange={this.onChange}
              errors={ errors.title }
              info="Please classify this task properly"
            />
          </div>
          <hr />
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12 col-xl-12">
            <TextAreaFieldGroup 
              name="description"
              placeholder="Task Description"
              value={this.state.description}
              onChange={this.onChange}
              errors={ errors.description }
              info="Please provide a description for the task that is assigned"
            />
          </div>
          <hr />
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12 col-xl-12">
            <TextAreaFieldGroup 
              name="message"
              placeholder="Start Message Thread"
              value={this.state.message}
              onChange={this.onChange}
              errors={ errors.message }
              info="Leave a message to the person the task will be assigned"
            />
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12 col-xl-12">
            <SelectListGroup 
              placeholder="Priority Level"
              name="priority"
              value={this.state.priority}
              onChange={this.onChange}
              options={priorityOptions}
              error={errors.priority}
              info="Please select a priority level for this task"
            />
          </div>
          <hr />
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12 col-xl-12">
            <div className="form-group">
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
            />
            </div>
            <small className="form-text text-muted">Tag users this task should be assigned to</small>
          </div>
          
          <hr />
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12 col-xl-12">
            <div className="form-group">
              <DatePicker
                onChange={this.setDueDate}
                value={this.state.due}
                className="form-controlnodemon"
              />
              <small className="form-text text-muted">Select a due date for the task</small>
            </div>
          </div>
          <hr />
          <div>
            <button className="btn btn-primary btn-user btn-block">
              Create Task
            </button>
          </div>
        </form>
      </div>
    )
  }
}

TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
  filterUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
})

export default connect(mapStateToProps, { addTask, filterUsers })(withRouter(TaskForm));