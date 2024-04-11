import React, {useRef, useState, useEffect} from 'react';
import { View, Image, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {fetchDialogue, setImageOpen, handleEndDialogue, setDialogueData, setIncorrectAttempts, setisCorrectOrder, setSelectedUmbrellas, setDialogueVisibility, setIsCorrectOrder } from '../actions/dialogueActions';
import Modal from 'react-native-modal';
// import { db } from '../firebaseConfig';
// import { initializeApp } from "firebase/app";
import CharacterImage from '../components/character'
import DialogueBox from '../components/dialogueBox'; 
const image = Image.resolveAssetSource(require('../assets/umbrellas.png'));
// import { doc, getDoc } from "firebase/firestore/lite";


  // Single icon source for all umbrellas
  const umbrellaIcon = require('../assets/umbrellaIcon/pick.png');

  // const firebaseConfig = {
  //   apiKey: "AIzaSyD_pXgo9SF67fDf4r_ibq-lV3ctbLdar9k",
  //   authDomain: "tokkaidoapp.firebaseapp.com",
  //   databaseURL:
  //     "https://tokkaidoapp-default-rtdb.asia-southeast1.firebasedatabase.app",
  //   projectId: "tokkaidoapp",
  //   storageBucket: "tokkaidoapp.appspot.com",
  //   messagingSenderId: "756050415760",
  //   appId: "1:756050415760:web:9b0385bbf413d444964815",
  //   measurementId: "G-Z12YHWVYDT",
  // };
  // const app = initializeApp(firebaseConfig);
  
  

function ImageModal({ isVisible, onClose, onCorrectOrder }) {
  const imageWidth = 450;
  const imageHeight = 300;
  const umbrellaWidth = 32.3;
  const umbrellaHeight = 100;
  const numberOfUmbrellas = 7;
  const umbrellaPositions = [];
  const yPosition = imageHeight / 3; // This will be the middle of the image on the Y-axis
   // State to track the sequence of selected umbrellas
   const dispatch = useDispatch();
    // const dialogueKey = 'kasa_comments/kasa_erande_fail1'; // This combines your collection and documentId
    
    const { incorrectAttempts, selectedUmbrellas} = useSelector((state) => state.dialogue);
    // const currentDialogueKey = `kasa_comments/kasa_erande_fail${incorrectAttempts + 1}`;
    // const dialogueData = data[currentDialogueKey] || {}; // Safely access the specific dialogue data
    // const currentDialogue = dialogueData || {};
    const isActive = useSelector(state => state.dialogue);
    // console.log("isActive state:", isActive);
    const currentDialogueKey = `kasa_comments/kasa_erande_fail${incorrectAttempts}`;
    const currentDialogue = useSelector((state) => state.dialogue.data[currentDialogueKey]) || {};
    console.log("Current Dialogue Key:", currentDialogueKey);
    console.log("Current Dialogue:", currentDialogue);
    const [showDialogue, setShowDialogue] = useState(false);

    
    // console.log("Dialogue Data:", dialogueData);
    // console.log("Current Dialogue:", currentDialogue);
  //  const [selectedUmbrellas, setSelectedUmbrellas] = useState([]);
  //  const [dialogueData, setDialogueData] = useState(null);
   // State to hold the current dialogue item
  //  const [currentDialogue, setCurrentDialogue] = useState(null);
   
   const [characterEmotion, setCharacterEmotion] = useState(null);
  //  const [isDialogueActive, setIsDialogueActive] = useState(false);
  //  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
   
  
 

   const customCharacterStyle = styles.customCharacterStyle;
   const customDialogueStyle = styles.customDialogueStyle;

   
   
  //  const fetchDialogue = async (dialogueId) => {
  //   try {
  //     const documentSnapshot = await getDoc(doc(db, "kasa_comments", dialogueId));
  //     if (documentSnapshot.exists()) {
  //       setDialogueData(documentSnapshot.data());
  //       setIsDialogueActive(true);
  //     } else {
  //       console.log(`Document not found: ${dialogueId}`);
  //     }
  //   } catch (error) {
  //     console.error(`Error fetching dialogue: ${dialogueId}`, error);
  //   }
  // };
  // useEffect(() => {
  //   dispatch(fetchDialogue("kasa_comments", "kasa_welcome"));
    
  // }, [dispatch]);
  
// Update the currentDialogue whenever currentDialogueIndex changes
// useEffect(() => {
//   if (dialogueData) {
//     dispatch(setDialogueData(dialogueData)); // I am not sure here if it's setCurrentData with dialogueData? Do I need to create a state here?
//   }
// }, [dialogueData]);

// console.log("Component is rendering");

const handleUmbrellaPress = (umbrellaIndex) => {
  // Calculate the new state here instead of in the action creator
  const newSelectedUmbrellas = [...selectedUmbrellas, umbrellaIndex];
  dispatch(setSelectedUmbrellas(newSelectedUmbrellas));
};


useEffect(() => {
  if (selectedUmbrellas.length === 3) {
    const requiredOrder = [7, 5, 2];
    const isCorrectOrder = selectedUmbrellas.length === requiredOrder.length && 
    selectedUmbrellas.every((val, index) => val === requiredOrder[index]);

    if (!isCorrectOrder) {
      const newAttemptNumber = incorrectAttempts + 1;
      console.log("Dispatching new attempt number: ", incorrectAttempts + 1);
      // dispatch(fetchDialogue(`kasa_erande_fail${newAttemptNumber}`));
      console.log(`Fetching dialogue for attempt number: ${newAttemptNumber}`);
      dispatch(fetchDialogue("kasa_comments", `kasa_erande_fail${newAttemptNumber}`));
      dispatch(setIncorrectAttempts(newAttemptNumber));
      setShowDialogue(true);
      // setStartHideTimeout(true);
      // dispatch(setImageOpen(false));
      console.log(newAttemptNumber, "failed?")
    } else {
      if (typeof onCorrectOrder === 'function') {
        // dispatch(setIsCorrectOrder(true));
        onCorrectOrder();
        onClose();
        console.log("Correct order achieved");
      } else {
        console.error("onCorrectOrder is not a function");
      }

      // These actions should happen regardless of whether onCorrectOrder is a function
      // dispatch(isDialogueActive(false));
      dispatch(setIncorrectAttempts(0)); // Reset attempts on success
    }
    dispatch(setSelectedUmbrellas([])); // Reset for next attempt
  }
}, [selectedUmbrellas, onCorrectOrder]);

        


  for (let i = 0; i < numberOfUmbrellas; i++) {
    const xPosition = umbrellaWidth * i;
    umbrellaPositions.push({ x: xPosition, y: yPosition }); // Using the calculated middle Y position
  }

  // useEffect to handle the hiding of dialogue after a certain time
  useEffect(() => {
    let timeoutId;
  if (showDialogue) {
    timeoutId = setTimeout(() => {
      setShowDialogue(false); // Hide dialogue after 5 seconds
    }, 9000);
  }

  return () => clearTimeout(timeoutId); // Cleanup timeout
}, [showDialogue]);


// Animated value for the pulsing effect
const scaleAnim = React.useRef(new Animated.Value(1)).current;

// Function to start the pulsing animation
const startPulsing = () => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]),
  ).start();
};

// Start the animation when the component mounts
React.useEffect(() => {
  startPulsing();
}, []);

// console.log("Image Width:", image.width);
// console.log("Image Height:", image.height);


  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      backdropColor='black'
      backdropOpacity={0.1}
    >
  <View style={{  alignItems: 'center', justifyContent: 'center' }}>
    <Image 
      source={image} 
      style={{ width: 500, height: 330 }} 
      resizeMode="contain"  
    />
    <TouchableOpacity onPress={onClose}>
      <Text style={{ color: 'grey'}}>X</Text>
    </TouchableOpacity>
    {umbrellaPositions.map((pos, index) => {
      // console.log("Umbrella index:", index + 1, "Position:", pos);

      return (
        <React.Fragment key={index}>
          <TouchableOpacity
            style={{ position: 'absolute', left: pos.x, top: pos.y, width: umbrellaWidth, height: umbrellaHeight, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => handleUmbrellaPress(index + 1)}
          > 
          <View style={{ 
            position: 'absolute', 
            zIndex: 1,
            left: pos.x + (umbrellaWidth / 0.18), 
            top: pos.y + (umbrellaHeight / 19.9), 
            justifyContent: 'center', 
            alignItems: 'center', 
          }}>
            <Animated.Image
          source={umbrellaIcon}
          style={{ width: 20, 
            height: 20,
            transform: [{ scale: scaleAnim }]}} // Adjust size as needed
          resizeMode="contain"
          />
          </View>
          </TouchableOpacity>
        </React.Fragment>
      );
    })}
    
  </View>
  {
   incorrectAttempts > 0  && currentDialogue && isActive && showDialogue && (
    <>
      <CharacterImage characterEmotion={currentDialogue.characterEmotion} customCharacterStyle={customCharacterStyle} />
      <DialogueBox currentDialogue={currentDialogue} characterName={currentDialogue.name} customDialogueStyle={customDialogueStyle}  />
    </>
   
  )
}

</Modal>
  );
  }



const styles = StyleSheet.create({
  customCharacterStyle: {
    position: 'absolute',
      right: 630, // Adjust as needed for positioning
      bottom: 75, // Adj
      height: 200,
      width: 120,
    },
  customDialogueStyle: {
      position: 'absolute',
      left: 10, // Adjust as needed for positioning
      bottom: -10, // Adj
  },
});

export default ImageModal;

