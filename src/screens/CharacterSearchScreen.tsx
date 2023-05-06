import React from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { CharacterRowComponent } from '../components/CharacterRowComponent'
import { PaginationComponent } from '../components/PaginationComponent'
import { Colors } from '../shared/colors'


export const CharacterSearchScreen: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingVertical: 12, paddingHorizontal: 24}}>
        <Text style={{marginBottom: 12}}>
          <Text>Busca</Text>
          <Text>Marvel</Text>
          <Text>Teste Front-End</Text>
        </Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={{paddingVertical: 12}}>
          <Text style={{marginLeft: 128}}>Nome</Text>
        </View>
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
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
  }
})