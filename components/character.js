import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const CharacterImage = ({ characterEmotion, style }) => {
  let image;
  const welcomeImage = require('../assets/character/welcome.png');
  const talkingImage = require('../assets/character/talking.png');


  switch(characterEmotion) {
    case 'excited' : 
      image = welcomeImage;
      break;
    case 'happy':
      image = talkingImage;
      break;
    default: 
      image = welcomeImage;
  }


return (
  <View>
  <Image 
  source={image}
  style={styles.image}
  resizeMode='contain'
  />
  </View>
)
};

const styles = StyleSheet.create({
    
    image: {
      position: 'absolute',
      right: 50, // Adjust as needed for positioning
      bottom: 85, // Adj
      height: 240,
      width: 160,
    },
  });


export default CharacterImage;