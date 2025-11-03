import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Login from '../screens/Login';
import Register from '../screens/Register';
import TabNavigation from './TabNavigation';

const Stack= createNativeStackNavigator();

export default function StackPrimario({ user }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown:false }}>
      {user ? (
        <Stack.Screen 
        name="AppTabs" 
        component={TabNavigation} />
        
      ) : (
        <>
          <Stack.Screen 
          name="Login" 
          component={Login} />

          <Stack.Screen 
          name="Register" 
          component={Register} />
        </>
      )}
    </Stack.Navigator>
  )
}
 