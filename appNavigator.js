import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FirstLevel from './FirstLevel';
import LoginScreen from './components/LoginScreen'; // Ensure this import is correct
import TutorialScreen from './components/TutorialScreen';
import LogoutScreen from './components/LogoutScreen';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const user = useSelector(state => state.auth.user);
  

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={user ? 'TutorialScreen' : 'LoginScreen'}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TutorialScreen"
          component={TutorialScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FirstLevel"
          component={FirstLevel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogoutScreen"
          component={LogoutScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
