const initialState = {
    isDialogueVisible: true,
    loading: false,
    data: {},
    error: null,
    currentDialogueIndex: 0, // Add this line
    showModalNote: false,
    showEggBox: false,
    sphericalCoords: null,
    zoomTarget: null,
    zoomLevel: 0,
    zoomActive: false,
    isZoomCompleted: false,
    isImageOpen: false,
    enableZoom: false,
    interactedItems: [],
    currentSelectedItem: null,
    usedItems: [],
    isDrawerOpen: false,
    cameraState: null,
    requestCameraReset: false,
    showEggBoxModal: false,
    showModalImage: false,
    showObject: false,
    rotationAngle: 0,
    controlMode: 'buttons',
    selectedUmbrellas: [],
    isOrderCorrect: false,
    isVideoPlaying: false,
    dialogueData: null,
    isActive: false,
    incorrectAttempts: 0,
    isObakeVisible: false,
  };

const dialogueReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DIALOGUE_VISIBILITY':
            return {
                ...state,
                isActive: action.payload,
            };

        case 'SET_OBAKE_VISIBLE':
            return {
                ...state,
                isObakeVisible: action.payload,
            };
            case 'FETCH_DIALOGUE_START':
                return { ...state, loading: true, error: null };
              case 'FETCH_DIALOGUE_SUCCESS':
                const { collection, documentId, data } = action.payload;
        console.log("FETCH_DIALOGUE_SUCCESS received:", { collection, documentId, data });
        return {
            ...state,
            loading: false,
            data: {
            ...state.data,
            [`${collection}/${documentId}`]: data,
                  },
                };
        case 'FETCH_DIALOGUE_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
            case 'SET_CURRENT_DIALOGUE_INDEX':
                return {
                  ...state,
                  currentDialogueIndex: action.payload,
                };
            // Inside your dialogueReducer
            case 'HANDLE_END_DIALOGUE':
                // Ensure you return the new state correctly
                return {
                ...state,
                isDialogueVisible: false,
                currentDialogueIndex: 0,
                showModalNote: true, // Reset index or take other appropriate action
                // You may want to handle more state changes here
                };
            case 'SET_SHOW_MODAL_NOTE':
                return {
                    ...state,
                    showModalNote: action.payload,
                };
            case 'SET_SHOW_EGG_BOX':
                return {
                    ...state,
                    isDialogueVisible: false,
                    showModalNote: false,
                    showEggBox: action.payload,
                };
            case 'SET_SHOW_EGG_BOX_MODAL':
                return {
                ...state,
                showEggBoxModal: action.payload,
                };
            case 'SHOW_MODAL_IMAGE':
                    return { ...state, showModalImage: true };
            case 'HIDE_MODAL_IMAGE':
                    return { ...state, showModalImage: false };
            case 'SET_SHOW_OBJECT':
                return {
                ...state,
                showObject: action.payload,
                }
            case 'SET_SELECTED_UMBRELLAS':
                return {
                    ...state,
                    selectedUmbrellas: action.payload,
                }
            case 'SET_INCORRECT_ATTEMPTS':
                console.log('Current incorrectAttempts:', state.incorrectAttempts);
                console.log('Updating incorrectAttempts to:', action.payload);
                return {
                ...state,
                incorrectAttempts: action.payload,
                }
            case 'SET_DIALOGUE_DATA':
                return {
                    ...state,
                    dialogueData: action.payload,
                }
            case 'SET_IS_ORDER_CORRECT':
                return {
                    ...state,
                    isOrderCorrect: action.payload,
                }
            case 'SET_IS_VIDEO_PLAYING':
                return {
                    ...state,
                    isVideoPlaying: action.payload,
                }
            case 'IS_DIALOGUE_ACTIVE':
                return {
                    ...state,
                    isActive: action.payload,
                }
            case 'SET_ZOOM_TARGET':
                    return { ...state, zoomTarget: action.payload};
            case 'SET_ZOOM_ACTIVE':
                    return { ...state, zoomActive: action.payload }; 
            case 'SET_ZOOM_LEVEL':
                    return { ...state, zoomLevel: action.payload };
            case 'SET_SPHERICAL_COORDS':
                    return { ...state, sphericalCoords: action.payload.sphericalCoords };
            case 'SET_IMAGE_OPEN':
                const newState = { ...state, isImageOpen: action.payload };
//   console.log('SET_IMAGE_OPEN action received, new state:', newState);
  return newState;
            case 'SET_ZOOM_COMPLETE':
                console.log('SET_ZOOM_COMPLETE action received, new state:', action.payload);
            return {
                ...state,
            isZoomCompleted: action.payload,
            };
            case 'ENABLE_ZOOM':
                return {...state, enableZoom: action.payload};
            case 'SET_INTERACTED_ITEM':
                console.log('Interacted item:', action.payload); // Log to verify
                return {
                    ...state,
                    interactedItems: [...state.interactedItems, action.payload],
                };
            case 'SET_CURRENT_SELECTED_ITEM':
            return {
            ...state,
            currentSelectedItem: action.payload, 
            };
            case 'ADD_ITEM_USED':
            return {
                ...state,
                usedItems: {
                    ...state.usedItems,
                    [action.payload]: true,
                  },
            };
            case 'TOGGLE_SIDE_DRAWER':
            return { 
            ...state, 
            isDrawerOpen: !state.isDrawerOpen };
            case 'SAVE_CAMERA_STATE':
                console.log("Reducer saving camera state:", action.payload);
            return {
                ...state,
                cameraState: {
                    position: action.payload.position,
                    quaternion: action.payload.quaternion,
                    fov: action.payload.fov,
                },  
            };
            case 'FETCH_DIALOGUE_START':
            return {
                ...state,
                loading: true,
                error: null, // Clear previous errors on new fetch
            };
            case 'REQUEST_CAMERA_RESET':
            console.log("reset");
            return { ...state, requestCameraReset: true };
            
            case 'CLEAR_CAMERA_RESET_REQUEST':
            return { ...state, requestCameraReset: false };
            
        // Include all your other cases here
        case 'INCREMENT-ROTATION-ANGLE':
        case 'MANUAL_ROTATE':
            return {
                ...state,
                rotationAngle: state.rotationAngle + action.payload,
            };
            case 'TOGGLE_CONTROL_MODE':
                return {
                  ...state,
                  controlMode: state.controlMode === 'buttons' ? 'gyroscope' : 'buttons',
                };
            default:
            return state;
    }
};

export default dialogueReducer;
