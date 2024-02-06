import { doc, getDoc } from 'firebase/firestore'; // Instead of 'firebase/firestore/lite'
import { db } from '../firebaseConfig'; // Adjust path as necessary

export const setDialogueVisibility = (isVisible) => {
    return {
        type: 'SET_DIALOGUE_VISIBILITY',
        payload: isVisible,
    };
}

// Action Types
const FETCH_DIALOGUE_START = 'FETCH_DIALOGUE_START';
const FETCH_DIALOGUE_SUCCESS = 'FETCH_DIALOGUE_SUCCESS';
const FETCH_DIALOGUE_FAILURE = 'FETCH_DIALOGUE_FAILURE';
const SET_CURRENT_DIALOGUE_INDEX = 'SET_CURRENT_DIALOGUE_INDEX';
const HANDLE_END_DIALOGUE = 'HANDLE_END_DIALOGUE';
const SET_SHOW_MODAL_NOTE = 'SET_SHOW_MODAL_NOTE';


// Action Creators
export const fetchDialogueStart = () => ({
  type: FETCH_DIALOGUE_START,
});

export const fetchDialogueSuccess = (dialogueData) => ({
  type: FETCH_DIALOGUE_SUCCESS,
  payload: dialogueData,
});

export const fetchDialogueFailure = (error) => ({
  type: FETCH_DIALOGUE_FAILURE,
  payload: error,
});

export const setCurrentDialogueIndex = (index) => ({
  type: SET_CURRENT_DIALOGUE_INDEX,
  payload: index,
})

export const setShowModalNote = (isVisible) => ({
  type: SET_SHOW_MODAL_NOTE,
  payload: isVisible,
})

// Thunk Action Creator
export const fetchDialogue = (dialogueId) => async (dispatch) => {
  dispatch(fetchDialogueStart());
  try {
    const docRef = doc(db, "kasa_dialogue", "kasa_start");
    const docSnap = await getDoc(docRef);
    console.log("Fetching dialogue start");
    if (docSnap.exists()) {
      // console.log("Fetched dialogue data:", docSnap.data());
      dispatch(fetchDialogueSuccess(docSnap.data()));
    } else {
      console.log("No such dialogue exists");
      throw new Error('No such dialogue exists!');}
  } catch (error) {
    dispatch(fetchDialogueFailure(error.message));
  }
};

export const handleEndDialogue = () => ({
  type: HANDLE_END_DIALOGUE,
  // You may or may not have a payload or other properties
});