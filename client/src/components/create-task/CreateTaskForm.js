import React, { Component } from 'react'

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { addTask } from "../../actions/taskActions"

import TextFieldGroup from "../shared/TextFieldGroup"
import TextAreaFieldGroup from "../shared/TextAreaFieldGroup";

import { WithContext as ReactTags } from 'react-tag-input';
import DatePicker from 'react-date-picker';

const KeyCodes = {
  comma: 188,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];

class CreateTaskForm extends Component {
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
      errors: {},
      taggableUsers: [],
      suggestions: this.filterTaggableUsers(this.props.profile.profiles)
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.filterTaggableUsers = this.filterTaggableUsers.bind(this)
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);

    this.buildTask = this.buildTask.bind(this)
    this.setDueDate = this.setDueDate.bind(this)
  }

  handleDelete(i) {
    const { taggableUsers } = this.state;
    this.setState({
      taggableUsers: taggableUsers.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
      this.setState(state => ({ taggableUsers: [...state.taggableUsers, tag] }));
  }

  handleDrag(tag, currPos, newPos) {
      const tags = [...this.state.taggableUsers];
      const newTags = tags.slice();

      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);

      // re-render
      this.setState({ taggableUsers: newTags });
  }

  setDueDate = date => {
    this.setState({due: date})
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  filterTaggableUsers = users => {

    let arr = []
    users.forEach(user => {
      arr.push({id: user.user._id, text: `${user.personalInfo.rank.abreviated} ${user.personalInfo.name.full}`})
    })

    return arr
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
        }
      },
      messages: [{
        from: this.props.auth.user.id,
        message: this.state.message 
      }],
      tags: this.state.tags
    }

    // console.log(newTask)
    this.props.addTask(newTask, this.props.history)
  }

  render() {
    const { errors, taggableUsers, suggestions } = this.state
    
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
            />
          </div>
          <hr />
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12 col-xl-12">
            <div className="container">
            <ReactTags 
              name="to"
              placeholder="Start typing to assign task to members"
              
              inputFieldPosition="inline"
              tags={taggableUsers}
              suggestions={suggestions}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition}
              handleDrag={this.handleDrag}
              delimiters={delimiters}
              autocomplete={true}
              autofocus={false}
            />
            </div>
          </div>
          <hr />
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12 col-xl-12">
            <div className="container">
              <DatePicker
                onChange={this.setDueDate}
                value={this.state.due}
                className="form-controlnodemon"
              />
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

CreateTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile
})

export default connect(mapStateToProps, { addTask })(withRouter(CreateTaskForm));