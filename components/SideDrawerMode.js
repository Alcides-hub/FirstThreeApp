import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import  {ShowModalImage, toggleSideDrawer, setCurrentSelectedItem, setInteractedItem, addUsedItem } from '../actions/dialogueActions';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firestore instance
import { View, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import SideDrawerOption from "./sideDrawer";

const eggBox = require('../image/eggBox.jpg');
const Note1 = require('../image/paper_chaper_1.png');

const SideDrawerMode = () => {
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector((state)=> state.dialogue.isDrawerOpen);
    const currentSelectedItem = useSelector((state) => state.currentSelectedItem);
    // const interactedItem = useSelector(state => state.dialogue.interactedItems);
    const [items, setItems] = useState([]); 
    const imageMap = {
        EggBox: eggBox,
        Note1: Note1,
    };

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
        const item = items.find(item => item.name === itemName);
        const itemImage = imageMap[itemName]; 
        if (item && itemImage) {
            
            // Item found, now you can do something with it, like dispatching an action
            console.log(`Found item:`, item);
            // For example, dispatch a Redux action to show this item in a modal
            // dispatch(setShowModalImage(itemName, itemImage));
          } else {
            console.log(`Item with name ${itemName} not found.`);
          }
        };
        
  
      const onUseItem = (itemName) => {
        console.log(`Using ${itemName}`);
        dispatch(setShowObject(true));
        dispatch(addUsedItem(itemName));
      }

    return (  
        isDrawerOpen && (
          <TouchableWithoutFeedback >
            <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }}>
            {/* <SideDrawerOption isOpen={isDrawerOpen} items={interactedItem} onLook={onLook} onUseItem={() => {onUseItem(currentSelectedItem); }}  /> */}
            <SideDrawerOption isOpen={isDrawerOpen}  onLook={onLook} onUseItem={() => {onUseItem(currentSelectedItem); }}  />
            </View>
          </TouchableWithoutFeedback>
        )
      )
    }
  
export default SideDrawerMode;
