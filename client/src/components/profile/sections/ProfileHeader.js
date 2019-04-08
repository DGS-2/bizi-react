import React, { Component } from 'react'
import PropTypes from "prop-types";
import { squadrons } from "../../../const/consts"
import { editProfile } from "../../../actions/profileActions";
import { connect } from 'react-redux';

class ProfileHeader extends Component {
  constructor(props){
    super(props)
    this.state = {
      rank: this.props.profile.personalInfo.rank.abreviated || '',
      name: this.props.profile.personalInfo.name.full || '',
      location: this.props.profile.organization.squadron || '',
      position: '',
      contact: {
        email: this.props.profile.contactInfo.email.unclass || '',
        phone: ''
      },
      editRankAndName: false,
      editContactInfo: false
    }

    this.editRankAndName = this.editRankAndName.bind(this)
    this.changeRankAndName = this.changeRankAndName.bind(this)

    this.editContactInfo = this.editContactInfo.bind(this)
    this.changeContactInfo = this.changeContactInfo.bind(this)

    this.onChange = this.onChange.bind(this)
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  editRankAndName = () => {
    this.setState({ editRankAndName: !this.state.editRankAndName })
  }

  changeRankAndName = e => {
    e.preventDefault();
    const { profile } = this.props
    profile.personalInfo.name.full = this.state.name
    profile.personalInfo.name.first = this.state.name.split(' ')[0]
    profile.personalInfo.name.last = this.state.name.split(' ')[1]
    profile.personalInfo.rank.abreviated = this.state.rank
    
    // Save profile
    this.props.editProfile(profile.user, profile)
  }

  editContactInfo = () => {
    this.setState({ editContactInfo: !this.state.editContactInfo })
  }

  changeContactInfo = e => {
    e.preventDefault()
    const { profile } = this.props
    profile.contactInfo.email.unclass = this.state.contact.email
    profile.contactInfo.phone = { unclass: this.state.contact.phone}
    
    // Save profile
    this.props.editProfile(profile.user, profile)
  }

  render() {
    const { admin } = this.props

    let header, contactInfo
    if( admin ) {
      header = <h6 className="text-white">{ this.state.rank } { this.state.name } <button className="mr-auto" onClick={this.editRankAndName}><i className="fas fa-edit text-success"></i></button></h6>
      contactInfo = <form onSubmit={this.changeContactInfo}>
        <ul className="list-group">
          <li className="list-group-item text-left">
            <button onClick={this.editContactInfo} type="button"><i className="fas fa-edit text-success"></i></button>  
          </li>
          <li className='list-group-item text-left'>
            <strong>Squadron:</strong> { this.state.editContactInfo ? <select name="location" value={this.state.location} onChange={this.onChange} className="form-control">
              { squadrons.map(item => {
                return <option value={item.value} key={item.label}>{item.label}</option>
              }) }
            </select> : this.state.location }
          </li>
          <li className='list-group-item text-left'>
            <strong>Duty Position:</strong> { this.state.editContactInfo ? <input type="text" name="position" value={this.state.position} onChange={this.onChange} className="form-control" /> : this.state.position }
          </li>
          <li className='list-group-item text-left'><strong>Contact Info:</strong>
            <ul className="list-unstyled">
              <li className="list-item">Email:&nbsp;  
                { this.state.editContactInfo ? <input type="text" name="email" value={this.state.contact.email} onChange={this.onChange} className="form-control" /> : this.state.contact.email }
              </li>
              <li className="list-item">Phone:&nbsp; 
                { this.state.editContactInfo ? <input type="text" name="phone" value={this.state.contact.phone} onChange={this.onChange} className="form-control" /> : this.state.contact.phone }
              </li>
            </ul>
          </li>
          { this.state.editContactInfo ? <li className="list-group-item"><input type="submit" value="Save" className="btn btn-success form-control"/></li> : null }
        </ul>
      </form>
    } else {
      header = <h6 className="text-white">{ this.state.rank } { this.state.name }</h6>
      contactInfo = <ul className="list-group">
      <li className='list-group-item text-left'><strong>Squadron: </strong>{ this.state.location }</li>
      <li className='list-group-item text-left'><strong>Duty Position</strong>{ this.state.position }</li>
      <li className='list-group-item text-left'><strong>Contact Info</strong>
        <ul className="list-unstyled">
          <li className="list-item">Email: { this.state.contact.email }</li>
          <li className="list-item">Phone: { this.state.contact.phone }</li>
        </ul>
      </li>
    </ul>
    }

    return (
      <div>
        <div className="text-center">
          <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar img-circle" alt="Dummy User Icon" /><br />
          { header }
          { this.state.editRankAndName ? <form onSubmit={this.changeRankAndName}>
            <div className="form-group"><input type="text" className="form-control" name="rank" placeholder="Enter User's Current Rank" onChange={this.onChange} value={this.state.rank} /></div>
            <div className="form-group"><input type="text" className="form-control" name="name" placeholder="Enter User's Name" onChange={this.onChange} value={this.state.name} /></div>
            <div className="form-group"><input type="submit" value="Save" className="form-control btn btn-success btn-sm" /></div>  
          </form> : null }
        </div>
        <hr />
        { contactInfo }
      </div>

      
    )
  }
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired,
  editProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {editProfile})(ProfileHeader);