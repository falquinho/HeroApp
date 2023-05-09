import React from 'react'
import { TextProps, View, ViewStyle } from 'react-native'
import { Colors } from '../shared/colors'
import { CustomText } from './CustomText'


export const CustomTitle: React.FC<TextProps> = (props) => {
  return (
    <View>
      <CustomText {...props}/>
      <View style={styleUnderscore}/>
    </View>
  )
}

const styleUnderscore: ViewStyle = {
  height: 4,
  width: 54,
  backgroundColor: Colors.primary,
}