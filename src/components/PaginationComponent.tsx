import React from 'react'
import { FlatList, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Colors } from '../shared/colors'
import { Spacing } from '../shared/spacing'
import { CustomText } from './CustomText'
import { Spacer } from './Spacer'


export type PaginationComponentProps = {
  totalNumPages: number,
  currentPage: number,
  onPageChange: (page: number) => void,
  disabled: boolean,
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalNumPages,
  currentPage,
  onPageChange,
  disabled,
}) => {
  const pages = [(currentPage > 1 && currentPage - 1) || 1];
  pages[0] <= totalNumPages - 1 && pages.push(pages[0] + 1);
  pages[0] <= totalNumPages - 2 && pages.push(pages[0] + 2);


  return (
    <View style={styles.container}>
      <PaginationArrow
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || disabled}
        direction='left'
      />
      <FlatList
        horizontal
        style={styles.flatlist}
        data={pages}
        renderItem={({item}) => (
          <PageCircle
            pageNum={item}
            selected={currentPage === item}
            onPress={() => onPageChange(item)}
            disabled={disabled}
          />
        )}
        ItemSeparatorComponent={() => <Spacer size={20}/>}
      />
      <PaginationArrow
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalNumPages || disabled}
        direction='right'
      />
    </View>
  )
}


/**
 * PageCircle Component
 */
type PageCircleProps = {
  pageNum: number,
  selected: boolean,
  onPress: () => void,
  disabled: boolean,
}

const PageCircle: React.FC<PageCircleProps> = ({
  pageNum,
    selected,
    onPress,
    disabled,
}) => (
  <TouchableOpacity
    style={circleStyle(disabled, selected)}
    onPress={onPress}
    disabled={disabled}
  >
    <CustomText style={textStyle(selected)}>
      {pageNum}
    </CustomText>
  </TouchableOpacity>
);

const circleStyle = (disabled: boolean, selected: boolean): ViewStyle => ({
  height: 32,
  width: 32,
  borderWidth: 1,
  borderColor: Colors.primary,
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: selected? Colors.primary : undefined,
  opacity: disabled? 0.35 : 1,
});

const textStyle = (selected: boolean): TextStyle => ({
  fontSize: 21,
  lineHeight: 24,
  color: selected? 'white' : Colors.primary,
});


/**
 * Arrow Components
 */
type ArrowProps = {
  onPress: () => void,
  disabled: boolean,
  direction: 'left' | 'right', 
}

const PaginationArrow: React.FC<ArrowProps> = (props) => {
  return (
    <TouchableOpacity {...props} style={arrowStyle(props)}/>
  )
}

const arrowStyle = ({direction, disabled}: ArrowProps): ViewStyle => ({
  width: 0,
  height: 0,
  borderColor: 'transparent',
  borderTopWidth: 16,
  borderBottomWidth: 16,
  borderRightWidth: direction == 'left'? 26 : 0,
  borderRightColor: direction == 'left'? Colors.primary : undefined,
  borderLeftWidth: direction == 'left'? 0 : 26,
  borderLeftColor: direction == 'left'? undefined : Colors.primary,
  opacity: disabled? 0.35 : 1,
});


/**
 * Styles
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    backgroundColor: 'white',
  },
  flatlist: {
    paddingHorizontal: 60,
    flexGrow: 0,
  },
});

