import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import taskReducer from "./taskReducer";
import skillReducer from "./skillReducer"
import teamReducer from "./teamReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  tasks: taskReducer,
  skills: skillReducer,
  teams: teamReducer
});