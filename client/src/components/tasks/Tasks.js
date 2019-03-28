import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TaskFeed from "./TaskFeed"
import TaskForm from "./TaskForm"

import Spinner from "../shared/Spinner"

import { getTasks } from "../../actions/taskActions";

class Tasks extends Component {
  constructor(props){
    super(props)
    this.state = {
      tasks: this.props.task,
      input: '',
      priority: ''
    }

    this.onChange = this.onChange.bind(this)
  }
  componentDidMount(){
    this.props.getTasks()
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const { tasks, loading } = this.props.task
    let taskContent
    
    const filterTasks = tasks.filter(item => {
      if(this.state.input === '' && this.state.priority === '') return item
      else if(item.metaData.title.toLowerCase().includes(this.state.input.toLowerCase()) && this.state.input !== '') return item.metaData.title.toLowerCase().includes(this.state.input.toLowerCase())
      else if(item.creation.priority.level === this.state.priority && this.state.input === '') return item.creation.priority.level === this.state.priority
      
    })

    if(tasks === null || loading) {
      taskContent = <Spinner />
    } else if(Object.keys(tasks) !== 0) {     
      taskContent = <TaskFeed tasks={filterTasks} />
    }    

    return (
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="mx-auto">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text bg-primary text-white"><i className="fas fa-search"></i></span>
              </div>
              <input type="text" name="input" className="form-control form-control-user" placeholder="Filter Tasks by Title..." onChange={this.onChange} />
            </div>
          </div>
          <div className="mx-auto">
          <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text bg-primary text-white"><i className="fas fa-search"></i></span>
              </div>
              <select name="priority" onChange={this.onChange} className="form-control">
                <option value="">* Filter by Task Priority</option>
                <option value="Critical">Critical</option>
                <option value="Important">Important</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-columns">
          <div className="card border border-primary shadow shadow-sm">
            <div className="card-header">Create a New Task</div>
            <div className="card-body"><TaskForm /></div>
          </div>
          { taskContent }
        </div>
      </div>
    )
  }
}


Tasks.propTypes = {
  getTasks: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  task: state.tasks
})

export default connect(mapStateToProps, { getTasks })(Tasks);