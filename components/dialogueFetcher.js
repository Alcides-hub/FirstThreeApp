import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDialogueVisibility, fetchDialogue, setCurrentDialogueIndex, handleEndDialogue } from '../actions/dialogueActions'; // Adjust path as necessary
import DialogueBox from './dialogueBox';
import CharacterImage from './character';
import * as Font from 'expo-font';


async function loadFonts() {
    await Font.loadAsync({
      'PatuaOne-Regular': require('../assets/fonts/PatuaOne-Regular.ttf')
    });
  }
  
  loadFonts();
  
  

  export default function dialogueFetcher() {
    const dispatch = useDispatch();
    const { isDialogueVisible, data: dialogueData, currentDialogueIndex } = useSelector((state) => state.dialogue);
    const currentDialogue = dialogueData?.dialogueList[currentDialogueIndex];
    // Fetch the dialogue data from Firestore once
    // console.log({ isDialogueVisible, dialogueData, currentDialogueIndex });

        useEffect(() => {
            dispatch(fetchDialogue("kasa_start"));
            
        }, [dispatch]);
        
 
        const handleNextDialogue = () => {
            const nextIndex = currentDialogueIndex + 1;
            if (dialogueData && nextIndex < dialogueData.dialogueList.length) {
              if (dialogueData.dialogueList[nextIndex].order === 4) {
                console.log("Ending dialogue, showModalNote should now be true");
                // If the next dialogue's order is 4, end the dialogue.
                dispatch(handleEndDialogue());
              } else {
                // Otherwise, set the current index to the next one.
                dispatch(setCurrentDialogueIndex(nextIndex));
              }
            } else {
              // If there's no next dialogue, end the dialogue.
              console.log("End of dialogue reached");
              dispatch(handleEndDialogue());
            }
          };
          
  

  return (
      <>
      {isDialogueVisible && <CharacterImage characterEmotion={currentDialogue?.emotion} />}
      {isDialogueVisible && <DialogueBox currentDialogue={currentDialogue} characterName={currentDialogue?.name} handleOptionPress={handleNextDialogue} />}
    </>
  );
};
  
  

