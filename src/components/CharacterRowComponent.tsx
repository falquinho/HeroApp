import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Colors } from '../shared/colors'
import { Spacing } from '../shared/spacing'
import { Character } from '../types/Character'
import { CustomText } from './CustomText'


export type CharacterRowComponentProps = {
  character: Character,
}


export const CharacterRowComponent: React.FC<CharacterRowComponentProps> = ({
  character,
}) => {
  const { path, extension } = character.thumbnail;

  return (
    <View style={styles.mainContainer}>
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
    </View>
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