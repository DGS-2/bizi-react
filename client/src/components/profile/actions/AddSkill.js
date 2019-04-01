import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSkill, getCurrentProfile } from "../../../actions/profileActions";
import Spinner from "../../shared/Spinner";
import { getSkills } from "../../../actions/skillActions"

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
  }

  componentDidMount = () => {
    this.props.getCurrentProfile()
    this.props.getSkills()
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
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
        </div>
        <div className="form-group">
          <button className="btn btn-primary btn-xl">Add Skill</button>
        </div>
      </form>
    ) 

    let skillList
    if(profile === null || Object.keys(profile) === 0){
      skillList = <Spinner />
    } else if(Object.keys(profile) !== 0){
      let userProfile = profile.profile
      if(userProfile){
        skillList = userProfile.skills.map(item => {
          return <div className="card" key={item._id}>
            <div className="card-header"></div>
            <div className="card-body"><h5 className="text-center">{item.name}</h5></div>
            <div className="card-footer"></div>
          </div>
        })
      }      
    }

    return (
      <div className="container">
        <div className="container no-gutters">
          <h6 className="text-center">Skills Indentified</h6>
          <div className="card-deck">
            { skillList }
          </div>
        </div>
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