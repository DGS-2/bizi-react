import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../shared/Spinner";

import { getSkills } from "../../actions/skillActions";
import SkillsFeed from './SkillsFeed';

class Skills extends Component {
  componentDidMount = () => {
    this.props.getSkills()
  }
  render() {
    const { skills } = this.props
    let skillContent;
    if( skills === null ) {
      skillContent = <Spinner />
    } else if( Object.keys(skills) !== 0 ) {
      console.log(skills)
      if( skills.skills !== null ) {
        skillContent = <SkillsFeed skills={skills.skills} />
      }
    }

    return (
      <div className="container">
        <h2 className="text-center mb-3">Skills that have been identified by users</h2>
        <div className="card-columns">
          {skillContent}
        </div>
      </div>      
    )
  }
}

Skills.propTypes = {
  auth: PropTypes.object.isRequired,
  skills: PropTypes.object.isRequired,
  getSkills: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  skills: state.skills
})

export default connect(mapStateToProps, { getSkills })(Skills)