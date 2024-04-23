import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFonts, PatuaOne_400Regular } from "@expo-google-fonts/patua-one";

const renderOptionPair = (option1, option2, option3, option4, index, handleOptionPress) => (
  <View key={index} style={styles.optionPairContainer}>
    {option1 && (
      <TouchableOpacity onPress={() => handleOptionPress(option1.nextDialogueId)} style={styles.option}>
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>{option1.text}</Text>
        </View>
      </TouchableOpacity>
    )}
    {option2 && (
      <TouchableOpacity onPress={() => handleOptionPress(option2.nextDialogueId)} style={styles.option}>
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>{option2.text}</Text>
        </View>
      </TouchableOpacity>
    )}
    {option3 && (
      <TouchableOpacity onPress={() => handleOptionPress(option3.nextDialogueId)} style={styles.option}>
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>{option3.text}</Text>
        </View>
      </TouchableOpacity>
    )}
    {option4 && (
      <TouchableOpacity onPress={() => handleOptionPress(option4.nextDialogueId)} style={styles.option}>
        <View style={styles.optionContainer}>
          <Text style={styles.optionText}>{option4.text}</Text>
        </View>
      </TouchableOpacity>
    )}
  </View>
);

const ResponseBox = ({ currentDialogue, handleOptionPress }) => {
  if (!currentDialogue || !currentDialogue.options) {
    return null;
  }
  const [patuaLoaded] = useFonts({
    PatuaOne_400Regular,
  });
  if (!patuaLoaded) {
    return null; // Return a loading state or fallback component here
  }

  // Group options into pairs or more based on requirement
  const optionGroups = [];
  for (let i = 0; i < currentDialogue.options.length; i += 4) {
    optionGroups.push([
      currentDialogue.options[i],
      currentDialogue.options[i + 1] || null,
      currentDialogue.options[i + 2] || null,
      currentDialogue.options[i + 3] || null,
    ]);
  }

  return (
    <View>
      {optionGroups.map((group, index) => 
        renderOptionPair(group[0], group[1], group[2], group[3], index, handleOptionPress)
      )}
    </View>
  );
};

    
const styles = StyleSheet.create({

    optionPairContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 40, // Space between rows
        position: 'absolute',
        right: 460, // Adjust this value as needed to position next to the character
        bottom: 120,
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
    option: {
      marginBottom: 20,
    }
  });
  
  export default ResponseBox;
  