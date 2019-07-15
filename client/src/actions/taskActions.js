import axios from "axios";

import { GET_TASK, GET_TASKS, ADD_TASK, DELETE_TASK, GET_ERRORS, TASK_LOADING, ADD_SUB_TASK, REPLY_TO_THREAD } from "./types";

// Add a task
export const addTask = taskData => dispatch => {
  axios.post('/tasks', taskData)
    .then(res => dispatch({
      type: ADD_TASK,
      payload: res.data
    }))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

// Get Tasks
export const getTasks = () => dispatch => {
  dispatch(setTaskLoading())
  axios.get('/tasks')
    .then(res => {
      dispatch({
        type: GET_TASKS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_TASKS,
        payload: null
      })
    })
}

// Get Task
export const getTask = id => dispatch => {
  axios.get(`/tasks/${id}`)
    .then(res => {
      dispatch({
        type: GET_TASK,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_TASK,
        payload: null
      })
    })
}

// Delete a task
export const deleteTask = id => dispatch => {
  axios.delete(`/tasks/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_TASK,
        payload: id
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

// Add Comment to thread
export const addComment = (taskId, commentData) => dispatch => {
  axios.post(`/tasks/reply/${taskId}`, commentData)
    .then(res => {
      dispatch({
        type: GET_TASK,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}
 
export const changeStatus = (taskId, statusData) => dispatch => {
  axios.post(`/tasks/set-status/${taskId}`, statusData)
    .then(res => {
      dispatch({
        type: GET_TASK,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const createSubTasks = (taskId, subTasks) => dispatch => {
  axios.post(`/tasks/sub-task/${taskId}`, subTasks)
    .then(res => dispatch({
      type: ADD_SUB_TASK,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

export const replyToMessageThread = (taskId, message) => dispatch => (
  axios
    .post(`/tasks/reply/${taskId}`, message)
      .then(res => {
        dispatch({
          type: REPLY_TO_THREAD,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: REPLY_TO_THREAD,
          payload: null
        })
      })
)

// Set Loading State
export const setTaskLoading = () => {
  return {
    type: TASK_LOADING
  }
}