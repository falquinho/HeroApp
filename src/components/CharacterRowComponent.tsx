import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Spacing } from '../shared/spacing'


export const CharacterRowComponent: React.FC = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}></View>
      <View>
        <Text>Hero Name</Text>
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
    width: 128,
    paddingHorizontal: Spacing.md,
  }
})