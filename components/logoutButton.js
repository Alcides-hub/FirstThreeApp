import React, {useState} from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const LogoutButton = () => {

    const [user, setUser] = useState(null);
    const {isDialogueVisible, showModalNote} = useSelector((state) => state.dialogue);

    const navigation = useNavigation();
    const handleNavigateToLoginScreen = () => {
        navigation.navigate('LogoutScreen');
    }
    if (isDialogueVisible || showModalNote) {
        return null; // Ensures Hotspot is not rendered if dialogue or modal note is visible, or if imageTexture hasn't loaded
        }

    return (
        <TouchableOpacity 
        style={{ position: 'absolute', bottom: 40, left: 20 }} 
        onPress={handleNavigateToLoginScreen}>
        <Image 
          source={require('../assets/menuButton.png')} 
          style={{ width: 45, height: 45 }} 
        />
      </TouchableOpacity>
    );
};


export default LogoutButton;
