import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useNavigation } from '@react-navigation/native';
import LogoutButton from './logoutButton';
import { AntDesign } from "@expo/vector-icons";
import { handleCreateAccount, handleAccountSignin, handleAccountSignOut, logout, fetchDialogue, setUser } from '../actions/dialogueActions';


function LoginScreen() {
    const [email, setEmail] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const user = useSelector(state => state.dialogue.user); // Make sure this path matches how you've set up your rootReducer

 
    const [password, setPassword] = useState('');
    // const { setUser, ...otherProps} = props;   
    

    const navigation = useNavigation();

    const dispatch = useDispatch();
    
    useEffect(() => {
        async function lockOrientation() {
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        //   dispatch(fetchDialogue("kasa_dialogue", "kasa_start"));
        }
        
        lockOrientation();
      }, [dispatch]);

    //   const handleLogout = () => {
    //     dispatch(logout());
    // };

    
    
    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //       setUser(user);
    //     });
    
    //     return () => unsubscribe();
    //   }, []);

      const handleEmailFocus = () => {
        setIsFocused(true);
    };

    const handleEmailBlur = () => {
        setIsFocused(false);
    };

    const handlePasswordFocus = () => {
        setIsFocused(true);
    };

    const handlePasswordBlur = () => {
        setIsFocused(false);
    };

    

// Event handlers
const handleAccountSigninPress = () => {
    // Dispatch the login action
    dispatch(handleAccountSignin(email, password, setUser));
    navigation.replace('FirstLevel');
    
};

const handleCreateAccountPress = () => {
    // Dispatch the account creation action
    dispatch(handleCreateAccount(email, password));
};

useEffect(() => {
    if (user) { // assuming 'user' changes to null on logout and is set on login
        dispatch(fetchDialogue("kasa_dialogue", "kasa_start"));
    }
}, [user, dispatch]); // Include `user` in the dependency array

// const handleAccountSignOutPress = () => {
//     // Dispatch the logout action
//     dispatch(handleAccountSignOut(setUser, email, password));
// };
return (
    <View style={{ flex: 1 }}>
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >
        <ImageBackground
            source={require("../assets/shinagawa-station.jpeg")}
            style={styles.imageBackground}
            resizeMode="cover"
        >
            <View style={styles.boxContainer}>
                {/* {user ? (
                    <>
                        <Text style={styles.userGreet}>Hi, Sorry to see you go so soon, {user.email}</Text>
                        <TouchableOpacity
                            onPress={handleAccountSignOut}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <> */}
                        <Text style={styles.userGreet}>Hi, Welcome to Tokkaido App</Text>
                        <Text style={styles.userText}>Please register or Login</Text>
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={[styles.input, isFocused && styles.focusedInput]}
                            onFocus={handleEmailFocus}
                            onBlur={handleEmailBlur}
                        />
                        {/* <AntDesign
                            name="mail"
                            style={[styles.icon, isFocused && styles.focusedIcon]}
                            /> */}
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            style={[styles.input, isFocused && styles.focusedInput]}
                            secureTextEntry
                            onFocus={handlePasswordFocus}
                            onBlur={handlePasswordBlur}
                        />
                        <TouchableOpacity
                            onPress={handleAccountSigninPress}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleCreateAccountPress}
                            style={[styles.button, styles.buttonOutline]}
                        >
                            <Text style={styles.buttonOutlineText}>Register</Text>
                        </TouchableOpacity>
                    {/* </> */}
                {/* )} */}
            </View>
        </ImageBackground>
    </KeyboardAvoidingView>
</View>
);
}

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

input: {
    width: '50%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#0782F9',
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
},
button: {
    width: '20%',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#0782F9',
    alignItems: 'center',
    borderRadius: 5,
},
buttonOutline: {
    backgroundColor: 'white',
    borderWidth: 1,
},

buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  userGreet: {
    paddingTop: 20,
    paddingHorizontal: 20,
    fontFamily: "",
    fontWeight: 800,
    fontSize: 22,
  },
  userGreetLandscape: {
    paddingLeft: 60,
    fontFamily: "Avenir",
    fontWeight: 800,
    fontSize: 22,
  },
  userText: {
    paddingTop: 14,
    paddingLeft: 20,
    fontFamily: "Avenir",
    fontWeight: 800,
    fontSize: 18,
  },
  userTextLandscape: {
    fontFamily: "Avenir",
    fontWeight: 800,
    fontSize: 18,
  },
  icon: {
    position: "absolute",
    top: 28,
    left: 10,
    fontSize: 16,
  },
  icon2: {
    position: "absolute",
    top: 88,
    left: 10,
    fontSize: 16,
  },
  focusedInput: {
    color: "#0782F9",
  },
  focusedIcon: {
    color: "#0782F9",
  },
});

export default LoginScreen;


