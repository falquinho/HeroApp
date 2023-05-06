/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './src/navigators/MainNavigator';


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <MainNavigator/>
    </NavigationContainer>
  );
}


export default App;
