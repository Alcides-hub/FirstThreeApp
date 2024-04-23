import { combineReducers } from 'redux';
import dialogueReducer from './dialogueReducer';
import authReducer from './authReducer';


const rootReducer = combineReducers({
  dialogue: dialogueReducer,
  auth: authReducer, 
 
  // other reducers here if you have them
});

export default rootReducer;

