import axios from 'axios';
import { setAlert } from './alertActions';

import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current uses profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
    // console.log(res.data)

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}

// Create or update profile 
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')) // this is how to dispatch an action from another action creator 

    if(!edit) {
      history.push('/dashboard'); // this will redirect to the dashboard after creating a new profile
    }
    
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log(errors)
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}