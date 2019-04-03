import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SubTaskFeed from "../sub-tasks/SubTaskFeed"
import SubTaskForm from "../sub-tasks/SubTaskForm";

class TaskSubTasking extends Component {
  constructor(props){
    super(props)
    this.state = {
      showSubTaskForm: false
    }

    this.toggleForm = this.toggleForm.bind(this)
  }

  toggleForm = () => {
    this.setState({ showSubTaskForm: !this.state.showSubTaskForm })
  }

  render() {
    const { task } = this.props

    let subTaskings
    if( task.subTasks.length > 0 ) {
      subTaskings = <SubTaskFeed tasks={task.subTasks} />
    } else {
      subTaskings = <h5 className="text-center">Currently no sub taskings</h5>
    }

    let subForm
    if(this.state.showSubTaskForm){
      subForm = <SubTaskForm task={task} />
    }

    return (
      <div className="container no-gutters">
        <h3 className="text-center">Ability to sub task</h3>
        <div className="container no-gutters">
          <button className="btn btn-outline-dark btn-xl" onClick={this.toggleForm}>Create Sub Tasks</button>
          <div className="col-12 mt-3">
            {subForm}
          </div>
        </div>
        <div className="container no-gutters mt-3">
          <div className="card-columns">{ subTaskings }</div>          
        </div>
      </div>
    )
  }
}

TaskSubTasking.propTypes = {
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps)(TaskSubTasking)