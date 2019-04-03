import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSubTasks, addTask } from "../../actions/taskActions";
import TextFieldGroup from "../shared/TextFieldGroup";
import TextAreaFieldGroup from "../shared/TextAreaFieldGroup";
import SelectListGroup from "../shared/SelectListGroup";
import { WithContext as ReactTags } from 'react-tag-input';
import DatePicker from 'react-date-picker';
import { delimiters } from "../../const/consts";
import { filterOutCurrentUser } from "../../functions/functions";

class SubTaskForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: this.props.task.metaData.title || '',
      description: this.props.task.metaData.description || '',
      classification: this.props.task.metaData.classification || '',
      due: this.props.task.creation.due,
      priority: '',
      message: '',
      taggedUsers: [],
      errors: {}
    }
    
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.buildTask = this.buildTask.bind(this)

    this.handleAddition = this.handleAddition.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.setDueDate = this.setDueDate.bind(this)
  }  

  handleDelete(i) {
    const { taggedUsers } = this.state;
    this.setState({
      taggedUsers: taggedUsers.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
      this.setState(state => ({ taggedUsers: [...state.taggedUsers, tag] }));
  }

  setDueDate = date => {
    this.setState({due: date})
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()
    let subTasking = {}
    subTasking.subTasks = []
    this.state.taggedUsers.forEach(user => {
      let to = this.props.profile.profiles.filter(u => u.user._id === user.id)[0]
      subTasking.subTasks.push(this.buildTask(to))
    })
    
    this.props.createSubTasks(this.props.task._id, subTasking)
  }

  buildTask = user => {
    const subTask = {
      metaData: {
        title: this.state.title,
        description: this.state.description,
        classification: this.state.classification
      },
      creation: {
        from: {
          id: this.props.profile.profile.user._id,
          rank: this.props.profile.profile.personalInfo.rank.abreviated,
          name: this.props.profile.profile.personalInfo.name.full
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
        from: this.props.profile.profile.user._id,
        message: this.state.message 
      }]
    }

    // this.props.addTask( subTask )

    return subTask
  }

  render() {
    const { errors, taggedUsers } = this.state
    const { profile } = this.props

    const suggestions = filterOutCurrentUser(profile.profiles,  profile.profile.user._id)

    const options = [
      { label: '* Select Priority Level', value: 0 },
      { label: 'Critical', value: 'Critical' },
      { label: 'Important', value: 'Important' }
    ]

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
              options={options}
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
              tags={taggedUsers}
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

SubTaskForm.propTypes = {
  profile: PropTypes.object.isRequired,
  createSubTasks: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { createSubTasks, addTask })(SubTaskForm)