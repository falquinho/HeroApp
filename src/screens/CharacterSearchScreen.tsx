import { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { CharacterRowComponent } from '../components/CharacterRowComponent'
import { CustomTextInput } from '../components/CustomTextInput'
import { EmptyListComponent } from '../components/EmptyListComponent'
import { PaginationComponent } from '../components/PaginationComponent'
import { Spacer } from '../components/Spacer'
import { Colors } from '../shared/colors'
import marvelAPI from '../shared/marvelAPI'
import { Spacing } from '../shared/spacing'
import { Character } from '../shared/types/Character'
import { CharacterListHeader, CharacterSearchTitle } from './CharacterSearchScreen.components'


export const CharacterSearchScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [totalNumPages, setTotalNumPages] = useState(0);
  const [characters, setCharacters] = useState<Array<Character>>([]);

  useEffect(() => {
    fetchPageData(currPage);
  }, []);

  const fetchPageData = async (page: number) => {
    setLoading(true);
    try {
      const res = await marvelAPI.getCharacters();
      console.log("res: ", res)
      setTotalNumPages(Math.ceil(res.total / res.limit));
      setCurrPage((res.offset / res.limit) + 1);
      setCharacters(res.results);
    } catch (error: any) {
      console.error(error.toJSON())
      Alert.alert(
        "Erro ao buscar personagens",
        error.message || "",
      )
    } finally {
      setLoading(false);
    }
  }

  const handlePageChange = (page: number) => {
    setCurrPage(page);
    fetchPageData(page);
  }

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
          data={characters}
          renderItem={({item}) => <CharacterRowComponent/>}
          style={{flexGrow: 0}}
          ItemSeparatorComponent={() => <Spacer size={1}/>}
          ListFooterComponent={() => <Spacer size={1}/>}
          ListEmptyComponent={() => <EmptyListComponent/>}
        />
        <PaginationComponent
          currentPage={currPage}
          totalNumPages={totalNumPages}
          onPageChange={handlePageChange}
          disabled={loading || currPage > totalNumPages}
        />
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