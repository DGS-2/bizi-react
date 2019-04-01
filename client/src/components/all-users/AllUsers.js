import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../shared/Spinner";
import { getProfiles } from "../../actions/profileActions";
import { Link } from "react-router-dom";

class AllUsers extends Component {
  constructor(props){
    super(props)
    this.state = {
      input: ''
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  componentDidMount = () => {
    this.props.getProfiles()
  }
  render() {
    const { profile } = this.props

    const allProfiles = profile.profiles ? profile.profiles : []

    let profiles = allProfiles.filter(p => {
        if(this.state.input === '') return p
        else if(p.personalInfo.name.full.toLowerCase().includes(this.state.input.toLowerCase())) 
          return p.personalInfo.name.full.toLowerCase().includes(this.state.input.toLowerCase())    
      })

    let content
    if(profile === null || Object.keys(profile) === 0) {
      content = <Spinner />
    } else if(profile.profiles !== null) {
      

      content = <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Member</th>
            <th>Squadron</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        { profiles.map(user => {
          return <tr key={user._id}>
            <td>{ user.personalInfo.rank.abreviated } { user.personalInfo.name.full }</td>
            <td>{ user.organization.squadron }</td>
            <td>{ user.contactInfo.email.unclass }</td>
            <td><Link className="btn btn-outline-primary" to={`/user/${user.user._id}`}>Visit Profile</Link></td>
          </tr>
        }) }
        </tbody>
      </table>
    }

    return (
      <div className="container">
        <div className="row mb-3">
          <input type="text" className="form-control form-control-user" placeholder="Start Typing to Filter Users by Name..." name="input" onChange={this.onChange} value={this.state.input} />
        </div>
        { content }
      </div>
    )
  }
}

AllUsers.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(AllUsers)