import { combineReducers } from 'redux';
// import alert from './alertReducer';
// import auth from './authReducer';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer
})