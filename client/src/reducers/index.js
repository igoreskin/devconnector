import { combineReducers } from 'redux';
// import alert from './alertReducer';
// import auth from './authReducer';
import alertReducer from './alertReducer';
import authReducer from './authReducer';

export default combineReducers({
  alert: alertReducer,
  auth: authReducer
})