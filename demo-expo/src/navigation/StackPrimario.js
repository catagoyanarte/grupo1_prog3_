import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Login from '../screens/Login';
import Register from '../screens/Register';
import StackSecundario from './StackSecundario';

const Stack= createNativeStackNavigator();

export default function StackPrimario(){
    return (
          <Stack.Navigator> 
             <Stack.Screen 
             name="Login" 
             component={ Login } 
             options={{
                headerShown:false
             }}/>
             <Stack.Screen name="Register"
              component={ Register } 
              options={{
                headerShown:false
             }}/>
             <Stack.Screen name="StackSecundario"
              component={ StackSecundario } 
              options={{
                headerShown:false
             }}/>
          </Stack.Navigator>
     )
}

 