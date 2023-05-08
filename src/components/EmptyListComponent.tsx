import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colors } from '../shared/colors'
import { Spacing } from '../shared/spacing'
import { CustomText } from './CustomText'


export const EmptyListComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.bangText}>
        ?!
      </CustomText>
      <CustomText style={styles.mainCopy}>
        Nada aqui
      </CustomText>
      <CustomText style={styles.subCopy}>
        Arraste-me para baixo para atualizar
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  bangText: {
    fontWeight: '900',
    fontSize: 64,
    color: Colors.primary,
  },
  mainCopy: {
    fontWeight: '800',
    fontSize: 24,
    color: Colors.primary,
  },
  subCopy: {
    fontSize: 16,
    color: Colors.primary,
  }
})