import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './screens/home-screen';
import { DetailScreen } from './screens/details-screen';


const Stack = createNativeStackNavigator();

// application routing information
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'OMDB Sample App' }} />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{ title: 'Movie Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;