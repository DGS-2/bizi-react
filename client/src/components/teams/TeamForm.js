import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createTeam } from "../../actions/teamActions";
import { getProfiles } from "../../actions/profileActions";

import TextFieldGroup from "../shared/TextFieldGroup";
import TextAreaFieldGroup from "../shared/TextAreaFieldGroup";

import { WithContext as ReactTags } from 'react-tag-input';
const KeyCodes = {
  comma: 188,
  enter: 13,
};
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];


class TeamForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      invitations: [],
      suggestions: '',
      name: '',
      description: '',
      messageThreads: []
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.handleAddition = this.handleAddition.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.filterTaggableUsers = this.filterTaggableUsers.bind(this)
  }

  componentDidMount = () => {
    this.props.getProfiles()
  }

  handleDelete(i) {
    const { invitations } = this.state;
    this.setState({
      invitations: invitations.filter((tag, index) => index !== i),
    });
  }

  handleAddition(tag) {
      this.setState(state => ({ invitations: [...state.invitations, tag] }));
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    let invitations = this.state.invitations.map(item => {
      return { id: item.id, displayName: item.text }
    })

    let initMember = {
      id: this.props.profile.profile.user._id,
      displayName: `${this.props.profile.profile.personalInfo.rank.abreviated} ${this.props.profile.profile.personalInfo.name.full}`
    }


    const team = {
      teamName: this.state.name,
      teamDescription: this.state.description,
      teamCreator: initMember,      
      teamInvitations: invitations,
      teamMembers: [initMember],
      teamMessageThread: []
    }

    this.props.createTeam(team)
  }

  filterTaggableUsers = () => {
    let users = this.props.profile.profiles? this.props.profile.profiles : []
    let arr = []
    users.forEach(user => {
      arr.push({id: user.user._id, text: `${user.personalInfo.rank.abreviated} ${user.personalInfo.name.full}`})
    })
    
    return arr
  }

  render() {
    const { invitations } = this.state
    const suggestions = this.filterTaggableUsers()

    return (
      <div className="card">
        <div className="card-header bg-dark">
          <h5 className="text-center text-white">Create a New Team</h5>
        </div>
        <div className="card-body bg-dark text-white">
          <form className="user" noValidate onSubmit={this.onSubmit} autoComplete="off">
            <div className="form-group">
              <TextFieldGroup 
                name="name"
                type="text"
                placeholder="Name of the new team..."
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <TextAreaFieldGroup
                name="description" 
                placeholder="Describe the function of the team..."
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <ReactTags 
                name="to"
                placeholder="Start typing to assign task to members"              
                inputFieldPosition="inline"
                tags={ invitations }
                suggestions={ suggestions }
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
                delimiters={delimiters}
                autocomplete={true}
                autofocus={false}
                minQueryLength={1}
              />
            </div>
            <div className="form-group">
              <div className="row">
                <button className="btn btn-outline-light btn-xl mx-auto">Create Team</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

TeamForm.propTypes = {
  profile: PropTypes.object.isRequired,
  createTeam: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { createTeam, getProfiles })(TeamForm)