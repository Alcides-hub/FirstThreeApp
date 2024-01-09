import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Note = ({ onPress, showNote }) => {
  if (!showNote) return null;

  return (
    <View style={styles.noteContainer}>
      <TouchableOpacity style={styles.touchableContainer} onPress={() => onPress('Note')}>
        <Image
          source={require("../assets/paper_chaper_1.png")}
          style={styles.noteImage}
        />
        <Text style={styles.noteText}>You received a note! Touch to add in toolbox.</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  noteImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  noteText: {
    marginLeft: 10, 
    color: 'white',
    alignSelf: 'center', // Align text center vertically
  },
});

export default Note;
