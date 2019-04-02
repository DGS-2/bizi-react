import { GET_TEAM, GET_TEAMS, TEAM_LOADING, ADD_TEAM } from "../actions/types";

const initialState = {
  teams: null,
  team: null,
  isLoading: false
}

export default function(state = initialState, action) {
  switch(action.type){
    case TEAM_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case ADD_TEAM:
      return {
        ...state,
        teams: [action.payload, ...state.teams]
      }
    case GET_TEAMS:
      return {
        ...state,
        teams: action.payload,
        isLoading: false
      }  
    case GET_TEAM:
      return {
        ...state,
        team: action.payload
      }
    default:
      return state
  }
}