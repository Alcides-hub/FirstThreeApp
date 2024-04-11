import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TypeWriter from 'react-native-typewriter';
import { useFonts, PatuaOne_400Regular } from "@expo-google-fonts/patua-one";
import {useSelector, useDispatch} from 'react-redux';
import {setDialogueVisibility} from '../actions/dialogueActions';


const DialogueBox = ({currentDialogue, characterName, handleOptionPress, customDialogueStyle, onDialogueComplete}) => {
  console.log('Custom Style dialogue:', customDialogueStyle);
  console.log(currentDialogue, 'current data rendered');
  console.log(characterName, 'What is my name?');
  const isActive = useSelector((state) => state.dialogue);
  const dispatch = useDispatch();

  const handleDialogueComplete = () => {
    console.log('About to hide dialogue');
    if (onDialogueComplete) {
      onDialogueComplete();
    }
    // dispatch(setDialogueVisibility(false));
  };
    if (!isActive) {
      return null;
    }
 
  
  
  const [patuaLoaded] = useFonts({
    PatuaOne_400Regular,
  });
  if (!patuaLoaded) {
    return null; // Return a loading state or fallback component here
  }
    // Check if currentDialogue is null before attempting to access its properties
    if (!currentDialogue) {
        return <View style={styles.transparentBackgroundisLandscape}><Text>Loading...</Text></View>;
    }
  
  return (
    
    <TouchableOpacity style={[styles.transparentBackgroundisLandscape, customDialogueStyle]} onPress={handleOptionPress}>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{characterName}</Text>
      </View>
    <View style={styles.dialogueBoxText}>
      <TypeWriter typing={1} minDelay={-100} >
        <Text style={styles.dialogueText}>{currentDialogue.dialogue}</Text>
      </TypeWriter>
    </View>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  transparentBackgroundisLandscape: {
    position: 'absolute',
    zIndex: 2,
      left: 50, // Adjust as needed for positioning
      bottom: 20, // Adj
    backgroundColor: 'rgba(245, 245, 220, 0.5)', // Replace with your actual color and transparency
    borderWidth: 1,
    borderColor: "white",
    minHeight: 50,
    width: 760,
    marginBottom: 13,
    alignSelf: "center", 
},
  dialogueBoxText: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  dialogueText: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'PatuaOne_400Regular',
    lineHeight: 25,
    color: 'black',
  },
  nameContainer: {
  backgroundColor: 'rgba(245, 245, 220, 0.5)', // Replace with your actual color and transparency
  borderWidth: 1,
  borderColor: "blue",
  minHeight: 20,
  width: 100,
  marginBottom: 3,
  alignSelf: 'flex-start', // Align to the start of the parent container
  },
  nameText: {
    fontSize: 16,
    margin: 3,
    fontFamily: 'PatuaOne_400Regular',
    lineHeight: 25,
    color: 'black',
  }

});

export default DialogueBox;
