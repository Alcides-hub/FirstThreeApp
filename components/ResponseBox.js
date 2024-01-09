import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFonts, PatuaOne_400Regular } from "@expo-google-fonts/patua-one";

const renderOptionPair = (option1, option2, option3, index, handleOptionPress) => (
    <View key={index} style={styles.optionPairContainer}>
      {option1 && (
        <TouchableOpacity onPress={() => handleOptionPress(option1.nextDialogueId)} style={styles.option}>
          <View style={styles.optionContainer}>
            <Text style={styles.optionText}>{option1.text}</Text>
          </View>
        </TouchableOpacity>
      )}
      {option2 ? (
        <TouchableOpacity onPress={() => handleOptionPress(option2.nextDialogueId)} style={styles.option}>
          <View style={styles.optionContainer}>
            <Text style={styles.optionText}>{option2.text}</Text>
          </View>
        </TouchableOpacity>
      ) : <View style={styles.option} />}
      {option3 ? (
        <TouchableOpacity onPress={() => handleOptionPress(option2.nextDialogueId)} style={styles.option}>
          <View style={styles.optionContainer}>
            <Text style={styles.optionText}>{option3.text}</Text>
          </View>
        </TouchableOpacity>
      ) : <View style={styles.option} />}
    </View>
  );
  

  const ResponseBox = ({ currentDialogue, handleOptionPress }) => {
    if (!currentDialogue || !currentDialogue.options) {
      return null;
    }
  
    // Group options into pairs
    const optionPairs = [];
    for (let i = 0; i < currentDialogue.options.length; i += 2) {
      optionPairs.push([
        currentDialogue.options[i],
        currentDialogue.options[i + 1] || null
      ]);
    }
  
    return (
        <View>
          {optionPairs.map((pair, index) => 
            renderOptionPair(pair[0], pair[1], index, handleOptionPress)
          )}
        </View>
      );
    };
    
    
const styles = StyleSheet.create({

    optionPairContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20, // Space between rows
        position: 'absolute',
        left: 130, // Adjust this value as needed to position next to the character
        bottom: 165,
      },
      optionContainer: {
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "beige",
        padding: 7,
        borderRadius: 10,
        minWidth: 50,
        maxWidth: 250,
        marginRight: 29,
        // Other styles as needed
      },
    optionText: {
        fontSize: 16,
        marginVertical: 7,
        color: "darkorange",
        fontFamily: 'PatuaOne_400Regular',
        
      },
  });
  
  export default ResponseBox;
  