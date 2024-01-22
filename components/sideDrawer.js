import React, {useRef, useState, useEffect} from 'react';
import my3Dobjects from '../data/3d_objects_list.json';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import eggBox from '../image/eggBox.jpg';
import Note1 from '../assets/paper_chaper_1.png';
import { Box, FlatList, Image, Pressable } from 'native-base';
import { Dimensions } from 'react-native';



const SideDrawerOption = ({ isOpen, items, onLook, onUseItem, selectedItem }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [currentViewItem, setCurrentViewItem] = useState(null);
    const flatListRef = useRef(null);
    const drawerBackgroundImage = require('../assets/mainBoard.png'); // Adjust the path
    const [chosenItem, setChosenItem] = useState(null);

    const window = Dimensions.get('window');
  
    // Handle pressing an item
    const handlePressItem = (item) => {
      setChosenItem(item);
      selectedItem(item);
    };

    // Define size for the arrows based on screen size
        const arrowSize = {
  width: window.width * 0.1,
  height: window.height * 0.1,
};

const imageMapper = {
    'EggBox': eggBox,
    'note1': Note1,
  };

  const mappedItems = items.map(itemName => {
    const objectDetails = my3Dobjects.find(obj => obj.name === itemName);
  
    if (!objectDetails) {
      console.log("Name not found:", itemName);
      return null;
    }
  
    return {
      id: objectDetails.id,
      name: objectDetails.name,
      image: imageMapper[objectDetails.name],
    };
  });
console.log('my3Dobjects data:', my3Dobjects);
console.log('mappedItems:', mappedItems);


const dataToRender = mappedItems.filter(Boolean);
console.log('Data to Render:', dataToRender);


  const ITEM_WIDTH = 200; // Assuming each item in the FlatList is 200 units wide

  

const scrollToNextItem = () => {
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

const scrollToPrevItem = () => {
  const prevIndex = currentIndex -1;

  setCurrentIndex(prevIndex);

  const offset = prevIndex * ITEM_WIDTH;

  flatListRef.current.scrollToOffset({
    animated: true,
    offset: offset,
  })
}
    // The renderItem function for FlatList
  const renderItem = ({ item, index }) => {
    const isVisible = index >= currentIndex && index < currentIndex + 6;
    return isVisible ? (
            <Box
              width={100} // Set the width you need for the items
              height={8} // 
              justifyContent="center"
              alignItems="center"
            >
      <Pressable onPress={() => onLook(item.name)}>
        <Image
          source={item.image}
          alt={item.name}
          height="30px"
          width="30px" // Size of the icon
        />
      </Pressable>
      </Box>
    ) : null;
  }


  return (
    <Box style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={drawerBackgroundImage}
        alt="Drawer Background"
        resizeMode="cover"
        // position="absolute"
        width="full"
        height="full"
        style={{height: 300,
            width: 500}}
      />
      <Box style={{
      position: 'absolute',
      top: '13%', // Adjust these percentages as needed
      left: '23%', // Adjust these percentages as needed
      width: arrowSize.width,
      height: arrowSize.height,
      justifyContent: 'center',
      alignItems: 'center'
  }}>
      <Pressable onPress={scrollToNextItem} 
      style={{
        position: 'absolute',
        top: '30%', // Adjust these percentages as needed
        left: '10%', // Adjust these percentages as needed
        width: arrowSize.width,
        height: arrowSize.height,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1, // Add a border for debugging
        borderColor: 'red', // Make the border red for debugging
    }}>
        {/* Top Arrow Icon */}
      </Pressable>
      </Box>
      <FlatList
        ref={flatListRef}
        data={dataToRender}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        style={{ position: 'absolute', 
        left: arrowSize.width * 2.3, 
        top: window.height * 0.26, 
        height: window.height * 1 }}
        contentContainerStyle={{ alignItems: 'center' }}
      />
      <Box style={{
      position: 'absolute',
      bottom: '13%', // Adjust these percentages as needed
      left: '23%', // Adjust these percentages as needed
      width: arrowSize.width,
      height: arrowSize.height,
      justifyContent: 'center',
      alignItems: 'center'
  }}>
      <Pressable onPress={scrollToPrevItem} 
      style={{
        position: 'absolute',
        bottom: '10%', // Adjust these percentages as needed
        left: '10%', // Adjust these percentages as needed
        width: arrowSize.width,
        height: arrowSize.height,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1, // Add a border for debugging
        borderColor: 'red', // Make the border red for debugging
    }}>
      </Pressable>
      </Box>
      {chosenItem && (
         <Image
         source={item.image} // Adjust if it's an external image
                    // If it's a local image, use source={chosenItem.largeImage} directly
                    alt="Selected Item"
                    style={{
                        position: 'absolute',
                        width: window.width * 0.6,
                        height: window.height * 0.6,
                        top: '50%',
                        left: '50%',
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
      
