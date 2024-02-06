import { combineReducers } from 'redux';
import dialogueReducer from './dialogueReducer';

const rootReducer = combineReducers({
  dialogue: dialogueReducer,
  // other reducers here if you have them
});

export default rootReducer;

