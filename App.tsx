/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { AppSWRConfig } from './AppSWRConfig';
import { MainNavigator } from './src/navigators/MainNavigator';
import { navigationTheme } from './src/navigators/theme';


function App(): JSX.Element {
  return (
    <AppSWRConfig>
      <NavigationContainer theme={navigationTheme}>
        <MainNavigator/>
      </NavigationContainer>
    </AppSWRConfig>
  );
}


export default App;
