import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { useNavigation } from "@react-navigation/native";
//   import { AntDesign } from "@expo/vector-icons";
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchDialogue} from '../actions/dialogueActions'; 
  import CharacterImage from "./character";
  import ResponseBox from "./ResponseBox";
  import DialogueBox from "./dialogueBox";

  export default function TutorialScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // Initialize the dialogue ID state first.
    const initialDialogueId = 'tutorialstart';
    const [currentDialogueId, setCurrentDialogueId] = useState(initialDialogueId);

    // Now define dialogueKey using the state.
    const dialogueKey = `tutorial/${currentDialogueId}`;
    const currentDialogue = useSelector(state => state.dialogue.data[dialogueKey]);
    const fetchError = useSelector(state => state.dialogue.error);


    useEffect(() => {
        // Fetch the initial dialogue data using the state.
        dispatch(fetchDialogue('tutorial', currentDialogueId));
    }, [dispatch, currentDialogueId]); // Include currentDialogueId to re-fetch on its change

    const handleNextDialogue = (nextDialogueId) => {
        console.log('Handling next dialogue:', nextDialogueId);
        if (nextDialogueId === "map") {
            console.log("Navigating to map");
            navigation.navigate('map');
        } else {
            console.log("Fetching next dialogue for ID:", nextDialogueId);
            // Update the dialogue ID in the state.
            setCurrentDialogueId(nextDialogueId);
        }
    };

    if (!currentDialogue && !fetchError) return <Text>Loading dialogue...</Text>;
    if (fetchError) return <Text>Error loading dialogue. Please try again.</Text>;

    const image = require("../assets/TokaidoImageBack2.jpeg");

    return (
        <>
            <ImageBackground
                source={image}
                style={styles.ImageBackgroundLandscape}
                resizeMode="cover"
            >
                {/* Render the response and dialogue boxes only if currentDialogue is not null */}
                {currentDialogue && (
                    <>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
                        <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'center', marginTop: 50 }}></View>
                        <ResponseBox
                            style={styles.ResponseBoxLandscape}
                            currentDialogue={currentDialogue}
                            handleOptionPress={handleNextDialogue}
                        />
                        <CharacterImage
                            style={styles.CharacterImageLandscape}
                            characterEmotion={currentDialogue?.characterEmotion}
                        />
                        <DialogueBox
                            style={styles.DialogueBoxLandscape}
                            characterName={currentDialogue?.name}
                            currentDialogue={currentDialogue}
                        />
                        </View>
                    </>
                )}
            </ImageBackground>
        </>
    );
}
  const styles = StyleSheet.create({
  
    ResponseBox: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    ResponseBoxLandscape: {
      
    },
    ImageBackgroundLandscape: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    // CharacterImage: {
    //   flex: 2,
    //   justifyContent: 'center',
    // },
    CharacterImageLandscape: {
      flex: 1,
    },
    // DialogueBox: {
    //   // flex: 1,
    // },
    DialogueBoxLandscape: {
      flex: 0.3,
    }
  });
  