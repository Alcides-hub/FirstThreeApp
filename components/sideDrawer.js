import React, {useRef, useState, useEffect} from 'react';
import eggBox from '../image/eggBox.jpg';
import Note1 from '../assets/paper_chaper_1.png';
import { Box, FlatList, Image, Pressable } from 'native-base';
import { Dimensions } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { setShowEggBoxModal, setShowModalImage, setShowObject, toggleSideDrawer, setCurrentSelectedItem, setInteractedItem, addUsedItem } from '../actions/dialogueActions';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firestore instance



const SideDrawerOption = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const flatListRef = useRef(null);
    const drawerBackgroundImage = require('../assets/mainBoard.png'); // Adjust the path
    const [chosenItem, setChosenItem] = useState(null);
    const dispatch = useDispatch();
    const window = Dimensions.get('window');
    const [items, setItems] = useState([]);
    const isDrawerOpen = useSelector((state)=> state.dialogue.isDrawerOpen);
    const imageMap = {
      EggBox: eggBox,
      Note1: Note1,
    };
     // Define size for the arrows based on screen size
     
    
  
    
    useEffect(() => {
      if (isDrawerOpen) {
        const fetchItems = async () => {
          const querySnapshot = await getDocs(collection(db, 'objects')); // Assuming 'objects' is your collection name
          const fetchedItems = querySnapshot.docs.map(doc => {
            const data = doc.data();
            // Directly use the 'image' field from Firestore document as the image path
            const image = imageMap[data.name];
            return {
              id: doc.id,
              name: data.name,
              image: image, // Directly using the path to the image from Firestore
            };
          });
    
          setItems(fetchedItems);
        };
    
        fetchItems();
      }
    }, [isDrawerOpen]);    

    if (!isDrawerOpen) {
      return null;
    }




    const onLook = (itemName) => {
      console.log(`Looking at ${itemName}`);
      if (itemName === 'EggBox') {
        dispatch(setShowEggBoxModal(true));
      } else if (itemName === 'note1') {
        dispatch(setShowModalImage(true));
      } 
    };

    const onUseItem = (itemName) => {
      console.log(`Using ${itemName}`);
      dispatch(setShowObject(true));
      dispatch(addUsedItem(itemName));
    }


  const ITEM_WIDTH = 200; // Assuming each item in the FlatList is 200 units wide

  

const scrollDown = () => {
  // Calculate the next index
  const nextIndex = currentIndex + 1;

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
  const prevIndex = currentIndex -1;

  setCurrentIndex(prevIndex);

  const offset = prevIndex * ITEM_WIDTH;

  flatListRef.current.scrollToOffset({
    animated: true,
    offset: offset,
  })
}

const handlePressItem = (item) => {
setChosenItem(item);
}
const arrowSize = {
  width: window.width * 0.1,
  height: window.height * 0.1,
};

    // The renderItem function for FlatList
    const renderItem = ({ item, index }) => {
      const isVisible = index >= currentIndex && index < currentIndex + 6;
      if (!isVisible) return null;
    
      return (
        <Box width={100} height={10} justifyContent="center" alignItems="center">
          <Pressable onPress={() => handlePressItem(item)}>
            <Image
              source={item.image}
              alt={item.name}
              height="30px"
              width="30px"
            />
          </Pressable>
        </Box>
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
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
        top: '14%', // Adjust these percentages as needed
        left: '23%', // Adjust these percentages as needed
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
          style={{ position: 'absolute', left: arrowSize.width * 2.3, top: window.height * 0.26, height: window.height * 1 }}
          contentContainerStyle={{ alignItems: 'center' }}
        />
        <Box style={{
        position: 'absolute',
        bottom: '12%', // Adjust these percentages as needed
        left: '23%', // Adjust these percentages as needed
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
          <Image
             source={chosenItem.image} // Corrected to use chosenItem.name
            alt="Selected Item"
            style={{
              position: 'absolute',
              width: window.width * 0.6,
              height: window.height * 0.55,
              top: '53%',
              left: '55%',
              transform: [
                  { translateX: -(window.width * 0.3) },
                  { translateY: -(window.height * 0.3) },
              ],
            }}
            resizeMode="contain"
          />
        )}
      </Box>
    );
          };

export default SideDrawerOption;
      
