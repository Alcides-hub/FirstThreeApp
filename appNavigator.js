import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstLevel from './FirstLevel';
import LoginScreen from './components/LoginScreen';
// import TutorialScreen from './components/TutorialScreen';
import LogoutScreen from './components/LogoutScreen';

const Stack = createStackNavigator();

export default function AppNavigator({user, setUser})  {
  return (
    <Stack.Navigator initialRouteName={user ? 'FirstLevel' : 'LoginScreen'}>
            <Stack.Screen
                name="LoginScreen"
                options={{ headerShown: false }}
            >
                {(props) => <LoginScreen {...props} setUser={setUser} />}
            </Stack.Screen>
            {/* <Stack.Screen name="TutorialScreen" component={TutorialScreen} /> */}
            <Stack.Screen
                name="FirstLevel"
                component={FirstLevel}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="LogoutScreen"
                component={LogoutScreen}
                options={{headerShown: false}}
            />
    {/* Add other screens as needed */}
  </Stack.Navigator>
  );
}

