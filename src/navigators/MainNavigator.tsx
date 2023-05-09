import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { CharacterDetailsScreen } from '../screens/CharacterDetailsScreen'
import { CharacterSearchScreen } from '../screens/CharacterSearchScreen'
import { Character } from '../types/Character'


export type MainStackParamList = {
  CharacterSearch: undefined,
  CharacterDetails: { character: Character },
}

const Stack = createNativeStackNavigator<MainStackParamList>()

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName='CharacterSearch'
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name='CharacterSearch' component={CharacterSearchScreen}/>
      <Stack.Screen name='CharacterDetails' component={CharacterDetailsScreen}/>
    </Stack.Navigator>
  )
}