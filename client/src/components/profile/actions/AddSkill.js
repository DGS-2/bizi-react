import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSkill, getCurrentProfile } from "../../../actions/profileActions";

import { WithContext as ReactTags } from 'react-tag-input';

import { getSkills } from "../../../actions/skillActions"

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class AddSkill extends Component {
  constructor(props){
    super(props)
    this.state = {
      skillName: '',
      displayName: '',
      showForm: false,
      suggestions: [],
      tags: []
    }

    this.toggleFormState = this.toggleFormState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);

    this.changeSuggestionState = this.changeSuggestionState.bind(this);
  }

  componentDidMount = () => {
    this.props.getCurrentProfile()
    this.props.getSkills()
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDelete(i) {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
      this.setState(state => ({ tags: [...state.tags, tag] }));
  }

  changeSuggestionState = items => {
    // this.setState({suggestions: items})
    console.log(this.props.skills)
  }

  onSubmit = e => {
    e.preventDefault()

    let newSkill = {
      skillName: this.state.skillName,
      displayName: this.state.displayName
    }

    this.props.addSkill(newSkill)
  }

  toggleFormState = () => {
    this.setState({
      showForm: !this.state.showForm,
      displayName: `${this.props.profile.profile.personalInfo.rank.abreviated} ${this.props.profile.profile.personalInfo.name.full}`
    })
  }
  
  render() {
    const { auth, profile, skills } = this.props

    const form = (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <input type="text" className="form-control form-control-user" name="skillName" onChange={this.onChange} value={this.state.skillName} placeholder="Enter the name of your skill..." />
          {/* <ReactTags 
            name="skill"
            placeholder="Start typing to assign task to members"              
            inputFieldPosition="inline"
            tags={this.state.tags}
            suggestions={this.state.suggestions}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            delimiters={delimiters}
            autocomplete={true}
            autofocus={false}
          /> */}
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-xl">Add Skill</button>
        </div>
      </form>
    ) 

    return (
      <div className="container">
        <div className="row p-3">
        { !this.state.showForm ? (
            <button className="btn btn-primary btn-xl" onClick={this.toggleFormState}>Add Skill</button>
          ) : (
            <button className="btn btn-outline-danger btn-xl" onClick={this.toggleFormState}>Nevermind</button>
          ) }
        </div>
        { this.state.showForm ? form : null }
      </div>
    )
  }
}

AddSkill.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  addSkill: PropTypes.func.isRequired,
  getSkills: PropTypes.func.isRequired,
  skills: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  skills: state.skills
})

export default connect(mapStateToProps, {addSkill, getCurrentProfile, getSkills})(AddSkill)