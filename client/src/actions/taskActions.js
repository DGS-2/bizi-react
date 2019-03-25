import axios from "axios";

import {
  GET_TASK,
  GET_TASKS,
  ADD_TASK,
  DELETE_TASK,
  GET_ERRORS
} from "./types"


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
        type: GET_POST,
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