import axios from 'axios';

import { GET_SKILLS, GET_SKILL } from "./types";

export const getSkills = () => dispatch => {
  axios
    .get('/skills/all')
      .then(res => dispatch({
        type: GET_SKILLS,
        payload: res.data
      }))
      .catch(err => dispatch({
        type: GET_SKILLS,
        payload: null
      }))
}