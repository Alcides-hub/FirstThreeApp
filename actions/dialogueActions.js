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
const SET_SHOW_EGG_BOX = 'SET_SHOW_EGG_BOX';
const SET_SHOW_EGG_BOX_MODAL = 'SET_SHOW_EGG_BOX_MODAL';
const SET_SHOW_MODAL_IMAGE = 'SET_SHOW_MODAL_IMAGE';
const SET_INTERACTED_ITEM = 'SET_INTERACTED_ITEM';
const SET_CURRENT_SELECTED_ITEM = 'SET_CURRENT_SELECTED_ITEM';
const ADD_ITEM_USED = 'ADD_ITEM_USED';
const TOGGLE_SIDE_DRAWER = 'TOGGLE_SIDE_DRAWER';
const SET_SPHERICAL_COORDS = 'SET_SPHERICAL_COORDS';
const SET_ZOOM_TARGET = 'SET_ZOOM_TARGET';
const SET_ZOOM_ACTIVE = 'SET_ZOOM_ACTIVE';
const SET_ZOOM_LEVEL = 'SET_ZOOM_LEVEL';
const SET_ZOOM_COMPLETE = "SET_ZOOM_COMPLETE";
const SET_IMAGE_OPEN = "SET_IMAGE_OPEN";
const SAVE_CAMERA_STATE = "SAVE_CAMERA_STATE";
const RESTORE_CAMERA_STATE = "RESTORE_CAMERA_STATE";
const SET_SHOW_OBJECT = "SET_SHOW_OBJECT";
const ENABLE_ZOOM = "ENABLE_ZOOM";


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

export const setShowEggBox = (isVisible) => ({
  type: SET_SHOW_EGG_BOX,
  payload: isVisible,
})

export const setShowEggBoxModal = (isVisible) => ({
  type: SET_SHOW_EGG_BOX_MODAL,
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

export const setSphericalCoods = (sphericalCoords) => ({
  type: SET_SPHERICAL_COORDS,
  payload: { sphericalCoords },
});

export const setZoomTarget = (targetPosition) => ({
  type: SET_ZOOM_TARGET,
  payload: targetPosition,
})

export const setZoomActive = (zoomActive) => ({
  type: SET_ZOOM_ACTIVE,
  payload: zoomActive,
});

export const setZoomLevel = (zoomLevel) => ({
  type: SET_ZOOM_LEVEL,
  payload: zoomLevel,
})
 
export const setIsImageOpen = (isOpen) => ({
  type: SET_IMAGE_OPEN,
  payload: isOpen,
});

export const setZoomCompleted = (isZoomCompleted) => ({
  type: SET_ZOOM_COMPLETE,
  payload: isZoomCompleted,
});


// Redux Action Creator for setting an interacted item
export const setInteractedItem = (itemName) => ({
  type: SET_INTERACTED_ITEM,
  payload: itemName,
});


export const setCurrentSelectedItem = (itemName) => ({
  type: SET_CURRENT_SELECTED_ITEM,
  payload: itemName,
});

export const addUsedItem = (itemName) => ({
  type: ADD_ITEM_USED,
  payload: itemName, // Corrected from Itemname to itemName for consistency
});


// Action to toggle SideDrawer visibility
export const toggleSideDrawer = () => ({
  type: TOGGLE_SIDE_DRAWER,
});

export const saveCameraState = (cameraState) => ({
  type: 'SAVE_CAMERA_STATE',
  payload: cameraState,
});
// Action to request a camera reset
export const requestCameraReset = () => ({
  type: 'REQUEST_CAMERA_RESET',
});

// Action to clear the request after the camera has been reset
export const clearCameraResetRequest = () => ({
  type: 'CLEAR_CAMERA_RESET_REQUEST',
});

export const enableZoom = (isEnabled) => ({
  type: ENABLE_ZOOM,
  payload: isEnabled,
})


export const restoreCameraState = () => ({
  type: RESTORE_CAMERA_STATE,
})

export const showModalImage = () => ({
  type: 'SHOW_MODAL_IMAGE',
});

export const hideModalImage = () => ({
  type: 'HIDE_MODAL_IMAGE',
});

export const setShowObject = (isVisible) => ({
  type: SET_SHOW_OBJECT,
  payload: isVisible,
})

// Action Types
const INCREMENT_ROTATION_ANGLE = 'INCREMENT_ROTATION_ANGLE';

// Action Creator
export const incrementRotationAngle = (angle) => ({
  type: INCREMENT_ROTATION_ANGLE,
  payload: angle,
});

const MANUAL_ROTATE = 'MANUAL_ROTATE';
export const manualRotate = (angle) => ({
  type: MANUAL_ROTATE,
  payload: angle,
});

const TOGGLE_CONTROL_MODE = 'TOGGLE_CONTROL_MODE';

export const toggleControlMode = () => ({
  type: TOGGLE_CONTROL_MODE,
});






