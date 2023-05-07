import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { CharacterRowComponent } from '../components/CharacterRowComponent'
import { CustomTextInput } from '../components/CustomTextInput'
import { PaginationComponent } from '../components/PaginationComponent'
import { Colors } from '../shared/colors'
import { Spacing } from '../shared/spacing'
import { CharacterListHeader, CharacterSearchTitle } from './CharacterSearchScreen.components'


export const CharacterSearchScreen: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <CharacterSearchTitle/>
        <CustomTextInput
          label='Nome do Personagem'
        />
      </View>

      <View style={styles.mainContainer}>
        <CharacterListHeader/>
        <FlatList
          data={[1,2,3,4]}
          renderItem={({item}) => <CharacterRowComponent/>}
        />
        <PaginationComponent/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});