import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Comentarios from '../components/Comentarios'
import Home from '../screens/Home';

const Stack= createNativeStackNavigator();

export default function HomeStack(){
    return (
          <Stack.Navigator> 
             <Stack.Screen 
             name="Home" 
             component={ Home } 
             options={{
                headerShown:false
             }}/>
             <Stack.Screen 
             name="Comentarios" 
             component={ Comentarios } 
             options={{
                headerShown:false
             }}/>
             
          </Stack.Navigator>
     )
}

 