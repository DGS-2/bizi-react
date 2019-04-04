import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TaskFeed from "./feed/TaskFeed";
import TaskForm from "./form/TaskForm";
import Calendar from "../calendar/Calendar";
import Spinner from "../shared/Spinner";
import NoProfile from "../no-profile/NoProfile";
import { getTasks } from "../../actions/taskActions";

class Tasks extends Component {
  constructor(props){
    super(props)
    this.state = {
      tasks: this.props.task,
      input: '',
      priority: '',
      showTaskForm: false,
      showCalendar: false
    }

    this.onChange = this.onChange.bind(this)
    this.toggleForm = this.toggleForm.bind(this)
    this.toggleCalendar = this.toggleCalendar.bind(this)
  }
  componentDidMount(){
    this.props.getTasks()
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  toggleForm = () => {
    this.setState({
      showTaskForm: !this.state.showTaskForm
    })
  }

  toggleCalendar = () => {
    this.setState({ showCalendar: !this.state.showCalendar })
  }

  render() {
    const { tasks, loading } = this.props.task
    const { auth, profile } = this.props
    
    let prompt, taskContent, userTasks, filterTasks  

    if(tasks === null || loading) {
      taskContent = <Spinner />
    } else if(Object.keys(tasks) !== 0) {
      if( profile.profile === null ){
        prompt = <NoProfile /> 
      }  
      userTasks = tasks.filter(item => item.creation.from.id === auth.user.id)
      filterTasks = userTasks.filter(item => {
        if(this.state.input === '' && this.state.priority === '') return item
        else if(item.metaData.title.toLowerCase().includes(this.state.input.toLowerCase()) && this.state.input !== '') return item.metaData.title.toLowerCase().includes(this.state.input.toLowerCase())
        else if(item.creation.priority.level === this.state.priority && this.state.input === '') return item.creation.priority.level === this.state.priority        
      })   
      taskContent = <TaskFeed tasks={filterTasks} />
    }    

    const wrapper = (
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 my-3">
            <div className="row no-gutters">
              <div className="mx-auto">
                { this.state.showTaskForm ? (
                  <button className="btn btn-outline-light btn-xl" onClick={ this.toggleForm }><i className="fas fa-minus-circle"></i>&nbsp;Hide Form</button>
                ) : (
                  <button className="btn btn-outline-light btn-xl" onClick={ this.toggleForm }><i className="fas fa-plus-circle"></i>&nbsp;Create Task</button>
                )}
              </div>
            </div>            
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 my-3">
            <div className="mx-auto">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text bg-primary text-white"><i className="fas fa-search"></i></span>
                </div>
                <input type="text" name="input" className="form-control form-control-user" placeholder="Filter Tasks by Title..." onChange={this.onChange} />
              </div>
            </div>            
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 my-3">
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
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 my-3">
            <div className="row no-gutters">
              <div className="mx-auto">
                { this.state.showCalendar ? (
                  <button className="btn btn-outline-light btn-xl" onClick={ this.toggleCalendar }><i className="far fa-eye-slash"></i>&nbsp;Hide Calendar</button>
                ) : (
                  <button className="btn btn-outline-light btn-xl" onClick={ this.toggleCalendar }><i className="far fa-eye"></i>&nbsp;Show Calendar</button>
                )}
              </div> 
            </div>                       
          </div>
        </div>
        <div className="container-fluid my-3">
          <div className="row no-gutters">
              { this.state.showCalendar ? <Calendar /> : null }
          </div>
        </div>
        <div className="card-columns">
          { this.state.showTaskForm ? (<div className="card border border-primary shadow shadow-sm">
            <div className="card-header">Create a New Task</div>
            <div className="card-body"><TaskForm /></div>
          </div>) : null }
          { taskContent }
        </div>
      </div>
    )

    return (
      <div>
        { profile.profile ? wrapper : prompt }
      </div>
    )
  }
}


Tasks.propTypes = {
  getTasks: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  task: state.tasks,
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getTasks })(Tasks);