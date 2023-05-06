import React from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import { PaginationComponent } from '../components/PaginationComponent'


export const CharacterSearchScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>
          <Text>Busca</Text>
          <Text>Marvel</Text>
          <Text>Teste Front-End</Text>
        </Text>
        <View>
          <View>
            <Text>Nome</Text>
          </View>
          {/* <FlatList/> */}
          <PaginationComponent/>
        </View>
      </View>
    </SafeAreaView>
  )
}