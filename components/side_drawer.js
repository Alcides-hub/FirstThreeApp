import React, {useRef} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TouchableWithoutFeedback  } from 'react-native';
import my3Dobjects from '../data/3d_objects_list.json';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import eggBox from '../image/eggBox.jpg';
import redBox from '../image/box_red.jpg';
import oldBook from '../image/old_book.jpg';
import clamp from '../image/clamp.jpg';




const SideDrawer = ({ isOpen, items }) => {
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
      paddingTop: 60,
      borderRadius: 10, 
    },
    openDrawer: {
      // Style for an open drawer
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
  });
  
  export default SideDrawer;


