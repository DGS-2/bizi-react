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
    window.location.reload()
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
    window.location.reload()
  }

  render() {
    const { admin, accountOwner } = this.props
    
    let header
    if( admin || accountOwner ) {
      header = <div className="info">       
        <div className="row no-gutters">
          <div className="col-9 title">{ this.state.rank } { this.state.name }</div>
          <div className="col-3">
            <button className="btn btn-outline-light ml-auto btn-xs" onClick={this.editRankAndName}><i className="fas fa-pencil-alt text-success"></i>&nbsp; Edit</button>
          </div>
          <div className="col-12 text-center pt-3">         
            { this.state.editRankAndName ? <form onSubmit={this.changeRankAndName}>
              <div className="form-group"><input type="text" className="form-control" name="rank" placeholder="Enter User's Current Rank" onChange={this.onChange} value={this.state.rank} /></div>
              <div className="form-group"><input type="text" className="form-control" name="name" placeholder="Enter User's Name" onChange={this.onChange} value={this.state.name} /></div>
              <div className="form-group"><input type="submit" value="Save" className="form-control btn btn-success btn-sm" /></div>  
            </form> : null }
          </div>
        </div>        
        <div className="row no-gutters">
          <div className="col-9">
            <form onSubmit={this.changeContactInfo}>              
              <div className="desc">
                <strong>Squadron:</strong> { this.state.editContactInfo ? <select name="location" value={this.state.location} onChange={this.onChange} className="form-control">
                  { squadrons.map(item => {
                    return <option value={ item.value } key={ item.label }>{ item.label }</option>
                  }) }
                </select> : this.state.location }
              </div>
              <div className="desc">
                <strong>Duty Position:</strong> 
                { this.state.editContactInfo ? <input type="text" name="position" value={this.state.position} onChange={this.onChange} className="form-control" /> : this.state.position }
              </div>
              <div className="desc">
                Email:&nbsp;  
                { this.state.editContactInfo ? <input type="text" name="email" value={this.state.contact.email} onChange={this.onChange} className="form-control" /> : this.state.contact.email }
              </div>
              <div className="desc">
                Phone:&nbsp; 
                { this.state.editContactInfo ? <input type="text" name="phone" value={this.state.contact.phone} onChange={this.onChange} className="form-control" /> : this.state.contact.phone }
              </div>
              { this.state.editContactInfo ? <div className="desc"><input type="submit" value="Save" className="btn btn-success form-control"/></div> : null }
            </form> 
          </div>
          <div className="col-3 d-flex flex-column">
            <div className="desc my-auto">
              <button onClick={this.editContactInfo} type="button" className="btn btn-outline-light"><i className="fas fa-pencil-alt text-success"></i>&nbsp; Edit</button>
            </div>
          </div>
        </div>  
      </div>
    } else {
      header = <div className="info">
        <div className="title">{ this.state.rank } { this.state.name }</div>
        <div className="desc"><strong>Squadron: </strong>{ this.state.location }</div>
        <div className="desc"><strong>Duty Position</strong>{ this.state.position }</div>
        <div className="desc">Email: { this.state.contact.email }</div>
        <div className="desc">Phone: { this.state.contact.phone }</div>
      </div>
    }

    return (
      <div className="card hovercard">
      <div className="cardheader"></div>
        <div className="avatar">
          <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="Dummy User Icon" />
        </div>
        { header }
        <div className="bottom">
        
        </div>
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