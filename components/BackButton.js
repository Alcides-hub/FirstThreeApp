import React from 'react';
// import {useThree} from '@react-three/fiber/native';
import {useDispatch, useSelector} from 'react-redux';
import { TouchableOpacity, Image } from 'react-native';
import {setZoomActive} from '../actions/dialogueActions';
import { requestCameraReset } from '../actions/dialogueActions';


function BackButton() {
    const dispatch = useDispatch();
    const {isDialogueVisible, showModalNote } = useSelector((state) => state.dialogue);
    
  
    
    
    const handleBackButtonClick = () => {
      dispatch(setZoomActive(true));
      console.log("Please handle back button: ");
      dispatch(requestCameraReset(true));
      
    }

    if (isDialogueVisible || showModalNote) {
      return null; // Ensures Hotspot is not rendered if dialogue or modal note is visible, or if imageTexture hasn't loaded
      }

    return (
     <TouchableOpacity onPress={handleBackButtonClick} style={{position: 'absolute', bottom: 50, right: 20}}>
      <Image source={require('../assets/back.png')} style={{ width: 50, height: 50 }} />
     </TouchableOpacity>
          )
}

export default BackButton;