import axios from "axios"
import { EDIT_PROFILE, PROFILE_LOADING, GET_PROFILE } from "./types"

export const editProfile = (userId, profile) => dispatch => {
  setProfileLoading()
  axios.post(`/profile/edit/${userId}`, profile)
    .then(res => dispatch({
      type: EDIT_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_PROFILE,
      payload: null
    }))
}

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};