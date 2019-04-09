import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux"
import { editProfile  } from "../../../actions/profileActions"
import { privilegeLevels } from "../../../const/consts"

class ProfileSettings extends Component {
  constructor(props){
    super(props)
    this.state = {
      privilege: this.props.profile.personalInfo.privilege? this.props.profile.personalInfo.privilege.title : ''
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount = () => {}

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault()

    let level = privilegeLevels.filter(item => item.label === this.state.privilege)[0]

    const { profile } = this.props
    profile.personalInfo.privilege = {}
    profile.personalInfo.privilege.level = level.value
    profile.personalInfo.privilege.title = level.title

    let id = profile.user

    this.props.editProfile(id, profile)
  }

  render() {
    const { admin, accountOwner } = this.props

    let content
    if( admin ){
      content = 
      <div>
        <h1 className="text-center text-white">Admin</h1>
        <div className="row no-gutters">
          <div className="col-4">
            <p className="text-white">{ this.state.privilege }</p>
          </div>
          <div className="col-8">
              <form onSubmit={ this.onSubmit }>
                <div className="form-group">
                  <select name="privilege" className="form-control" value={ this.state.privilege } onChange={ this.onChange }>
                    { privilegeLevels.map(item => {
                      return <option value={item.title} key={ item.value }>{ item.label }</option>
                    }) }
                  </select>
                </div>
                <div className="form-group">
                    { this.state.privilege ? <input type="submit" value="Change Privilige Level" className="form-control btn btn-primary"/> : null }
                </div>
              </form>
          </div>
        </div>
      </div>
    } else if( accountOwner && !admin ) {
      content = <h1 className="text-center">Not Admin, Owner</h1>
    }

    return (
      <div>
        { content }
      </div>
    )
  }
}

ProfileSettings.propTypes = {
  profile: PropTypes.object.isRequired,
  editProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { editProfile })(ProfileSettings)