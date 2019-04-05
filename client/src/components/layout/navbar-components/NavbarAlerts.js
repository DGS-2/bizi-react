import React, { Component } from 'react'
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { getTasks } from "../../../actions/taskActions";

class NavbarAlerts extends Component {
  constructor(props){
    super(props)
    this.state = {
      taskCount: 0
    }

    this.setCount = this.setCount.bind(this)
  }

  componentDidMount(){
    this.props.getTasks()
  }

  setCount = tasks => {
    let number = tasks.filter(item => item.creation.to.id === this.props.auth.user.id).length
    this.setState({
      taskCount: number
    })
  }

  render() {
    const { auth, tasks } = this.props
    
    let messages
    if(tasks === null || Object.keys(tasks) === 0) {
      messages = (
        <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
          <h6 className="dropdown-header">
            No Alerts
          </h6>
        </div>
      )
    } else {
      if(tasks.tasks !== null){
        messages = (
          <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
            <h6 className="dropdown-header">
              Alerts Center
            </h6>
            { tasks.tasks.map(task => {
              if(task.creation.to.id === auth.user.id){
                
                return <Link className="dropdown-item d-flex align-items-center" to={`/task/${task._id}`} key={task._id}>
                <div className="mr-3">
                  <div className="icon-circle bg-primary">
                    <i className="fas fa-tasks text-white"></i>
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">Due: { moment(task.creation.due).format('DD MMM YYY') }</div>
                  <span className="font-weight-bold">{ task.metaData.title }</span>
                </div>
              </Link>
              
              }
              return null
            }) }
          </div>
        )
      }
      
     
    }

    return (
      <div>
        <Link className="nav-link dropdown-toggle" to="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="fas fa-bell fa-fw"></i>
          <span className="badge badge-danger badge-counter">{ tasks.tasks ? tasks.tasks.filter(item => item.creation.to.id === this.props.auth.user.id).length : '0'}</span>          
        </Link>
        {messages}
      </div>
    )
  }
}

NavbarAlerts.propTypes = {
  tasks: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getTasks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  tasks: state.tasks
})

export default connect(mapStateToProps, { getTasks })(NavbarAlerts);