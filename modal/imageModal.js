import React from 'react';
import { Modal, Image, TouchableOpacity } from 'react-native';

function ImageModal({ isVisible, onClose}) {

    console.log("Hi", isVisible)
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isVisible} // Here isVisible is used
      onRequestClose={onClose} // This is the proper prop to handle modal closing
    >
      <TouchableOpacity style={{ flex: 1 }} onPress={onClose}>
        <Image 
          source={require('../assets/closeupDolphin.jpg')} 
          style={{ flex: 1, width: '100%', height: '100%' }} 
          resizeMode="cover" 
        />
      </TouchableOpacity>
    </Modal>
  );
}

export default ImageModal;
