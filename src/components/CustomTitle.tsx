import React from 'react'
import { TextProps, TextStyle, View, ViewStyle } from 'react-native'
import { Colors } from '../shared/colors'
import { CustomText } from './CustomText'


export const CustomTitle: React.FC<TextProps> = (props) => {
  return (
    <View>
      <CustomText {...props} style={[styleTitle, props.style]}/>
      <View style={styleUnderscore}/>
    </View>
  )
}

const styleUnderscore: ViewStyle = {
  height: 4,
  width: 54,
  backgroundColor: Colors.primary,
}

const styleTitle: TextStyle = {
  fontSize: 16,
  fontWeight: '900',
  color: Colors.primary,
  textTransform: 'uppercase',
  lineHeight: 32,
}