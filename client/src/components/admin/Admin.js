import React, { Component } from 'react'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import SelectListGroup from "../shared/select-group/SelectListGroup"
import { privilegeLevels } from "../../const/consts"

class Admin extends Component {
  constructor(props){
    super(props)
    this.state = {
      editUser: false,
      userId: '',
      user: '',
      input: ''
    }

    this.onChange = this.onChange.bind(this)
    this.setUser = this.setUser.bind(this)
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  setUser = user => {
    console.log(user)
  }

  render() {
    const { profile } = this.props
    let users
    if( profile.profiles !== null ){
      users = profile.profiles.filter(p => {
        if(this.state.input === '') return p
        else if(p.personalInfo.name.full.toLowerCase().includes(this.state.input.toLowerCase())) 
          return p.personalInfo.name.full.toLowerCase().includes(this.state.input.toLowerCase()) 
      })
    }
    
    return (
      <div className="col-8 mx-auto">
        <h1 className="text-center text-white">Admin Panel</h1>
        <div className="container-fluid py-3">
          <input type="text" name="input" value={this.state.input} onChange={this.onChange} placeholder="Start typing to filter users..." className="form-control"/>
        </div>
        <div className="container-fluid">
          <table className="table table-bordered text-white rounded">
            <thead>
              <tr>
                <th>Rank/Name</th>
                <th>Privilege Level</th>
                <th>Squadron</th>
                <th>Flight</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { users ? users.map(user => {
                return <tr key={user.user._id}>
                  <td>{ user.personalInfo.rank.abreviated } { user.personalInfo.name.full }</td>
                  <td>{ user.personalInfo.privilege ? user.personalInfo.privilege.title : null }</td>
                  <td>{ user.organization.squadron }</td>
                  <td>{ user.organization.flight }</td>
                  <td><Link className="btn btn-xs btn-primary" to={{pathname: `/profile/${user.user._id}`, state: { admin: true } }} >Edit</Link></td>
                </tr>
              }) : null }
            </tbody>            
          </table>
        </div>
      </div>
    )
  }
}

Admin.propTypes = {
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps)(Admin)