import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { CharacterDetailsScreen } from '../screens/CharacterDetailsScreen'
import { CharacterSearchScreen } from '../screens/CharacterSearchScreen'

const Stack = createNativeStackNavigator()

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='CharacterScreen'
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name='CharacterSearch' component={CharacterSearchScreen}/>
      <Stack.Screen name='CharacterDetails' component={CharacterDetailsScreen}/>
    </Stack.Navigator>
  )
}