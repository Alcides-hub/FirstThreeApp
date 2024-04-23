import { SET_USER, CLEAR_USER } from './actions/authActions';
// src/state/authReducer.js


const initialState = {
    user: null,
  };
  
  const authReducer = (state = initialState, action) => {
    console.log('Action arrived:', action);
    switch (action.type) {
      case SET_USER:
        return { ...state, user: action.payload };
      case CLEAR_USER:
        return { ...state, user: null };
      default:
        return state;
    }
  };
  
  export default authReducer;
  