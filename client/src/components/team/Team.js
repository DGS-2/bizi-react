import React, { Component } from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { getProfiles } from "../../actions/profileActions"
import { getTeamById } from "../../actions/teamActions"
import userIcon from "../../assets/images/user_icon.png"

class Team extends Component {
  constructor(props){
    super(props)
    this.state = {
      team: null,
      members: null
    }
  }

  componentDidMount = () => {
    const { profile, match } = this.props
    if( profile.profiles === null ) this.props.getProfiles()

    this.props.getTeamById(match.params.id)
  }

  componentWillReceiveProps = (props) => {
    const { team } = this.state
    const { teams, profile } = props
    if( teams.team !== null ) this.setState({ team: teams.team })
    
    let teamMembers = []
    if( team !== null ){
      team.members.forEach(m => {
        profile.profiles.forEach(p => {
          if(p.user._id === m.id) {
            if(team.creator.id === p.user._id) p.role = "Team Lead"
            else p.role = "Team Member"
            teamMembers.push(p)
          }
        })
      })
    } 
    this.setState({ members: teamMembers })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="container">
          <h3 className="text-center text-white">Team Members</h3>
          <div className="card-deck">
            { this.state.members ? this.state.members.map((item, i) => {
              return <div className="card" key={ i } style={{ "maxWidth" : "200px", "maxHeight": "350px" }}>
                  <img src={userIcon} alt="User" className="card-img-top"/>                  
                  <div className="card-body">
                    <h5 className="card-title">{ item.personalInfo.rank.abreviated } { item.personalInfo.name.full }</h5>
                    <p className="card-text"><strong>Role: </strong>{ item.role }</p>
                    <p className="card-text"><strong>Unit: </strong>{ item.organization.squadron }</p>
                  </div>
                </div>
              }) : null}
          </div>
        </div>
        <div className="row p-5">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
            <div className="container">
              <div className="jumbotron mb-0 rounded">
                <h1 className="text-dark">This is a sample post</h1>
                <p>Dialog will happen below</p>
              </div>
              <div className="media border p-3">
                  <i className="fas fa-user fa-5x mr-3 mt-3 rounded-circle"></i>
                  <div className="media-body">
                    <h4>John Doe <small><i>Posted on February 19, 2019</i></small></h4>
                    <p>Lorem ipsum...</p>
                    <div className="media p-3">
                      <i className="fas fa-user fa-5x mr-3 mt-3 rounded-circle"></i>
                      <div className="media-body">
                        <h4>Jane Doe <small><i>Posted on February 20 2019</i></small></h4>
                        <p>Lorem ipsum...</p>
                      </div>
                    </div>  
                  </div>
                </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ">
              <div className="card-columns">
                <div className="card p-5 my-3">Flex item 1</div>
                <div className="card p-5 my-3">Flex item 2</div>
                <div className="card p-5 my-3">Flex item 3</div>
                <div className="card p-5 my-3">Flex item 4</div>
                <div className="card p-5 my-3">Flex item 5</div>
                <div className="card p-5 my-3">Flex item 6</div>
              </div>
              <div className="card-deck">
                <div className="card">Flex item 1</div>
                <div className="card">Flex item 2</div>
                <div className="card">Flex item 3</div>
                <div className="card">Flex item 4</div>
                <div className="card">Flex item 5</div>
                <div className="card">Flex item 6</div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

Team.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
  getTeamById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  teams: state.teams
})

export default connect( mapStateToProps, { getProfiles, getTeamById } )(Team) 