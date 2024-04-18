import React, {useRef, useState, useEffect} from 'react';
import { Box, FlatList, Image, Pressable } from 'native-base';
import {View, Dimensions, TouchableOpacity, Text } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { showModalImage ,hideModalImage, toggleSideDrawer, setCurrentSelectedItem, setInteractedItem, addUsedItem } from '../actions/dialogueActions';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firestore instance
import ImageModal2 from '../modal/imageModal2'; 
// import { clearFirestoreCollection } from '../scripts/clearFirestoreCollection' // Adjust path as needed



const eggBox = require('../image/eggBox.jpg');
const Note1 = require('../image/paper_chaper_1.png');


const SideDrawerOption = (onLook, onUseItem) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const flatListRef = useRef(null);
    const drawerBackgroundImage = require('../assets/mainBoard.png'); // Adjust the path
    const [chosenItem, setChosenItem] = useState(null);
    const dispatch = useDispatch();
    const window = Dimensions.get('window');
    const [items, setItems] = useState([]);
    const isDrawerOpen = useSelector((state)=> state.dialogue.isDrawerOpen);
    const showModal = useSelector((state) => state.dialogue.showModalImage);
    const imageMap = {
      Eggbox: eggBox,
      note1: Note1,
    };
    const interactedItems = useSelector((state) => state.dialogue.interactedItems);
    const NUM_VISIBLE_ITEMS = Math.floor(300 / 100); // equals 3

   
     // Define size for the arrows based on screen size
     
    
  
     useEffect(() => {
      const fetchItems = async () => {
        
          if (!isDrawerOpen) return;

          const querySnapshot = await getDocs(collection(db, "objects"));
          const allItems = querySnapshot.docs.map(doc => {
              const data = doc.data();
              // Assuming you have a mechanism to resolve images based on data.name
              return {
                  id: doc.id,
                  name: data.name,
                  image: imageMap[data.name], // Ensure imageMap is defined
              };
          });

          // Create a Map to filter items by name, preserving the first occurrence
          let itemsByName = new Map();
          allItems.forEach(item => {
            if (!itemsByName.has(item.name)) {
              itemsByName.set(item.name, item);
            }
          });

          // Convert the Map back to an array
          const uniqueItems = Array.from(itemsByName.values());

          setItems(uniqueItems);
        };
      
        fetchItems();
      }, [isDrawerOpen, interactedItems]);

       // Effect to clear state on application start/reset
  
       // Effect to clear Firestore collection on component mount
  //   useEffect(() => {
  //   const initializeSideDrawer = async () => {
  //     // Clear the 'objects' collection at startup
  //     await clearFirestoreCollection('objects');
  //   };

  //   initializeSideDrawer();
  // }, []); // Empty dependency array to ensure it runs only on component mount


    if (!isDrawerOpen) {

      return null;
    }


  const ITEM_WIDTH = 200; // Assuming each item in the FlatList is 200 units wide

  

const scrollDown = () => {
  // Calculate the next index
  const nextIndex = currentIndex - 1;

  // Update the current index in the state
  setCurrentIndex(nextIndex);

  // Calculate the offset
  const offset = nextIndex * ITEM_WIDTH;

  // Scroll to the calculated offset
  flatListRef.current.scrollToOffset({
    animated: true,
    offset: offset,
  });
};

const scrollUp = () => {
  const maxIndex = items.length - NUM_VISIBLE_ITEMS;
  const prevIndex = Math.min(currentIndex + 1, maxIndex);
  setCurrentIndex(prevIndex);

  const offset = prevIndex * ITEM_WIDTH;

  flatListRef.current.scrollToOffset({
    animated: true,
    offset: offset,
  })
}

const handlePressItem = (item) => {
  if (item.name === 'note1') {
    dispatch(showModalImage());
    setChosenItem(item);
  }
  else {
    setChosenItem(item);
  }
}


const arrowSize = {
  width: window.width * 0.1,
  height: window.height * 0.1,
};

    // The renderItem function for FlatList
    const renderItem = ({ item, index }) => {
      const isVisible = index >= currentIndex && index < currentIndex + NUM_VISIBLE_ITEMS;
      if (!isVisible) return null;
    
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15 }}>
        <Pressable onPress={() => handlePressItem(item)}>
          <Image source={item.image} alt={item.name} style={{ height: 50, width: 50 }} />
        </Pressable>
      </View>
    ); 
  };
    return (
      <Box style={{
        position: 'absolute', // Change to 'absolute' to overlay on top of other content
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)', // Semi-transparent background
      }}>
        <Pressable style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 50,  }} 
        onPress={() => dispatch(toggleSideDrawer())}>
        <Image
          source={drawerBackgroundImage}
          alt="Drawer Background"
          resizeMode="cover"
          style={{ height: 300, width: 500 }}
        />
        </Pressable>
        <Box style={{
        position: 'absolute',
        top: '12%', // Adjust these percentages as needed
        left: '30%', // Adjust these percentages as needed
        width: arrowSize.width ,
        height: arrowSize.height,
        justifyContent: 'center',
        alignItems: 'center'
        }}>
        <Pressable onPress={scrollDown} 
        style={{
          position: 'absolute',
          top: '10%', // Adjust these percentages as needed
          left: '10%', // Adjust these percentages as needed
          width: arrowSize.width,
          height: arrowSize.height * 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1, // Add a border for debugging
          borderColor: 'red', // Make the border red for debugging
        }}>
          {/* Top Arrow Icon Placeholder */}
        </Pressable>
        </Box>
        <FlatList
          ref={flatListRef}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          style={{ position: 'absolute', left: arrowSize.width * 2.65, top: window.height * 0.27, height: window.height * 1 }}
          contentContainerStyle={{ alignItems: 'center' }}
        />
        <Box style={{
        position: 'absolute',
        bottom: '12%', // Adjust these percentages as needed
        left: '30%', // Adjust these percentages as needed
        width: arrowSize.width,
        height: arrowSize.height,
        justifyContent: 'center',
        alignItems: 'center'
        }}>
        <Pressable onPress={scrollUp} 
        style={{
          position: 'absolute',
          bottom: '10%', // Adjust these percentages as needed
          left: '10%', // Adjust these percentages as needed
          width: arrowSize.width,
          height: arrowSize.height * 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1, // Add a border for debugging
          borderColor: 'red', // Make the border red for debugging
        }}>
        </Pressable>
        </Box>
        {chosenItem && (
  <Pressable
    style={{
      position: 'absolute',
      width: window.width * 0.45,
      height: window.height * 0.45,
      top: '58%',
      left: '62%',
      transform: [
        { translateX: -(window.width * 0.22) },
        { translateY: -(window.height * 0.3) },
      ],
    }}
    onPress={() => setChosenItem(null)} // This will hide the image when pressed
  >
    <Image
      source={chosenItem.image}
      style={{ width: '100%', height: '100%' }}
      resizeMode="contain"
      alt={chosenItem.name}
    />
     <ImageModal2 isVisible={showModal} onClose={() => dispatch(hideModalImage())} />
  </Pressable>
        )}
      </Box>      
    );
          };

export default SideDrawerOption;
      
