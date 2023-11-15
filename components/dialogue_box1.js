import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DialogueBox1 = ({ isVisible, content, onClose }) => {
    if (!isVisible) return null;
  
    return (
      <View style={styles.dialogueBox}>
        <Text style={styles.dialogueText}>{content}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };
    
      const styles = StyleSheet.create({
        dialogueBox: {
          width: 300,
          minHeight: 100,
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 5, // for android shadow
          shadowColor: '#000', // for ios shadow
          shadowOffset: { width: 0, height: 2 }, // for ios shadow
          shadowOpacity: 0.25, // for ios shadow
          shadowRadius: 3.84, // for ios shadow
          position: 'absolute',
          left: '50%',
          top: '88%',
          transform: [{ translateX: -150 }, { translateY: -50 }] // Centers the dialogue box
        },
        dialogueText: {
          fontStyle: 'normal',
        }
      });
      
      export default DialogueBox1;