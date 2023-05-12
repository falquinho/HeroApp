import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { CharacterRowComponent } from '../components/CharacterRowComponent'
import { CustomTextInput } from '../components/CustomTextInput'
import { EmptyListComponent } from '../components/EmptyListComponent'
import { PaginationComponent } from '../components/PaginationComponent'
import { Spacer } from '../components/Spacer'
import { MainStackParamList } from '../navigators/MainNavigator'
import { Colors } from '../shared/colors'
import { debounce } from '../shared/debounce'
import marvelAPI, { buildCharacterPageDataFetcher } from '../shared/marvelAPI'
import { Spacing } from '../shared/spacing'
import { Character } from '../types/Character'
import { CharacterListHeader, CharacterSearchTitle } from './CharacterSearchScreen.components'


export type CharacterSearchScreenProps = 
  NativeStackScreenProps<MainStackParamList, "CharacterSearch">;

export const CharacterSearchScreen: React.FC<CharacterSearchScreenProps> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [totalNumPages, setTotalNumPages] = useState(0);
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [input, setInput] = useState("");

  const fetchPageData = buildCharacterPageDataFetcher({
    characterDataSetter: setCharacters,
    onError: (error: any) => {
      Alert.alert(
        "Erro ao buscar personagens",
        error.response?.data?.message || "",
      )
    },
    loadingSetter: setLoading,
    pageSetter: setCurrPage,
    totalPagesSetter: setTotalNumPages,
  });

  useEffect(() => {
    fetchPageData(currPage);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrPage(page);
    fetchPageData(page, input);
  }

  const handleTextChange = (text: string) => {
    setCharacters([]);
    setInput(text);
    fetchPageData(1, text);
  }
  const debouncedHandleTextChangeRef = useRef(
    debounce<(text: string) => void>(handleTextChange)
  );

  const CharacterRowWithNavigation: React.FC<{character: Character}> = ({
    character,
  }) => (
    <CharacterRowComponent
      character={character}
      onPress={() => navigation.push("CharacterDetails", { character })}
    />
  )

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <CharacterSearchTitle/>
        <CustomTextInput
          label='Nome do Personagem'
          onChangeText={debouncedHandleTextChangeRef.current}
        />
      </View>

      <View style={styles.mainContainer}>
        <CharacterListHeader/>
        <FlatList
          data={characters}
          keyExtractor={item => "" + item.id}
          renderItem={({item}) => (
            <CharacterRowWithNavigation character={item}/>
          )}
          style={{flexGrow: 0}}
          ItemSeparatorComponent={() => <Spacer size={1}/>}
          ListFooterComponent={() => <Spacer size={1}/>}
          ListEmptyComponent={() => (
            (!loading && <EmptyListComponent/>) || null
          )}
          refreshing={loading}
          onRefresh={() => fetchPageData(currPage)}
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