import React from 'react'
import { SafeAreaView, TouchableOpacity, View } from 'react-native'
import { CustomText } from '../components/CustomText'
import { CustomTitle } from '../components/CustomTitle'


type CharacterDetailsScreenProps = {}

export const CharacterDetailsScreen: React.FC<CharacterDetailsScreenProps> = () => {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity>
          <CustomText>{"< Voltar"}</CustomText>
        </TouchableOpacity>
      </View>

      <View>
        <CustomTitle>{"character.name"}</CustomTitle>
      </View>
    </SafeAreaView>
  )
}