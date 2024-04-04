import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { manualRotate } from '../actions/dialogueActions';
import { useDispatch, useSelector } from 'react-redux';


const TouchControls = () => {

  const {isDialogueVisible} = useSelector((state) => state.dialogue);
  const dispatch = useDispatch();

  const handleLeftPress = () => {
   dispatch(manualRotate(35)); // Assuming positive angle for left rotation
  };

  const handleRightPress = () => {
    dispatch(manualRotate(-35)); // Assuming positive angle for left rotation
  };

  const verticalCenter = Dimensions.get('window').height / 2 - 20; // Adjusting for the button height

  
  if (isDialogueVisible) {
    return null; // Component is not rendered when dialogue is active
  }

  // Render touch controls when dialogue is not active
  return (
    <>
      <View style={[styles.buttonContainer, { top: verticalCenter, left: 20 }]}>
        <TouchableOpacity onPress={handleLeftPress}>
          <FontAwesomeIcon icon={faChevronLeft} size={22}/>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, { top: verticalCenter, right: 20 }]}>
        <TouchableOpacity onPress={handleRightPress}>
          <FontAwesomeIcon icon={faChevronRight} size={22}/>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    padding: 10,
  }
});

export default TouchControls;