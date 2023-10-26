import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const SideDrawer = ({ isOpen, items }) => {
    return (
      <View style={[styles.drawer, isOpen ? styles.openDrawer : styles.closedDrawer]}>
        {items.map(item => (
          <Text key={item} style={styles.itemText}>{item}</Text>
        ))}
      </View>
    );
  }

  const styles = StyleSheet.create({
    drawer: {
      width: 100, // Just a value, adjust as needed
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
      width: 250,
      width: '85%',
      height: '55%',
    },
    closedDrawer: {
      width: 0,
      paddingVertical: 100,
      // Any other style for a closed drawer
    },
    itemText: {
      color: 'black',
      marginTop: 50, // Space between items
    }
  });
  
  export default SideDrawer;


