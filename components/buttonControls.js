import React from 'react';
import { View, Button, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const TouchControls = ({ onRotate }) => {
  const handleLeftPress = () => {
    if (onRotate) onRotate(35);
  };

  const handleRightPress = () => {
    if (onRotate) onRotate(-35);
  };

  const verticalCenter = Dimensions.get('window').height / 2 - 20; // Adjusting for the button height

  return (
    <>
      <View style={[styles.buttonContainer, { top: verticalCenter, left: 20 }]}>
        <TouchableOpacity title="Left" onPress={handleLeftPress}>
        <FontAwesomeIcon icon={faChevronLeft} size={22}/>
        </TouchableOpacity>
      </View>
      <View style={[styles.buttonContainer, { top: verticalCenter, right: 20 }]}>
        <TouchableOpacity title="Right" onPress={handleRightPress}>
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
