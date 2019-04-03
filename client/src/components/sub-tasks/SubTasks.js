import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SubTaskFeed from "./SubTaskFeed";
import SubTaskForm from "./SubTaskForm";

import Spinner from "../shared/Spinner";

import { getTasks } from "../../actions/taskActions";

class SubTasks extends Component {
  constructor(props){
    super(props)
    this.state = {
      tasks: this.props.task,
      input: '',
      priority: '',
      showSubTaskForm: false
    }

    this.onChange = this.onChange.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
  }
  componentDidMount(){
    this.props.getTasks()
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  toggleForm = () => {
    this.setState({
      showSubTaskForm: !this.state.showSubTaskForm
    })
  }

  render() {
    const { tasks, loading } = this.props.task
    const { auth } = this.props
    let taskContent
    
    const userTasks = tasks? tasks.filter(item => item.creation.from.id === auth.user.id) : []

    const filterTasks = userTasks.filter(item => {
      if(this.state.input === '' && this.state.priority === '') return item
      else if(item.metaData.title.toLowerCase().includes(this.state.input.toLowerCase()) && this.state.input !== '') return item.metaData.title.toLowerCase().includes(this.state.input.toLowerCase())
      else if(item.creation.priority.level === this.state.priority && this.state.input === '') return item.creation.priority.level === this.state.priority
      
    })

    if(tasks === null || loading) {
      taskContent = <Spinner />
    } else if(Object.keys(tasks) !== 0) {     
      taskContent = <SubTaskFeed tasks={filterTasks} />
    }    

    return (
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mb-3">
            <div className="mx-auto">
              { this.state.showSubTaskForm ? (
                <button className="btn btn-outline-dark btn-xl" onClick={ this.toggleForm }><i className="fas fa-minus-circle"></i>&nbsp;Hide Form</button>
              ) : (
                <button className="btn btn-outline-dark btn-xl" onClick={ this.toggleForm }><i className="fas fa-plus-circle"></i>&nbsp;Create Task</button>
              )}
            </div>            
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 my-3">
            <div className="mx-auto">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-primary text-white"><i className="fas fa-search"></i></span>
                </div>
                <input type="text" name="input" className="form-control form-control-user" placeholder="Filter Tasks by Title..." onChange={this.onChange} />
              </div>
            </div>            
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-3">
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
        </div>
        <div className="card-columns">
          { this.state.showSubTaskForm ? (<div className="card border border-primary shadow shadow-sm">
            <div className="card-header">Create a New Task</div>
            <div className="card-body"><SubTaskForm /></div>
          </div>) : null }
          { taskContent }
        </div>
      </div>
    )
  }
}


SubTasks.propTypes = {
  getTasks: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  task: state.tasks,
  auth: state.auth
})

export default connect(mapStateToProps, { getTasks })(SubTasks);