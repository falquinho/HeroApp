import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { MainStackParamList } from '../navigators/MainNavigator'
import { Colors } from '../shared/colors'
import { Spacing } from '../shared/spacing'
import { Character } from '../types/Character'
import { CustomText } from './CustomText'


export type CharacterRowComponentProps = {
  character: Character,
  onPress: () => void,
}

export const CharacterRowComponent: React.FC<CharacterRowComponentProps> = ({
  character,
  onPress,
}) => {
  const { path, extension } = character.thumbnail;

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image}
          source={{
            uri: `${path.replace('http:', 'https:')}/standard_xlarge.${extension}`
          }}
        />
      </View>
      <View style={{justifyContent: 'center'}}>
        <CustomText style={styles.text}>
          {character.name}
        </CustomText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: Spacing.md,
  },
  imageContainer: {
    paddingHorizontal: 25,
    paddingVertical: Spacing.md,
  },
  text: {
    fontSize: 21,
    lineHeight: 24,
    color: Colors.grayDark,
  },
  image: {
    height: 58,
    width: 58,
    resizeMode: 'cover',
    borderRadius: 29,
    alignSelf: 'center',
  },
})