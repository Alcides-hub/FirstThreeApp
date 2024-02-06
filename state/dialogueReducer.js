const initialState = {
    isDialogueVisible: true,
    loading: false,
    data: null,
    error: null,
    currentDialogueIndex: 0, // Add this line
    showModalNote: false,
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
  
        default:
            return state;
    }
};

export default dialogueReducer;
