import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { CustomText } from '../components/CustomText'
import { CustomTitle } from '../components/CustomTitle'
import { CharacterDetailsScreenProps } from './CharacterDetailsScreen'


export const BackRow: React.FC<{
  navigation: CharacterDetailsScreenProps['navigation'],
}> = ({
  navigation,
}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <CustomText>{"< Voltar"}</CustomText>
      </TouchableOpacity>
    </View>
  );
}


export const TitleRow: React.FC<{title: string}> = ({
  title
}) => {
  return (
    <View>
      <CustomTitle>{title}</CustomTitle>
    </View>
  )
}