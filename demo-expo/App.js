import { NavigationContainer } from '@react-navigation/native';
import StackPrimario from './src/navigation/StackPrimario';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <NavigationContainer>
      <StackPrimario/>
    </NavigationContainer>
  );
}

