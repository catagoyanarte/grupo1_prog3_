import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Login from '../screens/Login';
import Register from '../screens/Register';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

export default function StackPrimario() {
  return (
    <Stack.Navigator initialRouteName='Register'>
      
      <Stack.Screen
        name="Login"
        component={Login} 
        options={{headerShown: false}}
        />

      <Stack.Screen
        name="Register"
        component={Register} 
        options={{headerShown: false}}
        />

      <Stack.Screen
        name="AppTabs"
        component={TabNavigation} 
        options={{headerShown: false}}
        />

    </Stack.Navigator>
  )
}
