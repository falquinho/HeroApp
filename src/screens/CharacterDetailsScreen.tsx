import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Text } from 'react-native'
import { Image } from 'react-native'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { CustomText } from '../components/CustomText'
import { CustomTitle } from '../components/CustomTitle'
import { MainStackParamList } from '../navigators/MainNavigator'
import { Colors } from '../shared/colors'
import { Spacing } from '../shared/spacing'
import { BackRow, InfoRow, ThumbnailComponent, TitleRow } from './CharacterDetailsScreen.components'


export type CharacterDetailsScreenProps =
  NativeStackScreenProps<MainStackParamList, "CharacterDetails">;

export const CharacterDetailsScreen: React.FC<CharacterDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { character } = route.params;
  const { thumbnail } = character;
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackRow navigation={navigation}/>

      <ScrollView
        style={{ flex: 1 }}
        stickyHeaderIndices={[0,1]}
      >
        <ThumbnailComponent path={thumbnail.path} extension={thumbnail.extension}/>

        <TitleRow title={character.name}/>

        <InfoRow 
          label='Tem' 
          info={`${character.comics.available} revistas`}
        />
        <InfoRow 
          label='Participa de' 
          info={`${character.stories.available} estórias`}
        />
        <InfoRow 
          label='Está em' 
          info={`${character.events.available} eventos`}
        />
        <InfoRow 
          label='Aparece em' 
          info={`${character.events.available} series`}
        />
      </ScrollView>
    </SafeAreaView>
  )
}