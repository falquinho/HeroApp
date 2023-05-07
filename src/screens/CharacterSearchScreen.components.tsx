import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CustomText } from '../components/CustomText'
import { Colors } from '../shared/colors'
import { Spacing } from '../shared/spacing'


export const CharacterSearchTitle: React.FC = () => {
  return (
    <View style={{marginBottom: Spacing.sm}}>
      <CustomText style={styles.title}>
        Busca Marvel <CustomText style={styles.light}>Teste Front-End</CustomText>
      </CustomText>
      <View style={styles.underscore}></View>
    </View>
  )
}

export const CharacterListHeader: React.FC = () => {
  return (
    <View style={{paddingVertical: Spacing.sm}}>
      <CustomText style={styles.headerText}>
        Nome
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.primary,
    textTransform: 'uppercase',
    lineHeight: 32,
  },
  light: {
    fontWeight: '300',
  },
  underscore: {
    height: 4,
    width: 54,
    backgroundColor: Colors.primary,
  },
  headerText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 108,
  },
});