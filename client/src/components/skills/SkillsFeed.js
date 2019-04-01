import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SkillItem from "./SkillItem";

class SkillsFeed extends Component {
  render() {
    const { skills } = this.props
    return skills.map(skill => <SkillItem key={skill._id} skill={skill} />)
  }
}

SkillsFeed.propTypes = {
  skills: PropTypes.array.isRequired
}

export default SkillsFeed