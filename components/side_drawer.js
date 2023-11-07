import React, {useRef} from 'react';
import { View, Button, Text, StyleSheet, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback  } from 'react-native';
import my3Dobjects from '../data/3d_objects_list.json';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import eggBox from '../image/eggBox.jpg';
import redBox from '../image/box_red.jpg';
import oldBook from '../image/old_book.jpg';
import clamp from '../image/clamp.jpg';




const SideDrawer = ({ isOpen, items, onLook, onUseItem, selectedItem }) => {
  const [currentIndex, setCurrentIndex] = React.useState(1);
  const flatListRef = useRef(null);


  const imageMapper = {
    'EggBox': eggBox,
    'Red Box': redBox,
    'Old Book': oldBook,
    'Clamp': clamp,
  };

  const mappedItems = items.map(itemName => {
    const objectDetails = my3Dobjects.find(obj => obj.name === itemName);
    if (!objectDetails) {
        console.log("Name not found:", itemName);
    }
    return objectDetails ? { name: objectDetails.name, image: imageMapper[objectDetails.name] } : null;
});

console.log('my3Dobjects data:', my3Dobjects);


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


const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemText}>{item.name}</Text>
    <Image source={item.image} style={styles.itemImage} />
  </View>
);


const isItemSelected = selectedItem != null;


    return (
  <TouchableWithoutFeedback onPress={(e) => e.preventDefault()}>
    <View style={[styles.drawer, isOpen ? styles.openDrawer : styles.closedDrawer]}>
      <TouchableOpacity style={styles.arrow} onPress={scrollToNextItem}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        style={styles.flatlist}
        data={dataToRender}
        horizontal
        showsHorizontalScrollIndicator={true}
        snapToInterval={200}
        decelerationRate="fast"
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />

      <TouchableOpacity style={styles.arrow} onPress={scrollToPrevItem}>
        <FontAwesomeIcon icon={faChevronRight} />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => onLook(selectedItem)} disabled={!isItemSelected} >
          <Text style={styles.buttonText}>Look</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => onUseItem(selectedItem)} disabled={!isItemSelected}>
          <Text style={styles.buttonText}>Use</Text>
      </TouchableOpacity>
</View>
    </View>
  </TouchableWithoutFeedback>
);
    }

  const styles = StyleSheet.create({
    drawer: {
      width: '100%', // Just a value, adjust as needed
      height: '60%',
      position: 'absolute',
      zIndex: 1000,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      padding: 10,
      paddingTop: 50,
      borderRadius: 10, 
    },
    openDrawer: {
      width: '85%',
      height: '55%',
    },
    closedDrawer: {
    },
    itemText: {
      color: 'black',
      textAlign: 'center', 
      fontWeight: 'bold',
      marginVertical: 14,
    },
    itemImage: {
      width: 300, //adjust accordingly
      height: 200, //adjust accordingly
      resizeMode: 'contain'
    },
    arrow: {
      padding: 10
    },
    flatlist: {
      flex: 1,
    },
    buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
    padding: 7, // Add padding if needed
    },
    buttonStyle: {
    width: 70, // Set the width you want
    height: 50, // Set the height you want
    borderRadius: 30, // Half of width/height to make it round
    justifyContent: 'center', // Center the text inside the button
    alignItems: 'center', // Center the text inside the button
    backgroundColor: 'grey', 
    marginHorizontal: 40,
    },
    buttonText: {
      color: 'white',
    }
  });
  
  export default SideDrawer;


