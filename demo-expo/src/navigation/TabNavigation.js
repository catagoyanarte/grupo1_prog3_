// HOME MENU EN MI PROYECTO
import React from 'react'

// importaciones de screens
import HomeStack from './HomeStack';
import CreatePost from '../screens/CreatePost';
import Profile from '../screens/Profile';

// para el tab
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// iconos
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

// uso la importacion para el tab
const Tab = createBottomTabNavigator();

function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen 
            name='Home' 
            component={HomeStack}
             options={ 
                { headerShown: false ,  
                tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }
            }
            onPress={() => console.log('usando home')}
            />
            <Tab.Screen 
            name='CreatePost' 
            component={CreatePost}
            options={ 
                { headerShown: false , 
                tabBarIcon: () => <Ionicons name="add-circle" size={24} color="black" /> }
            }
            onPress={() => console.log('usando crearPost')}

            />
            <Tab.Screen 
            name='Profile' 
            component={Profile}
             options={ 
                { headerShown: false ,  
                tabBarIcon: () => <Ionicons name="person-sharp" size={24} color="black" /> }
            }/>
        </Tab.Navigator>
    )
}

export default TabNavigation;
