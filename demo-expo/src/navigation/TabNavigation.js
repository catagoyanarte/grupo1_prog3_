// HOME MENU EN MI PROYECTO
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import {MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen 
            name='Home' 
            component={Home}
             options={ 
                { headerShown: false ,  
                tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />}
            }
            />
            <Tab.Screen 
            name='Comentarios' 
            component={Comentarios}
            options={ 
                { headerShown: false , 
                tabBarIcon: () => <MaterialCommunityIcons name="face-woman-profile" size={24} color="black" /> }
            }
            />
            <Tab.Screen 
            name='Profile' 
            component={Profile}
             options={ 
                { headerShown: false ,  
                tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />}
            }/>
        </Tab.Navigator>
    )
}

export default TabNavigation;
