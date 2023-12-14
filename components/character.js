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
      right: 10, // Adjust as needed for positioning
      bottom: 10, // Adj
      height: 300,
      width: 230,
    },
  });


export default CharacterImage;