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
    this.props.getCurrentProfile()
    this.props.getTasks()
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
        allDay: true
      })
    })
    return arr
  }

  onSelectEvent = e => {
    console.log(e)
  }

  render() {
    const { auth, tasks, profile } = this.props
    
    
    let events
    if(tasks === null || profile === null ) {
      events = []
    } else if(profile.profile !== null) {
      events = this.mapTasksAsEvent(tasks, profile)
    }

    

    return (
      <div className="container">
        <h1>My Calendar</h1>
        {profile.profile? (
          <BigCalendar 
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
        ) : null}
      </div>
    )
  }
}


Calendar.propTypes = {
  auth: PropTypes.object.isRequired,
  tasks: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getTasks: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  tasks: state.tasks,
  profile: state.profile
})

export default connect(mapStateToProps, { getTasks, getCurrentProfile })(Calendar)