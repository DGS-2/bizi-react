import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from "../../../actions/taskActions"
import TextAreaFieldGroup from "../../shared/TextAreaFieldGroup";

class TaskMessageReply extends Component {
  constructor(props){
    super(props)
    this.state = {
      message: '',
      errors: {},
    }
    
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if(newProps.errors) {
      this.setState({errors: newProps.errors})
    }
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = e => {
    e.preventDefault();
    
    let taskId = this.props.task._id
    const newComment = {
      from: this.props.auth.user.id,
      message: this.state.message,
    }
    
    this.props.addComment(taskId, newComment)
    this.setState({message: ''})
  }

  render() {
    const { errors } = this.state
    
    return (
      <div>
        <form className="user" noValidate onSubmit={this.onSubmit} autoComplete="off">
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-12 col-xl-12">
            <TextAreaFieldGroup 
              name="message"
              placeholder="Reply Message"
              value={this.state.message}
              onChange={this.onChange}
              errors={ errors.message }
              info="Reply to message thread"
            />
          </div>
          <hr />          
          <div>
            <button className="btn btn-primary btn-user btn-block">
              Reply
            </button>
          </div>
        </form>
      </div>
    )
  }
}

TaskMessageReply.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
  task: state.tasks.task
})

export default connect(mapStateToProps, { addComment })(withRouter(TaskMessageReply));