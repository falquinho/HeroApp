import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Colors } from '../shared/colors'
import { Spacing } from '../shared/spacing'
import { CustomText } from './CustomText'


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
      <LeftArrow
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || disabled}
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
        ItemSeparatorComponent={() => <View style={{width: 20}}/>}
      />
      <RightArrow
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalNumPages || disabled}
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
}) => {
  const circleStyle = {
    ...styles.circle,
    ...((selected && styles.selectedCircle) || {}),
    ...(disabled && styleDisabled) || {},
  }

  const textStyle = {
    ...styles.text,
    ...((selected && styles.selectedText) || {}),
    ...(disabled && styleDisabled) || {},
  }

  return (
    <TouchableOpacity
      style={circleStyle}
      onPress={onPress}
      disabled={disabled}
    >
      <CustomText style={textStyle}>
        {pageNum}
      </CustomText>
    </TouchableOpacity>
  )
}


/**
 * Arrow Components
 */
type ArrowProps = {
  onPress: () => void,
  disabled: boolean,
}

const LeftArrow: React.FC<ArrowProps> = ({
  disabled,
  onPress,
}) => {
  const finalStyle = {
    ...styleTriLeft,
    ...(disabled && styleDisabled) || {},
  }
  return (
    <TouchableOpacity style={finalStyle} onPress={onPress} disabled={disabled}/>
  )
}

const RightArrow: React.FC<ArrowProps> = ({
  disabled,
  onPress,
}) => {
  const finalStyle = {
    ...styleTriRight,
    ...(disabled && styleDisabled) || {},
  }
  return (
    <TouchableOpacity style={finalStyle} onPress={onPress} disabled={disabled}/>
  )
}


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
  text: {
    fontSize: 21,
    lineHeight: 24,
    color: Colors.primary,
  },
  selectedText: {
    color: 'white'
  },
  circle: {
    height: 32,
    width: 32,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    backgroundColor: Colors.primary,
  },
});

const styleTriCommon: ViewStyle = {
  width: 0,
  height: 0,
  borderColor: 'transparent',
  borderTopWidth: 16,
  borderBottomWidth: 16,
}

const styleTriLeft: ViewStyle = {
  ...styleTriCommon,
  borderRightWidth: 26,
  borderRightColor: Colors.primary,
  borderLeftWidth: 0,
}

const styleTriRight: ViewStyle = {
  ...styleTriCommon,
  borderLeftWidth: 26,
  borderLeftColor: Colors.primary,
  borderRightWidth: 0,
}

const styleDisabled: ViewStyle = {
  opacity: 0.35,
}