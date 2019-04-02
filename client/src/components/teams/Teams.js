import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types"
import Spinner from "../shared/Spinner";
import { getTeams } from "../../actions/teamActions";
import { Link } from "react-router-dom";
import TeamFeed from "./TeamFeed";

class Teams extends Component {
  constructor(props){
    super(props)
    this.state = {
      input: ''
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount = () => {
    this.props.getTeams()
  }

  onChange = e => {
    this.setState({ [e.target.name] : e.target.value })
  }

  render() {
    const { teams } = this.props
    
    let content
    if(teams === null) {
      content = <Spinner />
    } else {
      if(teams.teams) {
        if( teams.teams.length < 1 ){
          content = <div className="container">
            <h1 className="text-center">There Appear to be no teams</h1>
            <hr />
            <Link className="btn btn-outline-primary" to="/create-team">Create Team</Link>   
          </div>

        } else {
          content = <TeamFeed teams={teams.teams} />
        }        
      }
    }
    
    return (
      <div className="card-columns px-5">
        {content}
      </div>
    )
  }
}

Teams.propTypes = {
  teams: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getTeams: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  teams: state.teams
})

export default connect(mapStateToProps, { getTeams })(Teams)