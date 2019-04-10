import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from "react-router-dom";

class SkillItem extends Component {
  constructor(props){
    super(props)

    this.mapSkillToUser = this.mapSkillToUser.bind(this)
  }

  mapSkillToUser = (skills) => {
    let claimed = skills.claimedBy

    let content = claimed.map(u => {
      return <li className="list-item" key={u._id}>
        <Link to={{ pathname: `/profile/${u.id}` }}>{ u.displayName }</Link>
      </li>
    })

    return content
  }

  render() {
    const { skill } = this.props
    return (
      <div className="card border border-dark">
        <div className="card-header">{skill.name}</div>
        <div className="card-body">
          <ul className="list-unstyled">
             { this.mapSkillToUser(skill) }
          </ul>
          
        </div>
      </div>
    )
  }
}

SkillItem.propTypes = {
  skill: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  skills: state.skills
})

export default connect(mapStateToProps)(SkillItem)