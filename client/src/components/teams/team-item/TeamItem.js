import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class TeamItem extends Component {
  render() {
    const { team } = this.props
    return (
      <div className="card">
        <div className="card-header">{ team.name }</div>
        <div className="card-body">
          <p><strong>Description: </strong>{team.description}</p>
          <div className="col-12">
            <h4 className="text-center">Members</h4>
            <ul className="list-unstyled">
              { team.members.map(member => {
                return <li className="list-item" key={member._id}>{ member.displayName }</li>
              }) }
            </ul>
          </div>
          <div className="col-12">
            <h4 className="text-center">Pending Inivtes</h4>
            <ul className="list-unstlyed">
              { team.invitations.filter(item => item.id !== this.props.profile.profile.user._id).map(invite => {
                return <li className="list-item" key={ invite._id }>{ invite.displayName }</li>
              }) }
            </ul>
          </div>
        </div>
        <div className="card-footer">
          <div className="row">
            <Link className="btn btn-outline-dark btn-xl mx-auto" to={`/teams/${team._id}`}>Go to team dashboard</Link>
          </div>
        </div>
      </div>
    )
  }
}

TeamItem.propTypes = {
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps)(TeamItem)