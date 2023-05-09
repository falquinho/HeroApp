import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CustomText } from '../components/CustomText'
import { CustomTitle } from '../components/CustomTitle'
import { Colors } from '../shared/colors'
import { Spacing } from '../shared/spacing'


export const CharacterSearchTitle: React.FC = () => {
  return (
    <View style={{marginBottom: Spacing.sm}}>
      <CustomTitle>
        Busca Marvel <CustomText style={styles.light}>Teste Front-End</CustomText>
      </CustomTitle>
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
  light: {
    fontWeight: '300',
  },
  headerText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 108,
  },
});