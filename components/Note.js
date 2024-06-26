import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setShowModalNote, setShowEggBox, setInteractedItem, setCurrentSelectedItem } from '../actions/dialogueActions';
import { useSelector } from 'react-redux';
import { db } from '../firebaseConfig'; // Make sure this path is correct
import { collection, doc, setDoc } from 'firebase/firestore';
import { pushInteractedItemToFirestore } from '../scripts/firestoreService';
import { normalizeItemName } from '../utils/utils';

const Note = () => {
  const showModalNote = useSelector(state => state.dialogue.showModalNote);
  const dispatch = useDispatch();
  

  if (!showModalNote) return null;


  const handleCloseNoteModal = async (itemName) => {
    // Normalize the item name when modal is closed and item is interacted with
    const normalizedItem = normalizeItemName({ name: itemName, image: 3 }); // Assuming 'image: 3' is correct for all items, adjust as necessary

    // Close the modal
    dispatch(setShowModalNote(false));
    // Optionally show the egg box or handle other UI logic
    dispatch(setShowEggBox(true));
    // Mark the item as interacted in the Redux state with the normalized item name
    dispatch(setInteractedItem(normalizedItem.name)); // Dispatch with normalized name
    // Update Firestore to mark the item as interacted, using the full normalized item
    await pushInteractedItemToFirestore(normalizedItem.name);
  };
  

  return (
    <View style={styles.noteContainer}>
      <TouchableOpacity style={styles.touchableContainer} onPress={() => handleCloseNoteModal("note1")} >
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
