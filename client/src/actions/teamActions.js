import axios from "axios";

import { GET_TEAMS, GET_TEAM, TEAM_LOADING, GET_ERRORS, ADD_TEAM } from "./types";

// Create a Team
export const createTeam = teamData => dispatch => {
  axios.post(`/teams/create/`, teamData)
    .then(res => 
      dispatch({
        type: ADD_TEAM,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Get All Teams
export const getTeams = () => dispatch => {
  dispatch(setTeamLoading())
  axios.get('/teams/all')
    .then(res => 
      dispatch({
        type: GET_TEAMS,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Get Team Ny ID
export const getTeamById = id => dispatch => {
  dispatch(setTeamLoading())
  axios.get(`/teams/${id}`)
    .then(res => 
      dispatch({
        type: GET_TEAM,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch({
        type: GET_TEAM,
        payload: null
      })
    )
}

// Respond To Message Thread

// Invite Additional Member(s)

// Set Loading State
export const setTeamLoading = () => {
  return {
    type: TEAM_LOADING
  }
}