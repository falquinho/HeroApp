import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { MainStackParamList } from '../navigators/MainNavigator'
import { BackRow, TitleRow } from './CharacterDetailsScreen.components'


export type CharacterDetailsScreenProps =
  NativeStackScreenProps<MainStackParamList, "CharacterDetails">;

export const CharacterDetailsScreen: React.FC<CharacterDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { character } = route.params;
  
  return (
    <SafeAreaView>
      <BackRow navigation={navigation}/>
      <TitleRow title={character.name}/>
    </SafeAreaView>
  )
}