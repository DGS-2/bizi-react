import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import compose from 'recompose/compose';
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import classNames from 'classnames';

// Material helpers
import { withStyles } from '@material-ui/core';

import {
    Portlet,
    PortletHeader,
    PortletLabel,
    PortletContent
} from '../../../../components';

import styles from './styles';

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
    constructor(props){
      super(props)
      this.state = {
        events: [],
        profile: ''
      }
      
    }  

    componentWillReceiveProps = props => {
        const { profile, tasks } = props;
        
        if(this.state.profile === '') {
            if(profile.profile === null) {
                return
            } else {
                this.setState({profile: profile.profile.user._id}, () => {
                    if(tasks.tasks) this.mapTasksAsEvent(tasks.tasks, this.state.profile);
                });
            }
        }
    }
  
    mapTasksAsEvent = (tasks, profile) => {
      let arr = []
      let tasking = tasks.filter(task => task.creation.from.id === profile);
      tasking.forEach((event, index) => {
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
  
    render() {   
        const { classes, className } = this.props;    
        const rootClassName = classNames(classes.root, className);

        let calendar = 
          <BigCalendar 
            localizer={localizer}
            style={{minHeight: '50vh'}}
            events={this.state.events}
            step={60}
            showMultiDayTimes
            startAccessor="start"
            end="end"
            defaultDate={new Date()}
          />
  
        return (
        <Portlet
            className={rootClassName}
        >
            <PortletHeader noDivider>
              <PortletLabel
                  subtitle={`${this.state.events.length} events`}
                  title="My Calendar"
              />
            </PortletHeader>
            <PortletContent className={classes.portletContent}>                
              { calendar }
            </PortletContent>            
        </Portlet>       
      )
    }
  }
  
  
  Calendar.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    tasks: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({    
    tasks: state.tasks,
    profile: state.profile
  })
  
  export default compose(connect(mapStateToProps), withStyles(styles))(Calendar)