import React from "react";
import { TouchableOpacity, Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleControlMode } from "../actions/dialogueActions";

const ModeToggleControl = () => {
    const dispatch = useDispatch();
  // Access Redux state to determine if showModalNote or isDialogueActive
  const showModalNote = useSelector(state => state.dialogue.showModalNote);
  const isDialogueActive = useSelector(state => state.dialogue.isDialogueActive);

    const handleToggle = () => {
        dispatch(toggleControlMode());
    };

    if (showModalNote || isDialogueActive) {
        return null;
      }

    return (
        <TouchableOpacity 
        style={{ position: 'absolute', top: 30, right: 20 }} 
        onPress={handleToggle}>
        <Image 
          source={require('../assets/push_ui.png')} 
          style={{ width: 40, height: 40 }} 
        />
      </TouchableOpacity>
    );
  };


export default ModeToggleControl;
