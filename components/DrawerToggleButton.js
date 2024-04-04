// DrawerToggleButton.js
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideDrawer } from '../actions/dialogueActions'; // Adjust the import path as necessary

const DrawerToggleButton = () => {
  const dispatch = useDispatch();
  const showModalNote = useSelector(state => state.dialogue.showModalNote);
  const isDialogueActive = useSelector(state => state.dialogue.isActive);

  // Only show the toggle button when conditions are met
  if (showModalNote || isDialogueActive) {
    return null;
  }

  return (
    <TouchableOpacity style={{ position: 'absolute', top: 30, left: 20 }} onPress={() => dispatch(toggleSideDrawer())}>
      <Image source={require('../assets/inventory.png')} style={{ width: 50, height: 50 }} />
    </TouchableOpacity>
  );
};

export default DrawerToggleButton;
