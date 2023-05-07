import React from 'react'
import { Text, TextProps } from 'react-native'


export const CustomText: React.FC<TextProps> = (props) => {
  return (
    <Text 
      {...props}
      style={[{fontFamily: 'Roboto'}, props.style]}
    />
  )
}