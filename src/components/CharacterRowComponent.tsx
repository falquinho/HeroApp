import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Colors } from '../shared/colors'
import { Spacing } from '../shared/spacing'
import { CustomText } from './CustomText'


export const CharacterRowComponent: React.FC = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
      </View>
      <View style={{justifyContent: 'center'}}>
        <CustomText style={styles.text}>
          Hero Name
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