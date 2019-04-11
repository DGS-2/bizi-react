import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"
import { getTasks } from "../../actions/taskActions";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../shared/spinner/Spinner";

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      events: []
    }
    this.mapTasksAsEvent = this.mapTasksAsEvent.bind(this)
    this.onSelectEvent = this.onSelectEvent.bind(this)
  }
  componentDidMount(){
    const { tasks } = this.props.tasks
    const { profile } = this.props.profile
    if(tasks === null) {
      this.props.getTasks()
    } else {
      this.mapTasksAsEvent( tasks, profile )
    }
  }

  mapTasksAsEvent = (tasks, profile) => {
    let arr = []
    let tasking = tasks.filter(task => task.creation.from.id === profile.user._id)
    let tasksToMap = [...tasking].concat(tasks.filter(task => task.creation.to.id === profile.user._id))
    tasksToMap.forEach((event, index) => {
      arr.push({
        id: index,
        title: event.metaData.title,
        start: new Date(event.creation.date),
        end: new Date(event.creation.due),
        allDay: true,
        eventId: event._id,
        priority: event.creation.priority.level,
        description: event.metaData.description
      })
    })
    this.setState({ events: arr })
  }

  onSelectEvent = e => {
    window.location.assign(`/task/${e.eventId}`)
  }

  render() {    
    let calendar = 
        <BigCalendar 
          localizer={localizer}
          style={{height: '75vh'}}
          events={this.state.events}
          step={60}
          showMultiDayTimes
          startAccessor="start"
          end="end"
          onSelectEvent={this.onSelectEvent}
          defaultDate={new Date()}
        />

    return (
      <div className="container bg-light rounded p-3">
        <h1>My Calendar</h1>
          { calendar }
      </div>
    )
  }
}


Calendar.propTypes = {
  tasks: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getTasks: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  tasks: state.tasks,
  profile: state.profile
})

export default connect(mapStateToProps, { getTasks, getCurrentProfile })(Calendar)