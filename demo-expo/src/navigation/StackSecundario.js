import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Comentarios from '../components/Comentarios'
import StackPrimario from './StackPrimario';

const Stack= createNativeStackNavigator();

export default function StackSecundario(){
    return (
          <Stack.Navigator> 
             <Stack.Screen 
             name="StackNavigation" 
             component={ StackPrimario } 
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

 