import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"
import { getTasks } from "../../actions/taskActions";
import { getCurrentProfile } from "../../actions/profileActions";

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  constructor(props){
    super(props)
    this.mapTasksAsEvent = this.mapTasksAsEvent.bind(this)
    this.onSelectEvent = this.onSelectEvent.bind(this)
  }
  componentDidMount(){
    if(this.props.tasks.tasks === null) {
      this.props.getCurrentProfile()
      this.props.getTasks()
    }    
  }

  mapTasksAsEvent = (tasks, profile) => {
    let arr = []
    let tasksToMap = tasks.tasks.filter(task => task.creation.from.id === profile.profile.user._id)
    tasksToMap.forEach((event, index) => {
      arr.push({
        id: index,
        title: event.metaData.title,
        start: new Date(event.creation.date),
        end: new Date(event.creation.due),
        allDay: true,
        eventId: event._id
      })
    })
    return arr
  }

  onSelectEvent = e => {
    // this.props.history.push(`/task/${e.eventId}`)
    window.location.assign(`/task/${e.eventId}`)
  }

  render() {
    const { tasks, profile } = this.props
    
    let calendar
    let events
    if(tasks === null || profile === null ) {
      events = []
    } else if(profile.profile !== null && tasks.tasks !== null) {
      events = this.mapTasksAsEvent(tasks, profile)
      calendar = <BigCalendar 
          localizer={localizer}
          style={{height: '75vh'}}
          events={events}
          step={60}
          showMultiDayTimes
          startAccessor="start"
          end="end"
          onSelectEvent={this.onSelectEvent}
          defaultDate={new Date()}
          
        />
    }

    

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