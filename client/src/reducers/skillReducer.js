 import { GET_SKILL, GET_SKILLS } from "../actions/types";

 const initialState = {
   skills: null,
   skill: null,
   isLoading: false
 }

 export default function(state = initialState, action){
   switch(action.type){
    case GET_SKILL: 
      return {
        ...state,
        skill: action.payload
      }
    case GET_SKILLS:
      return {
        ...state,
        skills: action.payload
      }   
    default:
      return state
   }
 }