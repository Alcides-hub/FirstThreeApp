import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import TypeWriter from 'react-native-typewriter';
import { useFonts, PatuaOne_400Regular } from "@expo-google-fonts/patua-one";


const DialogueBox1 = ({ isVisible, content, onClose }) => {
  const [patuaLoaded] = useFonts({
    PatuaOne_400Regular,
  });
  if (!patuaLoaded) {
    return null; // Return a loading state or fallback component here
  }
    if (!isVisible) return null;
  
    return (
      <View style={styles.dialogueBox}>
        <TypeWriter typing={1} minDelay={-100}>
        <Text style={styles.dialogueText}>{content}</Text>
        </TypeWriter>
        <TouchableWithoutFeedback onPress={onClose}>
          <Text>Close</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  };
    
      const styles = StyleSheet.create({
        dialogueBox: {
          width: 200,
          minHeight: 100,
          padding: 10,
          backgroundColor: 'beige',
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 5, // for android shadow
          shadowColor: '#000', // for ios shadow
          shadowOffset: { width: 0, height: 2 }, // for ios shadow
          shadowOpacity: 0.25, // for ios shadow
          shadowRadius: 3.84, // for ios shadow
          position: 'absolute',
          left: '80%',
          top: '50%',
          transform: [{ translateX: -150 }, { translateY: -50 }] // Centers the dialogue box
        },
        dialogueText: {
          fontFamily: 'PatuaOne_400Regular',
          lineHeight: 25,
          color: 'black',
        }
      });
      
      export default DialogueBox1;