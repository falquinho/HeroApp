import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useRef, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native'
import { CharacterRowComponent } from '../components/CharacterRowComponent'
import { CustomTextInput } from '../components/CustomTextInput'
import { EmptyListComponent } from '../components/EmptyListComponent'
import { PaginationComponent } from '../components/PaginationComponent'
import { Spacer } from '../components/Spacer'
import { MainStackParamList } from '../navigators/MainNavigator'
import { Colors } from '../shared/colors'
import { debounce } from '../shared/debounce'
import marvelAPI from '../shared/marvelAPI'
import { Spacing } from '../shared/spacing'
import { Character } from '../types/Character'
import { CharacterListHeader, CharacterSearchTitle } from './CharacterSearchScreen.components'


export type CharacterSearchScreenProps = 
  NativeStackScreenProps<MainStackParamList, "CharacterSearch">;

export const CharacterSearchScreen: React.FC<CharacterSearchScreenProps> = ({
  navigation,
}) => {
  const [currPage, setCurrPage] = useState(1);
  const [input, setInput] = useState("");

  const {
    characters,
    isLoading,
    totalNumPages,
    mutate,
  } = marvelAPI.useCharacterPageSWR(currPage, input);

  const handlePageChange = (page: number) => {
    setCurrPage(page);
  }

  const handleTextChange = (text: string) => {
    setCurrPage(1);
    setInput(text);
  }
  const debouncedHandleTextChangeRef = useRef(
    debounce<(text: string) => void>(handleTextChange)
  );

  const handleRefresh = () => {
    // marvelAPI.refreshCharacterPageSWR(currPage, input);
    mutate();
  }

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
            <CharacterRowComponent
              character={item}
              onPress={() => navigation.push("CharacterDetails", { character: item })}
            />
          )}
          style={{flexGrow: 0}}
          ItemSeparatorComponent={() => <Spacer size={1}/>}
          ListFooterComponent={() => <Spacer size={1}/>}
          ListEmptyComponent={() => (
            (!isLoading && <EmptyListComponent/>) || null
          )}
          refreshing={isLoading}
          onRefresh={handleRefresh}
        />
        <PaginationComponent
          currentPage={currPage}
          totalNumPages={totalNumPages}
          onPageChange={handlePageChange}
          disabled={isLoading || currPage > totalNumPages}
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