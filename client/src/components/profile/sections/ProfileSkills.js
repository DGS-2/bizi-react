import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addSkill, getCurrentProfile } from "../../../actions/profileActions";
import Spinner from "../../shared/spinner/Spinner";
import { getSkills } from "../../../actions/skillActions"

class ProfileSkills extends Component {
  constructor(props){
    super(props)
    this.state = {
      skillName: '',
      displayName: '',
      showForm: false,
      suggestions: [],
      tags: [],
      userSkills: null
    }

    this.toggleFormState = this.toggleFormState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount = () => {
    this.props.getCurrentProfile()
    this.props.getSkills()
  }

  componentWillReceiveProps = ( props, state ) => {
    const { profile, skills } = props

    let arr = []

    if(skills.skills) skills.skills.forEach(skill => {
      skill.claimedBy.forEach(item => {
        if( item.id === profile.profile.user._id ) arr.push({ name: skill.name })
      })
    })

    if( arr.length > 0 ) this.setState({ userSkills: arr })
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
    if( this.state.userSkills !== null ) skillList = this.state.userSkills.map((item, i) => {
      return <div className="card bg-light" key={i}>
        <div className="card-body"><h5 className="text-center text-dark">{item.name}</h5></div>
      </div>
    })

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

ProfileSkills.propTypes = {
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

export default connect(mapStateToProps, {addSkill, getCurrentProfile, getSkills})(ProfileSkills)