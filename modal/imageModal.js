import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const image = Image.resolveAssetSource(require('../assets/umbrellas.png'));

console.log("Image Width:", image.width);
console.log("Image Height:", image.height);


function ImageModal({ isVisible, onClose }) {
  const imageWidth = 450;
  const imageHeight = 200;
  const umbrellaWidth = 42;
  const umbrellaHeight = 160;
  const numberOfUmbrellas = 7;
  const umbrellaPositions = [];
  const yPosition = imageHeight / 2; // This will be the middle of the image on the Y-axis

  for (let i = 0; i < numberOfUmbrellas; i++) {
    const xPosition = umbrellaWidth * i;
    umbrellaPositions.push({ x: xPosition, y: yPosition }); // Using the calculated middle Y position
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      backdropColor='black'
      backdropOpacity={0.7}
    >
  <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center' }}>
    <Image 
      source={image} 
      style={{ width: 450, height: 200 }} 
      resizeMode="contain"  
    />
    <TouchableOpacity onPress={onClose}>
      <Text style={{ color: 'white'}}>Close</Text>
    </TouchableOpacity>
    {umbrellaPositions.map((pos, index) => {
      console.log("Umbrella index:", index + 1, "Position:", pos);
      

      return (
        <React.Fragment key={index}>
          <TouchableOpacity
            style={{ position: 'absolute', left: pos.x, top: pos.y, width: umbrellaWidth, height: umbrellaHeight, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => handleUmbrellaPress(index + 1)}
          >
            {/* Optional: Add additional content if needed */}
          </TouchableOpacity>
          <View style={{ 
              position: 'absolute', 
              zIndex: 1,
              left: pos.x + (umbrellaWidth / 0.173), 
              top: pos.y + (umbrellaHeight / 2), 
              justifyContent: 'ccenter', 
              alignItems: 'center', 
            }}>
            <Text style={{ color: 'white', fontSize: 12 }}>{index + 1}</Text>
          </View>
        </React.Fragment>
      );
    })}
  </View>
</Modal>
  );
        }

export default ImageModal;


