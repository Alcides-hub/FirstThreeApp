// VideoPlayer.js
import React from 'react';
import { Video,ResizeMode } from 'expo-av';
import { StyleSheet } from 'react-native';

const VideoPlayer = ({ videoSource, onVideoEnd }) => {
  return (
    <Video
      source={videoSource}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode="cover"
      shouldPlay
      isLooping={false}
      useNativeControls
      style={styles.video}
      onEnd={onVideoEnd}
    />
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',   // Adjust as needed
    height: 300,     // Adjust as needed
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default VideoPlayer;
