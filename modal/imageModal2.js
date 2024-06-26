import React, {useState} from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';


const image = Image.resolveAssetSource(require('../assets/paper_chaper_1.png'));

function ImageModal2({ isVisible, onClose }) {

return (
    
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
        <View style={styles.modalContentContainer}>
        <ReactNativeZoomableView
          maxZoom={20}
          contentWidth={300}
          contentHeight={340}
          
        ><Image 
        source={image} 
        style={styles.imageStyle}
        
      />
      </ReactNativeZoomableView>
        </View>
</Modal>

  );
}

const styles = StyleSheet.create({
    modalContentContainer: {
        height: 380,
        width: 400,
        alignSelf: 'center', // Aligns the container in the center of the modal
        justifyContent: 'center', // Centers the content vertically within the container
      },
      imageStyle: {
        width: 240,
        height: 240,
        resizeMode: 'contain',
        marginLeft: 70,
      },
  });

  export default ImageModal2;

