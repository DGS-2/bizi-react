import { ADD_TASK, GET_TASKS, TASK_LOADING, DELETE_TASK, GET_TASK } from "../actions/types"

const initialState = {
  tasks: [],
  task: {},
  loading: false
}

export default function(state = initialState, action){
  switch(action.type){
    case TASK_LOADING:
      return {
        ...state,
        loading: true
      }
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      }
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      }
    case GET_TASK:
      return {
        ...state,
        task: action.payload
      }  
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      }
    default: 
      return state
    
  }
}