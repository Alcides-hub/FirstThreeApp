const initialState = {
    isDialogueVisible: true,
    loading: false,
    data: null,
    error: null,
    currentDialogueIndex: 0, // Add this line
    showModalNote: false,
    showEggBox: false,
    sphericalCoords: null,
    zoomLevel: 15,
    zoomActive: false,
    isZoomCompleted: false,
    isImageOpen: false,
    interactedItems: [],
    currentSelectedItem: null,
    usedItems: [],
    isDrawerOpen: false,
    cameraState: null,
    showEggBoxModal: false,
    showModalImage: false,
    showObject: false,
  };

const dialogueReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DIALOGUE_VISIBILITY':
            return {
                ...state,
                isDialogueVisible: action.payload,
            };
        case 'FETCH_DIALOGUE_START':
            return {
                ...state,
                loading: true,
                error: null, // Clear previous errors on new fetch
            };
        case 'FETCH_DIALOGUE_SUCCESS':
            return {
                ...state,
                loading: false,
                data: action.payload,
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
            case 'SET_SHOW_MODAL_IMAGE':
                return {
                ...state,
                showModalImage: action.payload,
                }
            case 'SET_SHOW_OBJECT':
                return {
                ...state,
                showObject: action.payload,
                }
            case 'SET_ZOOM_ACTIVE':
                return {
                    ...state,
                    zoomActive: action.payload,
                };
                case 'SET_ZOOM_PARAMS':
                    return {
                      ...state,
                      sphericalCoords: action.payload.sphericalCoords, // Update with the plain object
                      zoomLevel: action.payload.zoomLevel, // Update zoom level
                    };
            case 'SET_IMAGE_OPEN':
                return {
                    ...state,
                    isImageOpen: action.payload,
                };                
            case 'SET_ZOOM_COMPLETE':
            return {
                ...state,
            isImageOpen: true,
            onZoomComplete: action.payload,
            };
            case 'SET_INTERACTED_ITEM':
                return {
                    ...state,
                    interactedItems: state.interactedItems.includes(action.payload) ? state.interactedItems : [...state.interactedItems, action.payload],
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
            return {
                ...state,
                cameraState: action.payload,
            };
            case 'RESTORE_CAMERA_STATE':
            return state;
            default:
            return state;
    }
};

export default dialogueReducer;
