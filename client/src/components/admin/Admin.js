import React, { Component } from 'react'
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getProfiles } from "../../actions/profileActions"

class Admin extends Component {
  constructor( props ){
    super( props )
    this.state = {
      editUser: false,
      userId: '',
      user: '',
      input: '',
      users: []
    }
    
    this.onChange = this.onChange.bind(this)
    this.mapUsers = this.mapUsers.bind(this)
    this.getUserObj = this.getUserObj.bind(this)
  }

  componentDidMount = () => {
    this.props.getProfiles()
  }

  componentWillReceiveProps = props => {
    this.mapUsers(props)
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })    
  }

  mapUsers = props => {
    const { profile } = props
    const { viewDepth } = props.location.state
    let users

    if( profile.profiles !== null && profile.profile !== null ){ 
      if( viewDepth === "all" ){
        users = profile.profiles.map(p => {
          return this.getUserObj(p)
        })
      } else if( viewDepth === "squadron" ){
        users = profile.profiles.filter(p => p.organization.squadron === profile.profile.organization.squadron).map(p => {
          return this.getUserObj(p)
        })
      }  else if( viewDepth === "group" ){
        users = profile.profiles.filter(p => p.organization.group === profile.profile.organization.group).map(p => {
          return this.getUserObj(p)
        })
      }  
    }    
    this.setState({ users: users })
  }

  getUserObj = p => {
    return { 
      name: `${p.personalInfo.rank.abreviated} ${p.personalInfo.name.full}`, 
      privilege: p.personalInfo.privilege ? p.personalInfo.privilege.title : '', 
      squadron: p.organization.squadron ? p.organization.squadron : '', 
      flight: p.organization.flight ? p.organization.flight : '', 
      id: p.user._id 
    }
  }

  render() {      
    return (
      <div className="col-8 mx-auto">
        <h1 className="text-center text-white">Admin Panel</h1>
        <div className="container-fluid py-3">
          <input type="text" name="input" value={this.state.input} onChange={this.onChange} placeholder="Start typing to filter users..." className="form-control"/>
        </div>
        <div className="container-fluid">
          <table className="table table-bordered text-white rounded">
            <thead className="text-center">
              <tr>
                <th>Rank/Name</th>
                <th>Privilege Level</th>
                <th>Squadron</th>
                <th>Flight</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { this.state.users ? this.state.users.filter(u => {
                if( this.state.input === '' ) return u
                else if( u.name.toLowerCase().includes( this.state.input.toLowerCase() ) && this.state.input !== '' ) return u.name.toLowerCase().includes( this.state.input.toLowerCase() )
                else if( u.squadron.toLowerCase().includes( this.state.input.toLowerCase() ) && this.state.input !== '' ) return u.squadron.toLowerCase().includes( this.state.input.toLowerCase() )
                else if( u.flight.toLowerCase().includes( this.state.input.toLowerCase() ) && this.state.input !== '' ) return u.flight.toLowerCase().includes( this.state.input.toLowerCase() )
              }).map(user => {
                return <tr key={user.id}>
                  <td>{ user.name }</td>
                  <td>{ user.privilege ? user.privilege : null }</td>
                  <td>{ user.squadron }</td>
                  <td>{ user.flight }</td>
                  <td><Link className="btn btn-xs btn-primary" to={{pathname: `/profile/${user.id}`, state: { admin: true } }} >Edit</Link></td>
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
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect( mapStateToProps, { getProfiles } )( Admin )