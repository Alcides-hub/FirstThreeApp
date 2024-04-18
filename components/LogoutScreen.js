import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { handleAccountSignOut } from '../actions/dialogueActions';
import { KeyboardAvoidingView } from 'native-base';
import { getAuth, signOut } from 'firebase/auth';
import { setUser, resetDialogue } from '../actions/dialogueActions';


const LogoutScreen = ({}) => {
    const dispatch = useDispatch();
    
    const navigation = useNavigation();

    // const handleLogout = async () => {
    //     const dispatch = useDispatch();
    //     try {
    //         await dispatch(handleAccountSignOut(setUser));
    //         navigation.replace('LoginScreen');
    //     } catch (error) {
    //         console.error('Failed to logout:', error);
    //         // Add error handling here, e.g., show an error message to the user
    //     }
    // };

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            dispatch(setUser(null)); // Clear user state
            // After successful logout, navigate to the LoginScreen
            dispatch(resetDialogue()); // Clear dialogue state
            navigation.replace('LoginScreen');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <ImageBackground
                    source={require('../assets/shinagawa-station.jpeg')}
                    style={styles.imageBackground}
                    resizeMode="cover"
                >
                    <View style={styles.boxContainer}>
                        <Text style={styles.userGreet}>Are you sure you want to log out?</Text>
                        <TouchableOpacity onPress={handleLogout} style={styles.button}>
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    imageBackground: {
        width: "99.8%",
        height: "99.7%",
    },
    boxContainer: {
        marginLeft: 90,
        marginTop: 10,
    },
    button: {
        width: '20%',
        marginVertical: 40,
        marginLeft: 10,
        padding: 10,
        backgroundColor: '#0782F9',
        alignItems: 'center',
        borderRadius: 5,
    },
    userGreet: {
        paddingTop: 35,
        paddingHorizontal: 0,
        fontFamily: "Avenir",
        fontWeight: 800,
        fontSize: 20,
      },
});

export default LogoutScreen;

